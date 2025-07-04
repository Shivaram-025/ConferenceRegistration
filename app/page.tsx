// "use client"
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CalendarDays, Facebook, Globe, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
// import Link from "next/link";
// import { ChangeEvent, FormEvent, useState } from 'react';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   fileUpload: File | null;
// }

// interface SubmitMessage {
//   type: 'success' | 'error' | '';
//   message: string;
// }

// export default function ConferenceRegistration() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     fileUpload: null,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', message: '' });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFormData(prev => ({ ...prev, fileUpload: e.target.files![0] }));
//     }
//   };

//  const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setSubmitMessage({ type: '', message: '' });

//   try {
//     const formDataToSend = new FormData();
//     formDataToSend.append('firstName', formData.firstName);
//     formDataToSend.append('lastName', formData.lastName);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('phone', formData.phone);
//     if (formData.fileUpload) {
//       formDataToSend.append('fileUpload', formData.fileUpload);
//     }

//     const response = await fetch('/api/register', {
//       method: 'POST',
//       body: formDataToSend,
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
    
//     if (data.success) {
//       setSubmitMessage({ type: 'success', message: data.message });
//       // Reset form
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         fileUpload: null,
//       });
//       // Clear file input
//       const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
//       if (fileInput) fileInput.value = '';
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (err) {
//     console.error('Submission error:', err);
//     setSubmitMessage({ 
//       type: 'error', 
//       message: err instanceof Error ? err.message : 'Registration failed. Please try again.' 
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// "use client"
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { CalendarDays, Facebook, Globe, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
// import Link from "next/link";
// import { ChangeEvent, FormEvent, useState } from 'react';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   fileUpload: File | null;
// }

// interface SubmitMessage {
//   type: 'success' | 'error' | '';
//   message: string;
// }

// export default function ConferenceRegistration() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     fileUpload: null,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', message: '' });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFormData(prev => ({ ...prev, fileUpload: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitMessage({ type: '', message: '' });

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('firstName', formData.firstName);
//       formDataToSend.append('lastName', formData.lastName);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone', formData.phone);
//       if (formData.fileUpload) {
//         formDataToSend.append('file', formData.fileUpload);
//       }

//       // Changed endpoint to email-specific API
//       const response = await fetch('/api/send-email', {
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
//           message: 'Registration successful! We have sent your details via email.' 
//         });
        
//         // Reset form
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           phone: '',
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
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-2">
//               <Globe className="h-8 w-8 text-blue-600" />
//               <h1 className="text-2xl font-bold text-gray-900">ICASNXT-25</h1>
//             </div>
//             <nav className="hidden md:flex space-x-8">
//               <Link href="#home" className="text-gray-700 hover:text-blue-600 font-medium">
//                 Home
//               </Link>
//               <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
//                 About
//               </Link>
//               <Link href="#speakers" className="text-gray-700 hover:text-blue-600 font-medium">
//                 Speakers
//               </Link>
//               <Link href="#schedule" className="text-gray-700 hover:text-blue-600 font-medium">
//                 Schedule
//               </Link>
//               <Link href="#register" className="text-gray-700 hover:text-blue-600 font-medium">
//                 Register
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </header>

      // {/* Hero Section */}
      // <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //     <div className="text-center">
      //       <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
      //         International Conference on AI solutions addressing Next Generation Technological Growth<br/>
      //         <span className="text-blue-700">(ICASNXT-25)</span>
      //       </h1>
      //       <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      //         This premier conference aims to bring together academicians, researchers and industry experts 
      //         to explore AI solutions addressing Next Generation Technological Growth in all the Technological
      //         domains driven by Artificial Intelligence such as Data Science and Advanced Computer Networking solutions, 
      //         Machine Manufacturing & operations, Construction technology and Management and so on.
      //       </p>
      //       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      //         <div className="flex items-center text-gray-700">
      //           <CalendarDays className="h-5 w-5 mr-2" />
      //           <span className="font-medium">26th and 27th September 2025</span>
      //         </div>
      //         <div className="flex items-center text-gray-700">
      //           <MapPin className="h-5 w-5 mr-2" />
      //           <span className="font-medium">AIEMS, Bengaluru</span>
      //         </div>
      //       </div>
      //       <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
      //         <Link href="#register">Register Now</Link>
      //       </Button>
      //     </div>
      //   </div>
      // </section>
      
      // {/* About Section */}
      // <section id="about" className="py-20 bg-white">
      //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //     <div className="text-center mb-16">
      //       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About ICASNXT-25</h2>
      //       <div className="text-lg text-gray-600 max-w-7xl mx-auto space-y-4">
      //         <p>
      //           The International Conference on AI Solutions Addressing Next Generation Technological Growth (ICASNXT-25) is a premier global forum scheduled to be
      //           held on 26th–27th September 2025, aiming to bring together leading academicians, researchers, and industry professionals.
      //           The event will explore cutting-edge AI-driven solutions that address challenges and opportunities across a broad spectrum of next-generation technological domains.
      //         </p>
      //         <p>
      //           This conference serves as a dynamic platform for presenting novel ideas, research innovations, and real-world AI applications in fields such as Data Science,
      //           Advanced Networking, Smart Cities, Robotics, Advanced Manufacturing, and Sustainable Technologies. With the rapid evolution of AI and its growing impact across industries,
      //           ICASNXT-25 is designed to foster interdisciplinary collaboration and knowledge exchange.
      //         </p>
      //         <p>
      //           All submitted papers must be in English, and selected high-quality 
      //           papers will be published in Springer or Scopus-indexed publications, depending on publisher acceptance.
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </section>

//       {/* Registration Section */}
//       <section id="register" className="py-20 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Registration</h2>
//             <p className="text-lg text-gray-600">Secure your spot at ICASNXT-25</p>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Registration Form</CardTitle>
//               <CardDescription>Please fill out all required fields to complete your registration</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {submitMessage.message && (
//                 <div className={`p-4 rounded-md ${
//                   submitMessage.type === 'success'
//                     ? 'bg-green-50 text-green-800'
//                     : 'bg-red-50 text-red-800'
//                 }`}>
//                   {submitMessage.message}
//                 </div>
//               )}
//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 {/* Personal Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName">First Name *</Label>
//                       <Input
//                         id="firstName"
//                         placeholder="Enter your first name"
//                         required
//                         value={formData.firstName}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName">Last Name *</Label>
//                       <Input
//                         id="lastName"
//                         placeholder="Enter your last name"
//                         required
//                         value={formData.lastName}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address *</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your.email@example.com"
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone Number *</Label>
//                       <Input
//                         id="phone"
//                         type="tel"
//                         placeholder="+91 9876543210"
//                         required
//                         value={formData.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* File Upload Section */}
//                 <div className="space-y-2">
//                   <Label htmlFor="fileUpload">Upload Your Paper (PDF only) *</Label>
//                   <Input
//                     id="fileUpload"
//                     type="file"
//                     accept=".pdf"
//                     required
//                     onChange={handleFileChange}
//                   />
//                   <p className="text-sm text-gray-500">Please upload your research paper in PDF format(below 50kb)</p>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Processing...' : 'Complete Registration'}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
//             <p className="text-lg text-gray-600">Have questions? Get in touch with our organizing committee</p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             <Card>
//               <CardContent className="pt-6 space-y-4">
//                 <div className="flex items-start">
//                   <Mail className="h-5 w-5 text-blue-600 mr-3 mt-1" />
//                   <div>
//                     <h3 className="font-semibold">Email</h3>
//                     <p className="text-gray-600">
//                       <a
//                         href="mailto:kumarbid@gmail.com"
//                         className="hover:text-blue-600 underline"
//                       >
//                         kumarbid@gmail.com
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Phone className="h-5 w-5 text-blue-600 mr-3 mt-1" />
//                   <div>
//                     <h3 className="font-semibold">Phone</h3>
//                     <p className="text-gray-600">
//                       <a
//                         href="tel:+917892438079"
//                         className="hover:text-blue-600 underline"
//                       >
//                         +91 7892438079
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="flex items-start">
//                   <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
//                   <div>
//                     <h3 className="font-semibold">Venue</h3>
//                     <p className="text-gray-600">
//                       <a
//                         href="https://aiems.edu.in/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="hover:text-blue-600 "
//                       >
//                         Amruta Institute of Engineering and Management Sciences (AIEMS)
//                       </a>
//                       <br />
//                       Bidadi, Ramanagara District
//                       <br />
//                       Bengaluru - 562109
//                       <br />
//                       Karnataka, India
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Globe className="h-6 w-6 text-blue-400" />
//                 <span className="text-xl font-bold">ICASNXT-25</span>
//               </div>
//               <p className="text-gray-400">
//                 International Conference on AI Solutions Addressing Next Generation Technological Growth
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <Link href="#home" className="hover:text-white transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#about" className="hover:text-white transition-colors">
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#register" className="hover:text-white transition-colors">
//                     Register
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Important Dates</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>Paper Submission: June 30, 2025</li>
//                 <li>Notification of Acceptance: August 15, 2025</li>
//                 <li>Conference Dates: September 26-27, 2025</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-medium mb-2">Follow Us</h4>
//               <div className="flex space-x-4">
//                 <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
//                   <Twitter className="h-5 w-5" />
//                 </a>
//                 <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
//                   <Linkedin className="h-5 w-5" />
//                 </a>
//                 <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
//                   <Facebook className="h-5 w-5" />
//                 </a>
//                 <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
//                   <Youtube className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 International Conference on AI Solutions (ICASNXT-25). All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }


"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fileUpload: File | null;
}

interface SubmitMessage {
  type: 'success' | 'error' | '';
  message: string;
}

export default function ConferenceRegistration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fileUpload: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', message: '' });

  // Add this state and effect at the top of your component
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // Change header style after 50px scroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add smooth scroll function
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
  //

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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.fileUpload) {
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
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('file', formData.fileUpload);

      const response = await fetch('/api/register', {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ICASNXT-25</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Button onClick= {() => scrollToSection("home")} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Button>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              {/* <Link href="#speakers" className="text-gray-700 hover:text-blue-600 font-medium">
                Speakers
              </Link>
              <Link href="#schedule" className="text-gray-700 hover:text-blue-600 font-medium">
                Schedule
              </Link>
              <Link href="#register" className="text-gray-700 hover:text-blue-600 font-medium">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header> */}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white shadow-sm border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  ICASNXT-25
                </Link>
              </h1> 
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("schedule")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Schedule
              </button>
              <button
                onClick={() => scrollToSection("register")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Register
              </button>
            </nav>
          </div>
        </div>
      </header>


            {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              International Conference on AI solutions addressing Next Generation Technological Growth<br/>
              <span className="text-blue-700">(ICASNXT-25)</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              This premier conference aims to bring together academicians, researchers and industry experts
              to explore AI solutions addressing Next Generation Technological Growth in all the Technological
              domains driven by Artificial Intelligence such as Data Science and Advanced Computer Networking solutions,
              Machine Manufacturing & operations, Construction technology and Management and so on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center text-gray-700">
                <CalendarDays className="h-5 w-5 mr-2" />
                <span className="font-medium">26th and 27th September 2025</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="font-medium">AIEMS, Bengaluru</span>
              </div>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link href="#register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white pt-40 pb-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About ICASNXT-25</h2>
            <div className="text-lg text-gray-600 max-w-7xl mx-auto space-y-4">
              <p>
                The International Conference on AI Solutions Addressing Next Generation Technological Growth (ICASNXT-25) is a premier global forum scheduled to be
                held on 26th–27th September 2025, aiming to bring together leading academicians, researchers, and industry professionals.
                The event will explore cutting-edge AI-driven solutions that address challenges and opportunities across a broad spectrum of next-generation technological domains.
              </p>
              <p>
                This conference serves as a dynamic platform for presenting novel ideas, research innovations, and real-world AI applications in fields such as Data Science,
                Advanced Networking, Smart Cities, Robotics, Advanced Manufacturing, and Sustainable Technologies. With the rapid evolution of AI and its growing impact across industries,
                ICASNXT-25 is designed to foster interdisciplinary collaboration and knowledge exchange.
              </p>
              <p>
                All submitted papers must be in English, and selected high-quality 
                papers will be published in Springer or Scopus-indexed publications, depending on publisher acceptance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-30 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Registration</h2>
            <p className="text-lg text-gray-600">Secure your spot at ICASNXT-25</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Please fill out all required fields to complete your registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitMessage.message && (
                <div className={`p-4 rounded-md ${
                  submitMessage.type === 'success' 
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
                  <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                {/* File Upload Section */}
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Your Paper (PDF only, max 50KB) *</Label>
                  <Input 
                    id="fileUpload"
                    type="file" 
                    accept=".pdf"
                    required 
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-gray-500">
                    {formData.fileUpload 
                      ? `Selected file: ${formData.fileUpload.name} (${Math.round(formData.fileUpload.size/1024)}KB)`
                      : 'Please upload your research paper in PDF format (max 50KB)'}
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Registration'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 International Conference on AI Solutions (ICASNXT-25). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}