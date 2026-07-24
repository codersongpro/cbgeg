import { CreatorDashboard } from "@/components/subgroups/CreatorDashboard";

export const dynamic = "force-dynamic";

export default function CreatorManagePage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8">
      <CreatorDashboard />
    </main>
  );
}
