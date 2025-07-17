import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const organization = formData.get('organization');
    const branch = formData.get('branch');
    const theme = formData.get('theme');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const file = formData.get('file');

    // Validate required fields
    if (!firstName || !lastName || !organization || !branch || !theme || !email || !phone || !file) {
      return NextResponse.json({
        success: false,
        message: 'All fields including the PDF file are required'
      }, { status: 400 });
    }

    // Convert PDF to base64 for email embedding
    const fileBuffer = await file.arrayBuffer();
    const base64PDF = Buffer.from(fileBuffer).toString('base64');

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send email with PDF in body
    await transporter.sendMail({
      from: `"Conference Registration" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Conference Registration',
      html: `
        <h1>New Registration</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>Theme:</strong> ${theme}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>PDF Preview:</strong></p>
        <iframe src="data:application/pdf;base64,${base64PDF}" width="100%" height="500px"></iframe>
        <p>Can't see the PDF? <a href="mailto:${process.env.RECIPIENT_EMAIL}">View in your email client</a></p>
      `,
      attachments: [{
        filename: file.name,
        content: Buffer.from(fileBuffer),
        contentType: file.type || 'application/pdf',
        disposition: 'inline' // Show in email body
      }]
    });

    return NextResponse.json({
      success: true,
      message: 'Paper details sent successfully with PDF preview!'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to send paper to email'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 });
}