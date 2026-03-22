import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (token === process.env.ADMIN_SECRET) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
