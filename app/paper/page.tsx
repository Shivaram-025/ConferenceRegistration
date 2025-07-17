"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  organization: string;
  branch: string;
  theme: string;
  email: string;
  phone: string;
  fileUpload: File | null;
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

export default function ConferenceRegistration() {
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
    if (!formData.firstName || !formData.lastName || !formData.organization || !formData.branch || !formData.theme || !formData.email || !formData.phone || !formData.fileUpload) {
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
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('theme', formData.theme);
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
          message: 'Registration successful!\nShortlisted abstracts will receive an email regarding paper submission soon'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white shadow-sm border-b"
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
                  ICAINXT-26
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
              {/* <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </button> */}
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
                Submission
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Paper Submission Section */}
      <section id="paper-submission" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Paper Submission</h2>
            <p className="text-lg text-gray-600">Submit your full paper at ICAINXT-26</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Paper Submission Form</CardTitle>
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
                                onValueChange={(value) => setFormData({...formData, theme: value})}
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
                </div>

                {/* File Upload Section */}
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Your Full Paper *</Label>
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
                      : 'Abstract paper in PDF format (max 50KB)'}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ICAINXT-26</h3>
              <p className="text-gray-400">International Conference on AI solutions addressing Next Generation Technological Growth</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="https://international-conference-git-master-simonleo28s-projects.vercel.app/#home" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="https://international-conference-git-master-simonleo28s-projects.vercel.app/#about-college" className="text-gray-400 hover:text-white">About College</Link></li>
                <li><Link href="https://international-conference-git-master-simonleo28s-projects.vercel.app/#about-conference" className="text-gray-400 hover:text-white">About Conference</Link></li>
                <li><Link href="#speakers" className="text-gray-400 hover:text-white">Speakers</Link></li>
                <li><a href="#register" className="text-gray-400 hover:text-white">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                Dr. Kumar B I D<br />
                Professor & HoD, ISE Dept<br />
                Amruta Institute of Engineering and Management Sciences<br />
                Bangalore, Karnataka, India<br />
                Email: dr.kumarbid@aiems.edu.in<br />
                Phone: +91 78924 38079
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 ICAINXT-26. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}