// const mongoose = require('mongoose');

// const registrationSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, 'First name is required'],
//       trim: true,
//     },
//     lastName: {
//       type: String,
//       required: [true, 'Last name is required'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: function (email) {
//           return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
//         },
//         message: 'Please enter a valid email',
//       },
//     },
//     phone: {
//       type: String,
//       required: [true, 'Phone number is required'],
//       trim: true,
//       validate: {
//         validator: function (phone) {
//           return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/.test(phone);
//         },
//         message: 'Please enter a valid phone number',
//       },
//     },
//     fileUrl: {
//       type: String,
//       required: [true, 'File URL is required'],
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'approved', 'rejected'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt fields
// );

// // Prevent duplicate emails
// registrationSchema.index({ email: 1 }, { unique: true });

// // Export the model
// module.exports = mongoose.models?.Registration || mongoose.model('Registration', registrationSchema);

import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    unique: true // Remove if you don't need unique emails
  },
  phone: { type: String, required: true },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Remove this if you're getting duplicate index warnings
// registrationSchema.index({ email: 1 }, { unique: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;