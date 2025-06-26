import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        email,
        password,
        connection: "Username-Password-Authentication",
      }),
    });

    const text = await response.text();
    console.log("Auth0 signup raw response:", text);
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }

    if (response.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: data.error || data }, { status: 400 });
    }
  } catch (err: unknown) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Sunucu hatası veya Auth0 bağlantı sorunu" }, { status: 500 });
  }
}