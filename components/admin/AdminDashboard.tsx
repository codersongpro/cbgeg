"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Power, ChevronDown, ChevronUp } from "lucide-react";
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
  const [subgroups] = useState(initialSubgroups);
  const [newCode, setNewCode] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Record<string, SubGroupApplication[]>>({});

  async function refreshCodes() {
    const res = await fetch("/api/admin/codes");
    const data = await res.json();
    setCodes(data.codes ?? []);
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
