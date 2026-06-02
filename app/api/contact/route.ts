import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "bamoaniyeboah@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #05060f; color: #f0f0f5; border-radius: 12px;">
          <div style="margin-bottom: 24px;">
            <span style="background: #00d4ff; color: #000; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.08em; text-transform: uppercase;">
              New Portfolio Message
            </span>
          </div>
          <h2 style="margin: 0 0 4px; font-size: 22px; color: #ffffff;">You heard from ${name}</h2>
          <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px;">Replied to: <a href="mailto:${email}" style="color: #00d4ff;">${email}</a></p>
          <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #d1d5db; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 0; font-size: 12px; color: #4b5563;">Sent from your portfolio at bright.dev · Hit reply to respond directly to ${name}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
