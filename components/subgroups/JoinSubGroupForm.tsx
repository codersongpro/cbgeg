"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface JoinSubGroupFormProps {
  subgroupId: string;
  onJoined: () => void;
}

export function JoinSubGroupForm({ subgroupId, onJoined }: JoinSubGroupFormProps) {
  const [affiliation, setAffiliation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/subgroups/${subgroupId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliation, name, contact, message }),
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.message ?? "신청에 실패했습니다.");
      setLoading(false);
      return;
    }

    onJoined();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-sm font-semibold text-ink">
        소속
        <input
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          placeholder="예: OO중학교"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        이름
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        연락처
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="휴대폰 번호 또는 이메일"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        하고 싶은 말
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="간단한 참여 동기나 하고 싶은 말을 남겨주세요. (선택)"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      {error && <p className="text-sm font-semibold text-coral">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "신청 중..." : "가입 신청하기"}
      </Button>
    </form>
  );
}
