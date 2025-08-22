// import { NextResponse } from 'next/server';
// import { Buffer } from 'node:buffer';
// import nodemailer from 'nodemailer';

// export const config = {
//     api: {
//       bodyParser: false,
//     },
// };

// export async function POST(request) {
//   try{
//     const formData = await request.formData();

//     //Extract form data
//     const firstName = formData.get('firstName');
//     const lastName = formData.get('lastName');
//     const idNumber = formData.get('idNumber');
//     const file = formData.get('file');

//     if (!firstName || !lastName || !idNumber || !file) {
//       return NextResponse.json({
//         success: false,
//         message: 'All fields including the PDF file are required'
//       },
//       { status: 400 });
//     }

//     //const fileBuffer = await file.arrayBuffer();
//     const base64PDF = Buffer.from(await file.arrayBuffer()).toString('base64');
    
//     // Create email transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     await transporter.sendMail({
//       from: `"Conference Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: 'New Conference Registration',
//       html: `
//         <h1>New Registration</h1>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>ID Number:</strong> ${idNumber}</p>
//         <iframe src="data:application/pdf;base64,${base64PDF}" width="100%" height="500px"></iframe>
//         <p>Can't see the PDF? <a href="mailto:${process.env.RECIPIENT_EMAIL}">View in your email client</a></p>
//       `,
//       attachments: [{
//         filename: file.name,
//         content: Buffer.from(fileBuffer),
//         contentType: file.type || 'application/pdf',
//         disposition: 'inline' // Show in email body
//       }]
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Registration details sent successfully with PDF preview!'
//     });

//   } catch (error) {
//       console.error('Email sending error:', error);
//       return NextResponse.json({
//         success: false,
//         message: error.message || 'Failed to send registration email'
//     }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({
//     success: false,
//     message: 'Method not allowed'
//   }, { status: 405 });
// }

import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const formData = await request.formData()

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const idNumber = formData.get("idNumber")
    const file = formData.get("file")

    // Validate required fields
    if (!firstName || !lastName || !idNumber || !file) {
      return NextResponse.json(
        { success: false, message: "All fields including the PDF file are required" },
        { status: 400 },
      )
    }

    // Validate file size (50KB limit)
    if (file.size > 50 * 1024) {
      return NextResponse.json({ success: false, message: "File size must be 50KB or less" }, { status: 400 })
    }

    // Validate file type (optional - you can add specific file type validation)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only PDF, JPEG, PNG, and JPG files are allowed" },
        { status: 400 },
      )
    }

    // Here you would typically:
    // 1. Save the file to storage (local, cloud, etc.)
    // 2. Save the registration data to a database
    // 3. Send confirmation email
    // 4. Process the registration

    console.log("Registration received:", {
      firstName,
      lastName,
      idNumber,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })

    // For now, just return success
    // In a real application, you'd implement the actual registration logic
    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully! We will review your application and get back to you soon.",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 },
    )
  }
}
