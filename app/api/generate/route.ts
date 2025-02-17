import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { client } from "../../db";

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const id = randomBytes(5).toString("hex");
  const shorter = await client.link.create({
    data: {
      id,
      url,
    },
  })
  return NextResponse.json({ id: shorter.id }, { status: 200 });
}
