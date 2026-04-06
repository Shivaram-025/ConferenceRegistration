// "use client"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Globe, Hash, User } from "lucide-react"
// import Link from "next/link"
// import { ChangeEvent, FormEvent, useEffect, useState } from 'react'


// interface FormData {
//   firstName: string,
//   lastName: string,
//   idNumber: string,
//   fileUpload: File | null,
// }

// interface SubmitMessage {
//   type: 'success' | 'error' | '';
//   message: string;
// }

// export default function Registration() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     idNumber: '',
//     fileUpload: null,
//   });
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', message: '' });

//   // Add useEffect for scroll handling [^2]
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       const headerHeight = 80 // Account for fixed header height
//       const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
//       const offsetPosition = elementPosition - headerHeight

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       })
//     }
//   }
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];

//       // Validate file size (50KB = 50 * 1024 bytes)
//       if (file.size > 50 * 1024) {
//         setSubmitMessage({
//           type: 'error',
//           message: 'File size must be 50KB or less'
//         });
//         e.target.value = '';
//         return;
//       }

//       // Validate file type
//       if (file.type !== 'application/pdf') {
//         setSubmitMessage({
//           type: 'error',
//           message: 'Only PDF files are allowed'
//         });
//         e.target.value = '';
//         return;
//       }

//       setFormData(prev => ({ ...prev, fileUpload: file }));
//       setSubmitMessage({ type: '', message: '' });
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitMessage({ type: '', message: '' });

//     // Validate required fields
//     if (!formData.firstName || !formData.lastName || !formData.idNumber || !formData.fileUpload) {
//       setSubmitMessage({
//         type: 'error',
//         message: 'All fields are required'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     // Double-check file size
//     if (formData.fileUpload.size > 50 * 1024) {
//       setSubmitMessage({
//         type: 'error',
//         message: 'File size must be 50KB or less'
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('firstName', formData.firstName);
//       formDataToSend.append('lastName', formData.lastName);
//       formDataToSend.append('idNumber', formData.idNumber);
//       formDataToSend.append('file', formData.fileUpload);

//       const response = await fetch('/api/register', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send registration');
//       }

//       const result = await response.json();

//       if (result.success) {
//         setSubmitMessage({
//           type: 'success',
//           message: 'Registration successful!'
//         });

//         // Reset form
//         setFormData({
//           firstName: '',
//           lastName: '',
//           idNumber: '',
//           fileUpload: null,
//         });

