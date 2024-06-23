import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  const headers = new Headers();
  headers.set("Location", `${process.env.NEXT_PUBLIC_URL}/`);
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`, {
    headers: headers,
    status: 302,
  });
}

export const dynamic = "force-dynamic";
