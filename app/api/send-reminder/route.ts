// app/api/send-reminder/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { to, customerName, remainingAmount } = await req.json();

  // Use Resend, Nodemailer, etc.
  console.log("Reminder sent to:", to, customerName, remainingAmount);

  return NextResponse.json({ success: true });
}