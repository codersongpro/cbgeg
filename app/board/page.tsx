import { BoardClient } from "@/components/board/BoardClient";

export const dynamic = "force-dynamic";

export default function BoardPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-28 sm:px-8">
      <BoardClient />
    </main>
  );
}
