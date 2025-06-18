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

import { promises as fs } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('fileUpload');
    const entries = Array.from(formData.entries());
    
    // Extract form fields
    const fields = {};
    entries.forEach(([key, value]) => {
      if (key !== 'fileUpload') {
        fields[key] = value;
      }
    });

    // Validate required fields
    if (!fields.firstName || !fields.lastName || !fields.email || !fields.phone) {
      return Response.json({
        success: false,
        message: 'First name, last name, email, and phone are required'
      }, { status: 400 });
    }

    // Handle file upload if exists
    let fileAttachment = null;
    if (file) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.access(uploadDir);
      } catch (error) {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const fileExt = path.extname(file.name);
      const fileName = `${Date.now()}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);
      
      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));
      
      fileAttachment = {
        filename: file.name,
        path: filePath,
        contentType: file.type
      };
    }

    // Send email with form data
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Conference Registration" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Conference Registration',
      html: `
        <h1>New Registration</h1>
        <p><strong>Name:</strong> ${fields.firstName} ${fields.lastName}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Phone:</strong> ${fields.phone}</p>
      `,
      attachments: fileAttachment ? [fileAttachment] : []
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: 'Registration details sent successfully!'
    }, { status: 200 });

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      message: error.message || 'Registration failed. Please try again.'
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 });
}