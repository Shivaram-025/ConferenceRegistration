"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Globe, Hash, User } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'


interface FormData {
  firstName: string,
  lastName: string,
  idNumber: string,
  fileUpload: File | null,
}

interface SubmitMessage {
  type: 'success' | 'error' | '';
  message: string;
}

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '', 
    idNumber: '',
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
    if (!formData.firstName || !formData.lastName || !formData.idNumber || !formData.fileUpload) {
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
      formDataToSend.append('idNumber', formData.idNumber);
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
          idNumber: '',
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
                  ICAINXT-26
                </Link>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("https://conference-registration-omega.vercel.app/")}
        
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
                // onClick={() => scrollToSection("schedule")}
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
                    <div className="space-y-2">
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
                    </div>
                  </div>

                  <Separator />

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
                        : 'Aknowledgemnt in PDF format (max 50KB)'}
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
  )
}
