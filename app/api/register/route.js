// import { promises as fs } from 'fs';
// import path from 'path';
// import connectDB from '../lib/connectDB';
// import Registration from '../models/Registration';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   try {
//     // Convert Web API Request to Node.js-like request
//     const formData = await request.formData();
//     const file = formData.get('fileUpload');
//     const entries = Array.from(formData.entries());
    
//     const fields = {};
//     entries.forEach(([key, value]) => {
//       if (key !== 'fileUpload') {
//         fields[key] = value;
//       }
//     });

//     // Validate required fields
//     if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone || !file) {
//       return Response.json({
//         success: false,
//         message: 'All fields are required'
//       }, { status: 400 });
//     }

//     // Connect to database
//     await connectDB();

//     // Handle file upload
//     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//     try {
//       await fs.access(uploadDir);
//     } catch (error) {
//       await fs.mkdir(uploadDir, { recursive: true });
//     }

//     const fileExt = path.extname(file.name);
//     const fileName = `${Date.now()}${fileExt}`;
//     const filePath = path.join(uploadDir, fileName);
    
//     // Convert file to buffer and write to disk
//     const buffer = await file.arrayBuffer();
//     await fs.writeFile(filePath, Buffer.from(buffer));

//     // Save to database
//     const newRegistration = new Registration({
//       firstName: fields.firstName,
//       lastName: fields.lastName,
//       email: fields.email,
//       phone: fields.phone,
//       filePath: `/uploads/${fileName}`,
//     });

//     await newRegistration.save();

//     return Response.json({
//       success: true,
//       message: 'Registration successful!'
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Registration error:', error);
//     return Response.json({
//       success: false,
//       message: error.message || 'Registration failed. Please try again.'
//     }, { status: 500 });
//   }
// }

// export async function GET() {
//   return Response.json({
//     success: false,
//     message: 'Method not allowed'
//   }, { status: 405 });
// }




// import { promises as fs } from 'fs';
// import nodemailer from 'nodemailer';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('fileUpload');
//     const entries = Array.from(formData.entries());
    
//     // Extract form fields
//     const fields = {};
//     entries.forEach(([key, value]) => {
//       if (key !== 'fileUpload') {
//         fields[key] = value;
//       }
//     });

//     // Validate required fields
//     if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone) {
//       return Response.json({
//         success: false,
//         message: 'First name, last name, email, and phone are required'
//       }, { status: 400 });
//     }

//     // Handle file upload if exists
//     let fileAttachment = null;
//     if (file) {
//       const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//       try {
//         await fs.access(uploadDir);
//       } catch (error) {
//         await fs.mkdir(uploadDir, { recursive: true });
//       }

//       const fileExt = path.extname(file.name);
//       const fileName = `${Date.now()}${fileExt}`;
//       const filePath = path.join(uploadDir, fileName);
      
//       const buffer = await file.arrayBuffer();
//       await fs.writeFile(filePath, Buffer.from(buffer));
      
//       fileAttachment = {
//         filename: file.name,
//         path: filePath,
//         contentType: file.type
//       };
//     }

//     // Send email with form data
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"Conference Registration" <${process.env.EMAIL_USER}>`,
//       to: process.env.RECIPIENT_EMAIL,
//       subject: 'New Conference Registration',
//       html: `
//         <h1>New Registration</h1>
//         <p><strong>Name:</strong> ${fields.firstName} ${fields.lastName}</p>
//         <p><strong>Email:</strong> ${fields.email}</p>
//         <p><strong>Phone:</strong> ${fields.phone}</p>
//       `,
//       attachments: fileAttachment ? [fileAttachment] : []
//     };

//     await transporter.sendMail(mailOptions);

//     return Response.json({
//       success: true,
//       message: 'Registration details sent successfully!'
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Registration error:', error);
//     return Response.json({
//       success: false,
//       message: error.message || 'Registration failed. Please try again.'
//     }, { status: 500 });
//   }
// }

// export async function GET() {
//   return Response.json({
//     success: false,
//     message: 'Method not allowed'
//   }, { status: 405 });
// }



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
    const email = formData.get('email');
    const phone = formData.get('phone');
    const file = formData.get('file');

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !file) {
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
      message: 'Registration details sent successfully with PDF preview!'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to send registration email'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 });
}