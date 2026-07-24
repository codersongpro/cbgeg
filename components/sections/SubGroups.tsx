"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Users, Lock, CheckCircle2 } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { VerifyCodeForm } from "@/components/subgroups/VerifyCodeForm";
import { CreateSubGroupForm } from "@/components/subgroups/CreateSubGroupForm";
import { JoinSubGroupForm } from "@/components/subgroups/JoinSubGroupForm";
import { subGroupTopics } from "@/lib/content/subgroups";
import type { SubGroupFull, SubGroupPublic } from "@/types";

type SubGroupItem = SubGroupPublic | SubGroupFull;
function isFull(item: SubGroupItem): item is SubGroupFull {
  return "creatorName" in item;
}

type DialogState =
  | { type: "none" }
  | {
      type: "verify";
      next: { kind: "create" } | { kind: "join"; id: string } | { kind: "detail"; id: string };
    }
  | { type: "create" }
  | { type: "created"; topic: string; manageUrl: string }
  | { type: "detail"; id: string }
  | { type: "join"; id: string }
  | { type: "joined" };

export function SubGroups() {
  const [subgroups, setSubgroups] = useState<SubGroupItem[]>([]);
  const [verified, setVerified] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dialog, setDialog] = useState<DialogState>({ type: "none" });

  async function refresh() {
    const res = await fetch("/api/subgroups");
    const data = await res.json();
    setSubgroups(data.subgroups ?? []);
    setVerified(!!data.verified);
    setLoaded(true);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/subgroups")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setSubgroups(data.subgroups ?? []);
        setVerified(!!data.verified);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function close() {
    setDialog({ type: "none" });
  }

  function handleCreateClick() {
    setDialog(verified ? { type: "create" } : { type: "verify", next: { kind: "create" } });
  }

  function handleJoinClick(id: string) {
    setDialog(verified ? { type: "join", id } : { type: "verify", next: { kind: "join", id } });
  }

  async function handleVerified() {
    const pendingNext = dialog.type === "verify" ? dialog.next : null;
    await refresh();
    if (pendingNext?.kind === "create") {
      setDialog({ type: "create" });
    } else if (pendingNext?.kind === "join") {
      setDialog({ type: "join", id: pendingNext.id });
    } else if (pendingNext?.kind === "detail") {
      setDialog({ type: "detail", id: pendingNext.id });
    }
  }

  const selectedDetail =
    dialog.type === "detail" ? subgroups.find((s) => s.id === dialog.id) : undefined;

  return (
    <section id="subgroups" className="scroll-mt-24 bg-ink/[0.03] py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-green">
            충북GEG 소모임
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            관심사가 통하는 선생님들끼리,
            <br />
            자유롭게 소모임을 시작해보세요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            정해진 커리큘럼은 없습니다. 관심 있는 주제를 가진 선생님들이 모여
            자발적으로 소모임을 만들고, 원할 때 함께 연구하고 나눕니다.
          </p>
        </Reveal>

        {loaded && subgroups.length === 0 && (
          <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-surface-elevated/50 p-6">
            <p className="text-sm font-semibold text-ink">아직 등록된 소모임이 없어요.</p>
            <p className="mt-1 text-sm text-ink-muted">
              이런 주제는 어떨까요: {subGroupTopics.map((t) => t.title).join(" · ")}
            </p>
          </Reveal>
        )}

        {subgroups.length > 0 && (
          <RevealGroup className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
            {subgroups.map((sg) => (
              <RevealItem key={sg.id} className="w-[80%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <button onClick={() => setDialog({ type: "detail", id: sg.id })} className="block h-full w-full text-left">
                  <Card className="h-full hover:-translate-y-1 hover:shadow-md">
                    <Users className="h-6 w-6 text-green" strokeWidth={1.75} />
                    <CardTitle className="mt-3">{sg.topic}</CardTitle>
                    <CardDescription>{sg.description}</CardDescription>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="green">
                        자세히 보기 <ArrowRight className="h-3 w-3" />
                      </Badge>
                      <span className="text-xs text-ink-muted">
                        개설자 {isFull(sg) ? sg.creatorName : sg.creatorNameMasked}
                      </span>
                    </div>
                  </Card>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <Reveal className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-surface-elevated p-8 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-ink">새로운 소모임을 만들고 싶으신가요?</p>
            <p className="mt-1 text-sm text-ink-muted">
              인증 코드가 있는 회원이라면 누구나 소모임을 만들 수 있어요.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="/subgroups/manage">내 소모임 관리</a>
            </Button>
            <Button size="lg" className="w-full sm:w-auto" onClick={handleCreateClick}>
              소모임 만들기
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Verify code */}
      <Dialog open={dialog.type === "verify"} onOpenChange={(open) => !open && close()}>
        <DialogContent title="회원 인증" description="관리자에게 받은 코드를 입력하면 계속할 수 있어요.">
          <VerifyCodeForm onVerified={handleVerified} />
        </DialogContent>
      </Dialog>

      {/* Create subgroup */}
      <Dialog open={dialog.type === "create"} onOpenChange={(open) => !open && close()}>
        <DialogContent title="소모임 만들기">
          <CreateSubGroupForm
            onCreated={({ id, manageToken, topic }) => {
              refresh();
              setDialog({
                type: "created",
                topic,
                manageUrl: `${window.location.origin}/subgroups/${id}/manage?token=${manageToken}`,
              });
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Created success */}
      <Dialog open={dialog.type === "created"} onOpenChange={(open) => !open && close()}>
        <DialogContent title="소모임이 만들어졌어요!">
          {dialog.type === "created" && (
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-green">
                <CheckCircle2 className="h-5 w-5" /> &ldquo;{dialog.topic}&rdquo; 소모임이 등록되었습니다.
              </p>
              <p className="text-sm text-ink-muted">
                설정한 연락처와 관리 비밀번호로 언제든지 내 소모임 관리 화면에 다시 들어올 수 있어요.
                아래 링크는 기존 방식이 필요한 경우에만 사용할 수 있습니다.
              </p>
              <div className="break-all rounded-xl bg-ink/[0.04] p-3 font-mono text-xs text-ink">
                {dialog.manageUrl}
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard?.writeText(dialog.manageUrl);
                }}
              >
                링크 복사하기
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Detail */}
      <Dialog open={dialog.type === "detail"} onOpenChange={(open) => !open && close()}>
        <DialogContent title={selectedDetail?.topic ?? ""}>
          {selectedDetail && (
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-ink-muted">{selectedDetail.description}</p>

              <div className="rounded-xl bg-ink/[0.03] p-4 text-sm">
                {isFull(selectedDetail) ? (
                  <>
                    <p className="font-semibold text-ink">개설자: {selectedDetail.creatorName}</p>
                    <p className="mt-1 text-ink-muted">소속: {selectedDetail.creatorAffiliation}</p>
                    <p className="mt-1 text-ink-muted">연락처: {selectedDetail.creatorContact}</p>
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-ink-muted">
                      개설자: {selectedDetail.creatorNameMasked}{" "}
                      <span className="text-xs">(인증 시 전체 정보 확인 가능)</span>
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setDialog({
                          type: "verify",
                          next: { kind: "detail", id: selectedDetail.id },
                        })
                      }
                    >
                      <Lock className="h-3.5 w-3.5" /> 인증하기
                    </Button>
                  </div>
                )}
              </div>

              <Button onClick={() => handleJoinClick(selectedDetail.id)}>가입하기</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Join */}
      <Dialog open={dialog.type === "join"} onOpenChange={(open) => !open && close()}>
        <DialogContent title="소모임 가입 신청">
          {dialog.type === "join" && (
            <JoinSubGroupForm subgroupId={dialog.id} onJoined={() => setDialog({ type: "joined" })} />
          )}
        </DialogContent>
      </Dialog>

      {/* Joined success */}
      <Dialog open={dialog.type === "joined"} onOpenChange={(open) => !open && close()}>
        <DialogContent title="신청이 완료되었어요!">
          <p className="flex items-center gap-2 text-sm font-semibold text-green">
            <CheckCircle2 className="h-5 w-5" /> 소모임 개설자에게 신청 내용이 전달되었습니다.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
