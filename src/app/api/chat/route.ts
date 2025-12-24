import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    // المفتاح الخاص بك
    const genAI = new GoogleGenerativeAI("AIzaSyBLkZt6NrBn58Zc0-xO0cz-Ga_9TgK7Lng");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`
      Context: ${context}
      User message: ${message}
      Role: You are Wagmi AI assistant. Answer in English only.
    `);
    
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}