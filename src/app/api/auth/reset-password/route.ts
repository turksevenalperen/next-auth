import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      email,
      connection: "Username-Password-Authentication",
    }),
  });
  if (response.ok) {
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 400 });
  }
}