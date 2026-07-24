"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Power, ChevronDown, ChevronUp, Pencil, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AccessCode, SubGroupApplication, SubGroupFull } from "@/types";

interface AdminDashboardProps {
  initialCodes: AccessCode[];
  initialSubgroups: SubGroupFull[];
}

export function AdminDashboard({ initialCodes, initialSubgroups }: AdminDashboardProps) {
  const router = useRouter();
  const [codes, setCodes] = useState(initialCodes);
  const [subgroups, setSubgroups] = useState(initialSubgroups);
  const [newCode, setNewCode] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Record<string, SubGroupApplication[]>>({});
  const [groupForm, setGroupForm] = useState({
    topic: "",
    description: "",
    creatorName: "",
    creatorAffiliation: "",
    creatorContact: "",
    managePassword: "",
  });
  const [groupError, setGroupError] = useState("");

  async function refreshCodes() {
    const res = await fetch("/api/admin/codes");
    const data = await res.json();
    setCodes(data.codes ?? []);
  }

  async function refreshSubgroups() {
    const res = await fetch("/api/admin/subgroups");
    const data = await res.json();
    if (res.ok) setSubgroups(data.subgroups ?? []);
  }

  async function addSubgroup(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setGroupError("");
    const res = await fetch("/api/admin/subgroups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(groupForm),
    });
    const data = await res.json();
    if (!res.ok) setGroupError(data.message ?? "소모임을 추가하지 못했습니다.");
    else {
      setGroupForm({
        topic: "",
        description: "",
        creatorName: "",
        creatorAffiliation: "",
        creatorContact: "",
        managePassword: "",
      });
      await refreshSubgroups();
    }
    setBusy(false);
  }

  async function editSubgroup(subgroup: SubGroupFull) {
    const topic = prompt("소모임 이름", subgroup.topic);
    if (topic === null) return;
    const description = prompt("소모임 설명", subgroup.description);
    if (description === null) return;
    const creatorName = prompt("개설자 이름", subgroup.creatorName);
    if (creatorName === null) return;
    const creatorAffiliation = prompt("개설자 소속", subgroup.creatorAffiliation);
    if (creatorAffiliation === null) return;
    const creatorContact = prompt("개설자 연락처", subgroup.creatorContact);
    if (creatorContact === null) return;
    const res = await fetch(`/api/admin/subgroups/${subgroup.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, description, creatorName, creatorAffiliation, creatorContact }),
    });
    const data = await res.json();
    if (!res.ok) setGroupError(data.message ?? "소모임을 변경하지 못했습니다.");
    else await refreshSubgroups();
  }

  async function deleteSubgroup(subgroup: SubGroupFull) {
    if (!confirm(`"${subgroup.topic}" 소모임과 가입 신청을 모두 삭제할까요?`)) return;
    const res = await fetch(`/api/admin/subgroups/${subgroup.id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) setGroupError(data.message ?? "소모임을 삭제하지 못했습니다.");
    else await refreshSubgroups();
  }

  async function resetSubgroupPassword(subgroup: SubGroupFull) {
    const managePassword = prompt(`"${subgroup.topic}"의 새 관리 비밀번호를 입력하세요. (4자 이상)`);
    if (managePassword === null) return;
    const res = await fetch(`/api/admin/subgroups/${subgroup.id}/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ managePassword }),
    });
    const data = await res.json();
    if (!res.ok) setGroupError(data.message ?? "비밀번호를 재설정하지 못했습니다.");
    else alert("관리 비밀번호를 재설정했습니다.");
  }

  async function handleAddCode(event: React.FormEvent) {
    event.preventDefault();
    if (!newCode.trim()) return;
    setBusy(true);
    await fetch("/api/admin/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: newCode, label: newLabel }),
    });
    setNewCode("");
    setNewLabel("");
    await refreshCodes();
    setBusy(false);
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/admin/codes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    await refreshCodes();
  }

  async function deleteCode(id: string) {
    if (!confirm("이 코드를 삭제할까요?")) return;
    await fetch(`/api/admin/codes/${id}`, { method: "DELETE" });
    await refreshCodes();
  }

  async function toggleApplications(subgroupId: string) {
    if (expandedId === subgroupId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(subgroupId);
    if (!applications[subgroupId]) {
      const res = await fetch(`/api/subgroups/${subgroupId}/applications`);
      const data = await res.json();
      setApplications((prev) => ({ ...prev, [subgroupId]: data.applications ?? [] }));
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink">충북 GEG 관리자</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">인증 코드 관리</h2>
        <form onSubmit={handleAddCode} className="mt-4 flex flex-wrap gap-3">
          <input
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="새 코드 (예: geg2026)"
            className="min-w-[180px] flex-1 rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="메모 (선택, 예: 2026 정기회원용)"
            className="min-w-[180px] flex-1 rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" disabled={busy}>
            코드 추가
          </Button>
        </form>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-ink/[0.03] text-left text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">코드</th>
                <th className="px-4 py-3 font-semibold">메모</th>
                <th className="px-4 py-3 font-semibold">상태</th>
                <th className="px-4 py-3 font-semibold">관리</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <tr key={code.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono font-semibold text-ink">{code.code}</td>
                  <td className="px-4 py-3 text-ink-muted">{code.label || "-"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={code.active ? "green" : "neutral"}>
                      {code.active ? "사용 중" : "비활성"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(code.id, code.active)}
                        className="rounded-lg border border-border p-2 text-ink-muted hover:bg-ink/5"
                        aria-label="활성/비활성 전환"
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteCode(code.id)}
                        className="rounded-lg border border-border p-2 text-coral hover:bg-coral/5"
                        aria-label="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {codes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-ink-muted">
                    등록된 코드가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-bold text-ink">소모임 · 가입 신청 현황</h2>
        <form onSubmit={addSubgroup} className="mt-4 grid gap-3 rounded-2xl border border-border bg-surface-elevated p-5 sm:grid-cols-2">
          <input value={groupForm.topic} onChange={(e) => setGroupForm({ ...groupForm, topic: e.target.value })} placeholder="소모임 이름" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
          <input value={groupForm.creatorName} onChange={(e) => setGroupForm({ ...groupForm, creatorName: e.target.value })} placeholder="개설자 이름" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
          <input value={groupForm.creatorAffiliation} onChange={(e) => setGroupForm({ ...groupForm, creatorAffiliation: e.target.value })} placeholder="개설자 소속" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
          <input value={groupForm.creatorContact} onChange={(e) => setGroupForm({ ...groupForm, creatorContact: e.target.value })} placeholder="개설자 연락처" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
          <textarea value={groupForm.description} onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })} placeholder="소모임 설명" rows={3} className="rounded-xl border border-border px-4 py-2.5 text-sm sm:col-span-2" />
          <input type="password" minLength={4} value={groupForm.managePassword} onChange={(e) => setGroupForm({ ...groupForm, managePassword: e.target.value })} placeholder="개설자 관리 비밀번호 (4자 이상)" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
          <Button type="submit" disabled={busy}>소모임 추가</Button>
          {groupError && <p className="text-sm font-semibold text-coral sm:col-span-2">{groupError}</p>}
        </form>
        <div className="mt-5 space-y-3">
          {subgroups.map((subgroup) => (
            <div key={subgroup.id} className="rounded-2xl border border-border bg-surface-elevated">
              <button
                onClick={() => toggleApplications(subgroup.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div>
                  <p className="font-bold text-ink">{subgroup.topic}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    개설자 {subgroup.creatorName} · {subgroup.creatorAffiliation} ·{" "}
                    {subgroup.creatorContact}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="primary">신청 {subgroup.applicationCount}</Badge>
                  <button onClick={(event) => { event.stopPropagation(); void editSubgroup(subgroup); }} className="rounded-lg border border-border p-2 text-ink-muted" aria-label="소모임 수정"><Pencil className="h-4 w-4" /></button>
                  <button onClick={(event) => { event.stopPropagation(); void resetSubgroupPassword(subgroup); }} className="rounded-lg border border-border p-2 text-ink-muted" aria-label="관리 비밀번호 재설정"><KeyRound className="h-4 w-4" /></button>
                  <button onClick={(event) => { event.stopPropagation(); void deleteSubgroup(subgroup); }} className="rounded-lg border border-border p-2 text-coral" aria-label="소모임 삭제"><Trash2 className="h-4 w-4" /></button>
                  {expandedId === subgroup.id ? (
                    <ChevronUp className="h-4 w-4 text-ink-muted" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-ink-muted" />
                  )}
                </div>
              </button>

              {expandedId === subgroup.id && (
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm text-ink-muted">{subgroup.description}</p>
                  <div className="mt-4 space-y-3">
                    {(applications[subgroup.id] ?? []).map((app) => (
                      <div key={app.id} className="rounded-xl bg-ink/[0.03] p-4 text-sm">
                        <p className="font-semibold text-ink">
                          {app.name} · {app.affiliation} · {app.contact}
                        </p>
                        {app.message && (
                          <p className="mt-1 text-ink-muted">&ldquo;{app.message}&rdquo;</p>
                        )}
                      </div>
                    ))}
                    {(applications[subgroup.id] ?? []).length === 0 && (
                      <p className="text-sm text-ink-muted">아직 가입 신청이 없습니다.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {subgroups.length === 0 && (
            <p className="text-sm text-ink-muted">등록된 소모임이 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
