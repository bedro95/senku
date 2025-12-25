import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// إجبار السيرفر على الاستجابة الديناميكية السريعة
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    // استخدام المفتاح مباشرة لضمان عدم وجود أخطاء في التعريف
    const genAI = new GoogleGenerativeAI("AIzaSyBLkZt6NrBn58Zc0-xO0cz-Ga_9TgK7Lng");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`
      Role: You are Wagmi AI, a professional Solana expert assistant. 
      Context: ${context}
      User Message: ${message}
      Rule: Answer in English only, be very concise and fast.
    `);

    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ text: "I'm ready now. Please ask again!" }, { status: 200 });
  }
}