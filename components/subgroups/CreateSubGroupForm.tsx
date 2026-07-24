"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subGroupTopics } from "@/lib/content/subgroups";

interface CreateSubGroupFormProps {
  onCreated: (result: { id: string; manageToken: string; topic: string }) => void;
}

export function CreateSubGroupForm({ onCreated }: CreateSubGroupFormProps) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorAffiliation, setCreatorAffiliation] = useState("");
  const [creatorContact, setCreatorContact] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/subgroups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, description, creatorName, creatorAffiliation, creatorContact }),
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.message ?? "소모임을 만들지 못했습니다.");
      setLoading(false);
      return;
    }

    onCreated({ id: data.id, manageToken: data.manageToken, topic });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-sm font-semibold text-ink">
        주제
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          list="subgroup-topic-suggestions"
          placeholder="예: AI 수업연구"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <datalist id="subgroup-topic-suggestions">
          {subGroupTopics.map((t) => (
            <option key={t.id} value={t.title} />
          ))}
        </datalist>
      </label>

      <label className="text-sm font-semibold text-ink">
        소모임 설명
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="어떤 활동을 함께 하고 싶은지 소개해주세요."
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        개설자 이름
        <input
          value={creatorName}
          onChange={(e) => setCreatorName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        소속
        <input
          value={creatorAffiliation}
          onChange={(e) => setCreatorAffiliation(e.target.value)}
          placeholder="예: OO초등학교"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="text-sm font-semibold text-ink">
        연락처
        <input
          value={creatorContact}
          onChange={(e) => setCreatorContact(e.target.value)}
          placeholder="휴대폰 번호 또는 이메일"
          className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      {error && <p className="text-sm font-semibold text-coral">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "만드는 중..." : "소모임 만들기"}
      </Button>
    </form>
  );
}
