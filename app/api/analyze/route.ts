import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (text.length > 3000) {
      return NextResponse.json(
        { error: "Text too long (max 3000 chars)" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(text) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty response from Groq");

    const result = JSON.parse(raw);
    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
