import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { client } from "../../db";

export async function POST(req: NextRequest) {
  const { url, alias } = await req.json();
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }
  if (!alias) {
    const id = randomBytes(5).toString("hex");
    const shorter = await client.link.create({
      data: {
        id,
        url,
      },
    });
    return NextResponse.json({ id: shorter.id }, { status: 200 });
  }
  const exists = await client.link.findUnique({
    where: { id: alias },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Alias already exists" },
      { status: 400 }
    );
  }
  const shorter = await client.link.create({
    data: {
      id: alias,
      url: url,
    },
  });
  return NextResponse.json({ id: shorter.id }, { status: 200 });
}