//         // Clear file input
//         const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
//         if (fileInput) fileInput.value = '';
//       } else {
//         throw new Error(result.error || 'Registration failed');
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setSubmitMessage({
//         type: 'error',
//         message: err instanceof Error ? err.message : 'Registration failed. Please try again.'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       {/* Header */}
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white shadow-sm border-b"
//           }`}
//       >
//         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "py-3" : "py-4"}`}
//           >
//             <div className="flex items-center space-x-2">
//               <Globe className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">
//                 <Link
//                   href="https://international-conference-git-master-simonleo28s-projects.vercel.app/"
//                   rel="noopener noreferrer"
//                   className="hover:text-blue-600 transition-colors cursor-pointer"
//                 >
//                   ICAINXT-26
//                 </Link>
//               </h1>
//             </div>
//             <nav className="hidden md:flex space-x-8">
//               <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 <Link
//                   href="https://international-conference-git-master-simonleo28s-projects.vercel.app/#home"
//                   rel="noopener noreferrer"
//                   className="hover:text-blue-600 transition-colors cursor-pointer"
//                 >
//                   Home
//                 </Link>
//               </h1>
//               <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 <Link
//                   href="#schedule"
//                   rel="noopener noreferrer"
//                   className="hover:text-blue-600 transition-colors cursor-pointer"
//                 >
//                   schedule
//                 </Link>
//               </h1>
//               <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 <Link
//                   href="#register"
//                   rel="noopener noreferrer"
//                   className="hover:text-blue-600 transition-colors cursor-pointer"
//                 >
//                   Register
//                 </Link>
//               </h1>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 py-10">
//           <h1 className="text-3xl font-bold text-gray-900">Registration</h1>
//           <p className="text-gray-600 mt-2">Complete your registration by filling out the form below</p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Registration Form */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Registration Information
//                 </CardTitle>
//                 <CardDescription>
//                   Please provide your personal and payment information to complete registration
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {submitMessage.message && (
//                   <div className={`p-4 rounded-md ${submitMessage.type === 'success'
//                     ? 'bg-green-50 text-green-800'
//                     : 'bg-red-50 text-red-800'
//                     }`}>
//                     {submitMessage.message}
//                   </div>
//                 )}
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                   {/* Personal Information */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="firstName">First Name *</Label>
//                         <Input
//                           id="firstName"
//                           placeholder="Enter your first name"
//                           required
//                           value={formData.firstName}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="lastName">Last Name *</Label>
//                         <Input
//                           id="lastName"
//                           placeholder="Enter your last name"
//                           required
//                           value={formData.lastName}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="idNumber" className="flex items-center gap-2">
//                         <Hash className="h-4 w-4" />
//                         ID Number *
//                       </Label>
//                       <Input
//                         id="idNumber"
//                         placeholder="Enter your ID number"
//                         required
//                         value={formData.idNumber}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   <Separator />

//                   {/* Payment Acknowledgment Upload */}
//                   <div className="space-y-2">
//                     <Label htmlFor="fileUpload">Upload Your Payment Acknowledgement *</Label>
//                     <Input
//                       id="fileUpload"
//                       type="file"
//                       accept=".pdf"
//                       required
//                       onChange={handleFileChange}
//                     />
//                     <p className="text-sm text-gray-500">
//                       {formData.fileUpload
//                         ? `Selected file: ${formData.fileUpload.name} (${Math.round(formData.fileUpload.size / 1024)}KB)`
//                         : 'Aknowledgemnt in PDF format (max 50KB)'}
//                     </p>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-4">
//                     <Button
//                       type="submit"
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Completing...' : 'Complete Registration'}
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* QR Code Section */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-8">
//               <CardHeader>
//                 <CardTitle>Payment QR Code</CardTitle>
//                 <CardDescription>Scan this QR code for payment to complete registration</CardDescription>
//               </CardHeader>
//               <CardContent className="flex flex-col items-center space-y-4">
//                 <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
//                   <img src="/placeholder.svg?height=180&width=180" alt="Registration QR Code" className="w-44 h-44" />
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600 mb-2">Registration ID</p>
//                   <p className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">REG-2024-001234</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-xs text-gray-500">Keep this QR code for your records</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client"

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// import { Hash, IndianRupee, Upload, User } from 'lucide-react';
// import { useState } from 'react';

// const branches = [
//   'Computer Science', 'Electronics & Communication', 'Artificial Intelligence',
//   'Data Science', 'Mechanical', 'Civil', 'Electrical', 'Other'
// ];

// const themes = [
//   "AI Applications in Healthcare, Agriculture & Education",
//   "AI E-Governance",
//   "Advanced Communication systems and Image Processing",
//   "Advanced Computing & Networking",
//   "Advanced Manufacturing and Operations Technologies",
//   "Artificial Intelligence & Data Science",
//   "Business Management, Business Analytics & Sustainable Management Practices",
//   "Cloud Computing",
//   "Construction and Management Technologies",
//   "Cybersecurity",
//   "Energy, Sustainability & Climate Change",
//   "Materials, Rare-earth & Critical Minerals",
//   "Robotics & Automation",
//   "Smart Cities & Mobility",
//   "VLSI Design & Embedded Systems"
// ]

// export default function RegistrationPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     organization: '',
//     idNumber: '',
//     branch: '',
//     category: '',
//     paymentFile: null as File | null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.size > 100 * 1024) {
//       setMessage({ text: 'File must be under 100KB', type: 'error' });
//       return;
//     }
//     setFormData({ ...formData, paymentFile: file });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage(null);

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1800));

//     setIsSubmitting(false);
//     setMessage({
//       text: 'Registration successful! You will receive confirmation via email.',
//       type: 'success'
//     });
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold text-indigo-900 mb-3">ICAINXT-25</h1>
//             <p className="text-2xl text-indigo-700">Registration</p>
//             <p className="text-gray-600 mt-2">Complete your registration</p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-10">
//             {/* Form */}
//             <div className="lg:col-span-2">
//               <Card className="shadow-xl border-0">
//                 <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
//                   <CardTitle className="flex items-center gap-3 text-2xl">
//                     <User className="h-7 w-7" />
//                     Registration Form
//                   </CardTitle>
//                   <CardDescription className="text-indigo-100">
//                     Fill details & upload payment proof
//                   </CardDescription>
//                 </CardHeader>

//                 <CardContent className="pt-8">
//                   {message && (
//                     <div className={`p-4 rounded-lg mb-6 font-medium ${message.type === 'success'
//                       ? 'bg-green-50 text-green-800 border border-green-200'
//                       : 'bg-red-50 text-red-800 border border-red-200'
//                       }`}>
//                       {message.text}
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit} className="space-y-7">
//                     {/* Personal Info */}
//                     <div className="space-y-5">
//                       <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                         <Hash className="h-5 w-5 text-indigo-600" />
//                         Personal Details
//                       </h3>
//                       <div className="grid md:grid-cols-2 gap-5">
//                         <div>
//                           <Label htmlFor="firstName">First Name *</Label>
//                           <Input id="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Priya" />
//                         </div>
//                         <div>
//                           <Label htmlFor="lastName">Last Name *</Label>
//                           <Input id="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Sharma" />
//                         </div>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-5">
//                         <div>
//                           <Label htmlFor="email">Email *</Label>
//                           <Input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder="priya@example.com" />
//                         </div>
//                         <div>
//                           <Label htmlFor="phone">Phone *</Label>
//                           <Input id="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
//                         </div>
//                       </div>

//                       <div>
//                         <Label htmlFor="organization">College / Organization *</Label>
//                         <Input id="organization" required value={formData.organization} onChange={handleChange} placeholder="VIT University" />
//                       </div>

//                       {/* <div>
//                         <Label htmlFor="idNumber">ID Number *</Label>
//                         <Input id="idNumber" required value={formData.idNumber} onChange={handleChange} placeholder="2021CS10123" />
//                       </div> */}
//                     </div>

//                     <Separator className="my-8" />

//                     {/* Academic Info */}
//                     <div className="space-y-5">
//                       <h3 className="text-xl font-semibold text-gray-800">Academic Info</h3>
//                       <div className="grid md:grid-cols-2 gap-5">
//                         <div>
//                           <Label>Branch / Department *</Label>
//                           <Select value={formData.branch} onValueChange={(v) => setFormData({ ...formData, branch: v })} required>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select branch" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {branches.map(b => (
//                                 <SelectItem key={b} value={b}>{b}</SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         <div>
//                           <Label>Research Theme *</Label>
//                           <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })} required>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select research theme" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {themes.map(c => (
//                                 <SelectItem key={c} value={c}>{c}</SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator className="my-8" />

//                     {/* File Upload Section */}
//                     <div className="space-y-2">
//                       <Label htmlFor="fileUpload">Upload Your Abstract *</Label>
//                       <Input
//                         id="fileUpload"
//                         type="file"
//                         accept=".pdf"
//                         required
//                         onChange={handleFileChange}
//                       />
//                       <p className="text-sm text-gray-500">
//                         {formData.fileUpload
//                           ? `Selected file: ${formData.fileUpload.name} (${Math.round(formData.fileUpload.size / 1024)}KB)`
//                           : 'Abstract paper in PDF format (max 50KB)'}
//                       </p>
//                     </div>

//                     {/* Payment Proof Upload */}
//                     <div className="space-y-4">
//                       <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                         <Upload className="h-6 w-6 text-indigo-600" />
//                         Upload Payment Proof *
//                       </h3>
//                       <Input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         required
//                         onChange={handleFileChange}
//                         className="file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
//                       />
//                       <p className="text-sm text-gray-500">
//                         {formData.paymentFile
//                           ? <span className="text-green-600 font-medium">
//                             Selected: {formData.paymentFile.name} ({(formData.paymentFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                           : 'PDF or Image • Max 100KB • Screenshot of UPI/NEFT'}
//                       </p>
//                     </div>

//                     {/* Submit */}
//                     <Button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg"
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center gap-3">
//                           <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Processing...
//                         </span>
//                       ) : (
//                         'Complete Registration'
//                       )}
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* QR Code + Payment Info */}
//             <div className="space-y-6">
//               <Card className="sticky top-6 shadow-2xl border-0 overflow-hidden">
//                 <CardHeader className="bg-gradient-to-b from-indigo-700 to-indigo-800 text-white">
//                   <CardTitle className="flex items-center gap-2">
//                     <IndianRupee className="h-6 w-6" />
//                     Payment Details
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-6 space-y-6">
//                   <div className="text-center">
//                     <div className="w-56 h-56 mx-auto bg-white p-4 rounded-2xl shadow-inner border-4 border-indigo-100">
//                       <img
//                         src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=icainxt25@upi&pn=ICAINXT-25&am=750&cu=INR"
//                         alt="UPI QR Code"
//                         className="w-full h-full rounded-lg"
//                       />
//                     </div>
//                     <p className="mt-4 text-sm font-medium text-gray-700">Scan to Pay</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
//                     <h4 className="font-bold text-amber-900 mb-3">Fee Structure</h4>
//                     <ul className="space-y-2 text-sm">
//                       <li><strong>Student:</strong> ₹750</li>
//                       <li><strong>Faculty:</strong> ₹1500</li>
//                       <li><strong>Industry:</strong> ₹3000</li>
//                     </ul>
//                   </div>

//                   <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
//                     <h4 className="font-bold text-blue-900 mb-2">UPI ID</h4>
//                     <code className="block bg-white px-4 py-2 rounded font-mono text-sm text-center">
//                       icainxt25@upi
//                     </code>
//                   </div>

//                   <div className="text-center text-xs text-gray-500">
//                     <p>After payment, upload screenshot above</p>
//                     <p className="mt-1 font-medium text-indigo-600">Reg ID: REG-2025-00{String(Math.floor(Math.random() * 9999)).padStart(4, '0')}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div >
//     </>
//   );
// }


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, User } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'



