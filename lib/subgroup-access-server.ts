import "server-only";
import { isAdminSession, creatorSessionSubgroupIds } from "@/lib/session";
import { verifyManageToken } from "@/lib/data/subgroups";

export async function canManageSubgroup(id: string, token = ""): Promise<boolean> {
  if (await isAdminSession()) return true;
  if ((await creatorSessionSubgroupIds()).includes(id)) return true;
  return verifyManageToken(id, token);
}
