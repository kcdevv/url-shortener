import { client } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const shorturl = req.nextUrl.pathname.split("/analytics")[1].slice(1);
    console.log(shorturl)
    const link = await client.link.findUnique({
        where: { id: shorturl }
    });
    return NextResponse.json({ link });
}