interface FormData {
  firstName: string,
  lastName: string,
  organization: string,
  branch: string,
  theme: string,
  email: string,
  phone: string,
  fileUpload: File | null,
}

interface SubmitMessage {
  type: 'success' | 'error' | '';
  message: string;
}

const branches = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
]

const themes = [
  "AI Applications in Healthcare, Agriculture & Education",
  "AI E-Governance",
  "Advanced Communication systems and Image Processing",
  "Advanced Computing & Networking",
  "Advanced Manufacturing and Operations Technologies",
  "Artificial Intelligence & Data Science",
  "Business Management, Business Analytics & Sustainable Management Practices",
  "Cloud Computing",
  "Construction and Management Technologies",
  "Cybersecurity",
  "Energy, Sustainability & Climate Change",
  "Materials, Rare-earth & Critical Minerals",
  "Robotics & Automation",
  "Smart Cities & Mobility",
  "VLSI Design & Embedded Systems"
]

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    organization: '',
    branch: '',
    theme: '',
    email: '',
    phone: '',
    fileUpload: null,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', message: '' });

  // Add useEffect for scroll handling [^2]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file size (50KB = 50 * 1024 bytes)
      if (file.size > 50 * 1024) {
        setSubmitMessage({
          type: 'error',
          message: 'File size must be 50KB or less'
        });
        e.target.value = '';
        return;
      }

      // Validate file type
      if (file.type !== 'application/pdf') {
        setSubmitMessage({
          type: 'error',
          message: 'Only PDF files are allowed'
        });
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, fileUpload: file }));
      setSubmitMessage({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', message: '' });

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.branch || !formData.fileUpload) {
      setSubmitMessage({
        type: 'error',
        message: 'All fields are required'
      });
      setIsSubmitting(false);
      return;
    }

    // Double-check file size
    if (formData.fileUpload.size > 50 * 1024) {
      setSubmitMessage({
        type: 'error',
        message: 'File size must be 50KB or less'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('branches', formData.branch);
      formDataToSend.append('theme', formData.theme);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('file', formData.fileUpload);

      const response = await fetch('/api/registration', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to send registration');
      }

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          message: 'Registration successful!'
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          organization: '',
          branch: '',
          theme: '',
          email: '',
          phone: '',
          fileUpload: null,
        });

        // Clear file input
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitMessage({
        type: 'error',
        message: err instanceof Error ? err.message : 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white shadow-sm border-b"
          }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "py-3" : "py-4"}`}
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                <Link
                  href="https://international-conference-git-master-simonleo28s-projects.vercel.app/"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  ICAINXT-25
                </Link>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <Link
                  href="https://international-conference-git-master-simonleo28s-projects.vercel.app/#home"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </h1>
              <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <Link
                  href="#schedule"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  schedule
                </Link>
              </h1>
              <h1 className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <Link
                  href="#register"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Register
                </Link>
              </h1>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Registration</h1>
          <p className="text-gray-600 mt-2">Complete your registration by filling out the form below</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Registration Information
                </CardTitle>
                <CardDescription>
                  Please provide your personal and payment information to complete registration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {submitMessage.message && (
                  <div className={`p-4 rounded-md ${submitMessage.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                    }`}>
                    {submitMessage.message}
                  </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="idNumber" className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        ID Number *
                      </Label>
                      <Input
                        id="idNumber"
                        placeholder="Enter your ID number"
                        required
                        value={formData.idNumber}
                        onChange={handleChange}
                      />
                    </div> */}

                    {/*Organization Name*/}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Organization Name *</Label>
                      <Input
                        id="organization"
                        placeholder="Name of the organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Academic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Branch Dropdown */}
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch/Department *</Label>
                          <Select name="branch"
                            value={formData.branch}
                            onValueChange={(value) => setFormData({ ...formData, branch: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your branch" />
                            </SelectTrigger>
                            <SelectContent>
                              {branches.map((branch) => (
                                <SelectItem key={branch} value={branch}>
                                  {branch}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Theme Dropdown */}
                        <div className="space-y-2">
                          <Label htmlFor="theme">Research Theme *</Label>
                          <Select name="theme"
                            value={formData.theme}
                            onValueChange={(value) => setFormData({ ...formData, theme: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select research theme" />
                            </SelectTrigger>
                            <SelectContent>
                              {themes.map((theme) => (
                                <SelectItem key={theme} value={theme}>
                                  {theme}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/*Email Address*/}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {/*Phone Number*/}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 9876543210"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">Document upload</h3>

                    {/* File Upload Section */}
                    <div className="space-y-2">
                      <Label htmlFor="fileUpload">Upload Your Paper *</Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        accept=".pdf"
                        required
                        onChange={handleFileChange}
                      />
                      <p className="text-sm text-gray-500">
                        {formData.fileUpload
                          ? `Selected file: ${formData.fileUpload.name} (${Math.round(formData.fileUpload.size / 1024)}KB)`
                          : 'Research paper in PDF format (max 50MB)'}
                      </p>
                    </div>
                  </div>

                  {/* Payment Acknowledgment Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="fileUpload">Upload Your Payment Acknowledgement *</Label>
                    <Input
                      id="fileUpload"
                      type="file"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-500">
                      {formData.fileUpload
                        ? `Selected file: ${formData.fileUpload.name} (${Math.round(formData.fileUpload.size / 1024)}KB)`
                        : 'Aknowledgemnt in PDF format (max 100KB)'}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Completing...' : 'Complete Registration'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* QR Code Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Payment QR Code</CardTitle>
                <CardDescription>Scan this QR code for payment to complete registration</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <img src="/placeholder.svg?height=180&width=180" alt="Registration QR Code" className="w-44 h-44" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Registration ID</p>
                  <p className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">REG-2024-001234</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Keep this QR code for your records</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}