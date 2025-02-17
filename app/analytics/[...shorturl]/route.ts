import { client } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const shorturl = req.nextUrl.pathname.slice(1);
    const link = await client.link.findUnique({
        where: { id: shorturl }
    });
    return NextResponse.json({ link });
}