"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { SubGroupApplication, SubGroupFull } from "@/types";

type Draft = Pick<
  SubGroupFull,
  "topic" | "description" | "creatorName" | "creatorAffiliation" | "creatorContact"
>;

export function CreatorDashboard() {
  const [groups, setGroups] = useState<SubGroupFull[]>([]);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [applications, setApplications] = useState<SubGroupApplication[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadSession() {
    const res = await fetch("/api/subgroups/manage");
    if (!res.ok) return;
    const data = await res.json();
    setGroups(data.subgroups ?? []);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/subgroups/manage")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setGroups(data.subgroups ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/subgroups/manage/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "로그인하지 못했습니다.");
    else setGroups(data.subgroups ?? []);
    setBusy(false);
  }

  async function openGroup(group: SubGroupFull) {
    setSelected(group.id);
    setDraft(group);
    setError("");
    const res = await fetch(`/api/subgroups/${group.id}/applications`);
    const data = await res.json();
    setApplications(res.ok ? data.applications ?? [] : []);
    if (!res.ok) setError(data.message ?? "가입 신청을 불러오지 못했습니다.");
  }

  async function save() {
    if (!selected || !draft) return;
    setBusy(true);
    const res = await fetch(`/api/subgroups/${selected}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "저장하지 못했습니다.");
    else {
      await loadSession();
      setError("");
    }
    setBusy(false);
  }

  async function remove() {
    if (!selected || !draft || !confirm(`"${draft.topic}" 소모임을 삭제할까요? 가입 신청도 함께 삭제됩니다.`)) return;
    setBusy(true);
    const res = await fetch(`/api/subgroups/${selected}`, { method: "DELETE" });
    if (res.ok) {
      setSelected(null);
      setDraft(null);
      setApplications([]);
      await loadSession();
    } else {
      const data = await res.json();
      setError(data.message ?? "삭제하지 못했습니다.");
    }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/subgroups/manage/logout", { method: "POST" });
    setGroups([]);
    setSelected(null);
    setDraft(null);
  }

  if (!groups.length) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-ink">내 소모임 관리</h1>
        <p className="mt-2 text-sm text-ink-muted">개설할 때 입력한 연락처와 관리 비밀번호로 로그인하세요.</p>
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="연락처" className="mt-6 w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={4} placeholder="관리 비밀번호" className="mt-3 w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
        {error && <p className="mt-3 text-sm font-semibold text-coral">{error}</p>}
        <Button type="submit" disabled={busy} className="mt-4 w-full">{busy ? "확인 중..." : "로그인"}</Button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink">내 소모임 관리</h1>
        <Button variant="ghost" size="sm" onClick={logout}>로그아웃</Button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="space-y-3">
          {groups.map((group) => (
            <button key={group.id} onClick={() => openGroup(group)} className="w-full rounded-xl border border-border bg-surface-elevated p-4 text-left">
              <p className="font-bold text-ink">{group.topic}</p>
              <p className="mt-1 text-xs text-ink-muted">신청 {group.applicationCount}건</p>
            </button>
          ))}
        </div>
        <div>
          {!draft && <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-ink-muted">관리할 소모임을 선택하세요.</p>}
          {draft && (
            <div className="space-y-3 rounded-2xl border border-border bg-surface-elevated p-6">
              {(["topic", "creatorName", "creatorAffiliation", "creatorContact"] as const).map((key) => (
                <input key={key} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} className="w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
              ))}
              <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={4} className="w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
              {error && <p className="text-sm font-semibold text-coral">{error}</p>}
              <div className="flex gap-3"><Button onClick={save} disabled={busy}>변경 저장</Button><Button variant="outline" onClick={remove} disabled={busy}>소모임 삭제</Button></div>
              <div className="border-t border-border pt-5">
                <h2 className="font-bold text-ink">가입 신청 ({applications.length}건)</h2>
                <div className="mt-3 space-y-3">
                  {applications.map((app) => <div key={app.id} className="rounded-xl bg-ink/[0.03] p-4 text-sm"><p className="font-semibold">{app.name} · {app.affiliation} · {app.contact}</p>{app.message && <p className="mt-1 text-ink-muted">{app.message}</p>}</div>)}
                  {!applications.length && <p className="text-sm text-ink-muted">아직 가입 신청이 없습니다.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
