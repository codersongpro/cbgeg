import { NextResponse } from "next/server";
import { clearCreatorSession } from "@/lib/session";

export async function POST() {
  await clearCreatorSession();
  return NextResponse.json({ ok: true });
}
