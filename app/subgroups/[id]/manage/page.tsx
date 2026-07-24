import { listApplications } from "@/lib/data/applications";
import { getSubGroupFull } from "@/lib/data/subgroups";
import { canManageSubgroup } from "@/lib/subgroup-access-server";

interface ManagePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function SubGroupManagePage({ params, searchParams }: ManagePageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  const valid = await canManageSubgroup(id, token ?? "");
  if (!valid) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center">
        <div>
          <p className="text-xl font-extrabold text-ink">접근 권한이 없습니다</p>
          <p className="mt-2 text-sm text-ink-muted">
            소모임을 만들 때 안내된 관리 링크로 다시 접속해주세요.
          </p>
        </div>
      </div>
    );
  }

  const subgroup = await getSubGroupFull(id);
  if (!subgroup) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center">
        <p className="text-ink-muted">소모임을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const applications = await listApplications(id);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <span className="text-sm font-bold uppercase tracking-wider text-primary">
        소모임 관리
      </span>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">{subgroup.topic}</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{subgroup.description}</p>

      <div className="mt-8">
        <h2 className="text-base font-bold text-ink">
          가입 신청 ({applications.length}건)
        </h2>
        <div className="mt-4 space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="rounded-xl border border-border bg-surface-elevated p-4 text-sm">
              <p className="font-semibold text-ink">
                {app.name} · {app.affiliation} · {app.contact}
              </p>
              {app.message && <p className="mt-1 text-ink-muted">&ldquo;{app.message}&rdquo;</p>}
            </div>
          ))}
          {applications.length === 0 && (
            <p className="text-sm text-ink-muted">아직 가입 신청이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
