import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-primary">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">페이지를 찾을 수 없어요</h1>
      <p className="mt-3 text-ink-muted">주소를 다시 확인해주세요.</p>
      <Button asChild className="mt-8">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
