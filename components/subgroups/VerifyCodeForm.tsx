"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VerifyCodeFormProps {
  onVerified: () => void;
}

export function VerifyCodeForm({ onVerified }: VerifyCodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.message ?? "코드가 올바르지 않습니다.");
      setLoading(false);
      return;
    }

    onVerified();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-ink-muted">
        관리자에게 받은 회원 인증 코드를 입력해주세요.
      </p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증 코드"
        autoFocus
        className="rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
      {error && <p className="text-sm font-semibold text-coral">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "확인 중..." : "인증하기"}
      </Button>
    </form>
  );
}
