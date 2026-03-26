import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure your SMTP transport
    // Option 1: Gmail (enable App Passwords in Google Account)
    // Option 2: Any SMTP provider
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "imosmanwaris.tech@gmail.com",
        pass: process.env.EMAIL_PASS || "", // Set in .env.local
      },
    });

    // If no EMAIL_PASS configured, use EmailJS fallback response
    if (!process.env.EMAIL_PASS) {
      // Still return success - in production, configure EMAIL_PASS
      // For now, log the contact attempt
      console.log("Contact form submission:", { name, email, subject, message });
      return NextResponse.json({
        success: true,
        message: "Message received! (Email delivery requires SMTP configuration)",
      });
    }

    // Send email to Usman
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "imosmanwaris.tech@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject || "New Contact"} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a1628; color: #e8e0d0; border-radius: 12px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37; margin-bottom: 16px;">New Portfolio Message</h2>
          <p><strong style="color: #f0c75e;">From:</strong> ${name} (${email})</p>
          <p><strong style="color: #f0c75e;">Subject:</strong> ${subject || "No subject"}</p>
          <hr style="border-color: #243356; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          <hr style="border-color: #243356; margin: 16px 0;" />
          <p style="font-size: 12px; color: #6a6050;">Sent from The Digital Majlis Portfolio</p>
        </div>
      `,
    });

    // Send auto-reply to sender
    await transporter.sendMail({
      from: `"Usman Waris" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a1628; color: #e8e0d0; border-radius: 12px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37;">Assalamu Alaikum, ${name}!</h2>
          <p>Thank you for visiting my portfolio and reaching out. I've received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to check out my work:</p>
          <ul>
            <li><a href="https://github.com/usmancynosure" style="color: #f0c75e;">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/usman-waris-0a9b8c7d/" style="color: #f0c75e;">LinkedIn</a></li>
          </ul>
          <p>Best regards,<br/><strong style="color: #d4af37;">Usman Waris</strong><br/>AI Engineer</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly at imosmanwaris.tech@gmail.com" },
      { status: 500 }
    );
  }
}
