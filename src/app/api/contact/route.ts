import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { name, email, message, includeResume } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.YOUR_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}\n\nIncludes Resume:\n${String(
        includeResume
      )}`,
    });

    if (includeResume) {
      const resumePath = path.join(process.cwd(), "public", "sindri-resume.pdf");
      const resumeBuffer = fs.readFileSync(resumePath);

      await transporter.sendMail({
        from: `"Sindri's Portfolio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Here’s my resume",
        text: `Hi ${name},\n\nThanks for reaching out!\nHere's my resume.`,
        attachments: [
          {
            filename: "resume.pdf",
            content: resumeBuffer,
          },
        ],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
