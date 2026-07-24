"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifyCodeForm } from "@/components/subgroups/VerifyCodeForm";
import type { BoardComment, BoardPost } from "@/types";

export function BoardClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [selected, setSelected] = useState<BoardPost | null>(null);
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    authorName: "",
    password: "",
  });
  const [commentForm, setCommentForm] = useState({
    content: "",
    authorName: "",
    password: "",
  });

  async function loadPosts() {
    const res = await fetch("/api/board");
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    const data = await res.json();
    setAuthenticated(true);
    setIsAdmin(!!data.isAdmin);
    setPosts(data.posts ?? []);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/board")
      .then(async (res) => ({ status: res.status, data: await res.json() }))
      .then(({ status, data }) => {
        if (cancelled) return;
        if (status === 401) setAuthenticated(false);
        else {
          setAuthenticated(true);
          setIsAdmin(!!data.isAdmin);
          setPosts(data.posts ?? []);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function openPost(id: string) {
    const res = await fetch(`/api/board/${id}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.message ?? "글을 불러오지 못했습니다.");
      return;
    }
    setSelected(data.post);
    setComments(data.comments ?? []);
    setIsAdmin(!!data.isAdmin);
    setError("");
  }

  async function createPost(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postForm),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "글을 등록하지 못했습니다.");
    else {
      setPostForm({ title: "", content: "", authorName: "", password: "" });
      setShowCreate(false);
      await loadPosts();
      await openPost(data.id);
    }
    setBusy(false);
  }

  async function editPost() {
    if (!selected) return;
    const title = prompt("제목", selected.title);
    if (title === null) return;
    const content = prompt("내용", selected.content);
    if (content === null) return;
    const authorName = prompt("표시 이름", selected.authorName);
    if (authorName === null) return;
    const password = isAdmin ? "" : prompt("글 비밀번호") ?? "";
    const res = await fetch(`/api/board/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, authorName, password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "글을 수정하지 못했습니다.");
    else {
      await loadPosts();
      await openPost(selected.id);
    }
  }

  async function deletePost() {
    if (!selected || !confirm(`"${selected.title}" 글과 댓글을 모두 삭제할까요?`)) return;
    const password = isAdmin ? "" : prompt("글 비밀번호") ?? "";
    const res = await fetch(`/api/board/${selected.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "글을 삭제하지 못했습니다.");
    else {
      setSelected(null);
      setComments([]);
      await loadPosts();
    }
  }

  async function createComment(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setBusy(true);
    const res = await fetch(`/api/board/${selected.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentForm),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "댓글을 등록하지 못했습니다.");
    else {
      setCommentForm({ content: "", authorName: "", password: "" });
      await openPost(selected.id);
      await loadPosts();
    }
    setBusy(false);
  }

  async function deleteComment(commentId: string) {
    const password = isAdmin ? "" : prompt("댓글 비밀번호") ?? "";
    const res = await fetch(`/api/board/${selected!.id}/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message ?? "댓글을 삭제하지 못했습니다.");
    else {
      await openPost(selected!.id);
      await loadPosts();
    }
  }

  if (authenticated === null) {
    return <p className="py-24 text-center text-ink-muted">게시판을 불러오는 중입니다.</p>;
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-ink">게시판</h1>
        <p className="mt-2 text-base leading-relaxed text-ink-muted">
          충북 GEG 선생님만 이용할 수 있습니다. 관리자에게 받은 인증 코드를 입력해주세요.
        </p>
        <div className="mt-6">
          <VerifyCodeForm onVerified={loadPosts} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-bold text-primary">CHUNGBUK GEG COMMUNITY</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">게시판</h1>
          <p className="mt-2 text-base text-ink-muted">인증된 충북 GEG 선생님들과 이야기와 자료를 나눠보세요.</p>
        </div>
        <Button onClick={() => setShowCreate((value) => !value)}>
          {showCreate ? "작성 취소" : "새 글 작성"}
        </Button>
      </div>

      {showCreate && (
        <form onSubmit={createPost} className="mt-8 grid gap-4 rounded-2xl border border-border bg-surface-elevated p-6 sm:grid-cols-2">
          <label className="text-sm font-semibold text-ink sm:col-span-2">제목<input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} maxLength={100} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3" /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">내용<textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} maxLength={5000} rows={7} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3" /></label>
          <label className="text-sm font-semibold text-ink">표시 이름<input value={postForm.authorName} onChange={(e) => setPostForm({ ...postForm, authorName: e.target.value })} maxLength={30} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3" /></label>
          <label className="text-sm font-semibold text-ink">글 비밀번호<input type="password" value={postForm.password} onChange={(e) => setPostForm({ ...postForm, password: e.target.value })} minLength={4} className="mt-1.5 w-full rounded-xl border border-border px-4 py-3" /></label>
          <Button type="submit" disabled={busy} className="sm:col-span-2">글 등록</Button>
        </form>
      )}

      {error && <p className="mt-5 rounded-xl bg-coral/10 p-4 font-semibold text-coral">{error}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {posts.map((post) => (
            <button key={post.id} onClick={() => openPost(post.id)} className="w-full rounded-xl border border-border bg-surface-elevated p-4 text-left transition hover:border-primary/40">
              <p className="font-bold text-ink">{post.title}</p>
              <div className="mt-2 flex items-center justify-between text-sm text-ink-muted">
                <span>{post.authorName} · {new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" />{post.commentCount}</span>
              </div>
            </button>
          ))}
          {!posts.length && <p className="rounded-xl border border-dashed border-border p-8 text-center text-ink-muted">첫 번째 글을 작성해보세요.</p>}
        </div>

        <div>
          {!selected && <p className="rounded-xl border border-dashed border-border p-12 text-center text-ink-muted">읽을 글을 선택하세요.</p>}
          {selected && (
            <article className="rounded-2xl border border-border bg-surface-elevated p-6">
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="text-2xl font-extrabold text-ink">{selected.title}</h2><p className="mt-2 text-sm text-ink-muted">{selected.authorName} · {new Date(selected.createdAt).toLocaleString("ko-KR")}</p></div>
                <div className="flex gap-2"><button onClick={editPost} className="rounded-lg border border-border p-2" aria-label="글 수정"><Pencil className="h-4 w-4" /></button><button onClick={deletePost} className="rounded-lg border border-border p-2 text-coral" aria-label="글 삭제"><Trash2 className="h-4 w-4" /></button></div>
              </div>
              <p className="mt-6 whitespace-pre-wrap leading-8 text-ink">{selected.content}</p>

              <section className="mt-8 border-t border-border pt-6">
                <h3 className="text-lg font-bold text-ink">댓글 {comments.length}개</h3>
                <div className="mt-4 space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start justify-between gap-4 rounded-xl bg-ink/[0.03] p-4">
                      <div><p className="font-semibold text-ink">{comment.authorName}</p><p className="mt-1 whitespace-pre-wrap text-ink-muted">{comment.content}</p></div>
                      <button onClick={() => deleteComment(comment.id)} className="text-sm font-semibold text-coral">삭제</button>
                    </div>
                  ))}
                </div>
                <form onSubmit={createComment} className="mt-5 grid gap-3 sm:grid-cols-2">
                  <textarea value={commentForm.content} onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })} maxLength={1000} rows={3} placeholder="댓글 내용" className="rounded-xl border border-border px-4 py-3 sm:col-span-2" />
                  <input value={commentForm.authorName} onChange={(e) => setCommentForm({ ...commentForm, authorName: e.target.value })} maxLength={30} placeholder="표시 이름" className="rounded-xl border border-border px-4 py-3" />
                  <input type="password" value={commentForm.password} onChange={(e) => setCommentForm({ ...commentForm, password: e.target.value })} minLength={4} placeholder="댓글 비밀번호 (4자 이상)" className="rounded-xl border border-border px-4 py-3" />
                  <Button type="submit" disabled={busy} className="sm:col-span-2">댓글 등록</Button>
                </form>
              </section>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
