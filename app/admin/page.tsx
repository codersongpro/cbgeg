import { listAccessCodes } from "@/lib/data/codes";
import { listSubGroupsFull } from "@/lib/data/subgroups";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [codes, subgroups] = await Promise.all([listAccessCodes(), listSubGroupsFull()]);

  return <AdminDashboard initialCodes={codes} initialSubgroups={subgroups} />;
}
