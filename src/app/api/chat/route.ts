import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const genAI = new GoogleGenerativeAI("AIzaSyBLkZt6NrBn58Zc0-xO0cz-Ga_9TgK7Lng");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`
      Role: Professional AI Assistant for Wagmi (Solana Terminal) by Bader Alkorgli.
      Context: ${context}
      User Message: ${message}
      Instruction: Answer in English, keep it professional and concise.
    `);

    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini Edge Error:", error);
    return NextResponse.json({ error: "Failed to connect to AI" }, { status: 500 });
  }
}