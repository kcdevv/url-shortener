import { NextRequest, NextResponse } from "next/server";
import { client } from "../db";

export async function GET(req: NextRequest) {
  const shorturl = req.nextUrl.pathname.slice(1);

  const link = await client.link.findUnique({
    where: { id: shorturl },
  });

  if (!link) {
    return NextResponse.json({ error: "URL not found" }, { status: 404 });
  }

  await client.link.update({
    where: { id: shorturl },
    data: { clicks: link.clicks + 1 }
  });

  return NextResponse.redirect(link.url, 302);
}
