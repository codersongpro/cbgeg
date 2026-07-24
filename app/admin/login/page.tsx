"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.message ?? "로그인에 실패했습니다.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-8 shadow-sm"
      >
        <h1 className="text-xl font-extrabold text-ink">관리자 로그인</h1>
        <p className="mt-2 text-sm text-ink-muted">충북 GEG 관리자 페이지입니다.</p>

        <label className="mt-6 block text-sm font-semibold text-ink">
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
            autoFocus
          />
        </label>

        {error && <p className="mt-3 text-sm font-semibold text-coral">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? "확인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
