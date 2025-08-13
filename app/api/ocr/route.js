import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    // Placeholder OCR: In production, send to OpenAI/GCP Vision, etc.
    // Return a simple mocked parse so the UI works immediately.
    const mock = {
      description: "Receipt",
      amount: 123.45,
      date: new Date().toISOString(),
    };
    return NextResponse.json(mock);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


