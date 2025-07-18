"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Calendar, CalendarDays, FileText, MapPin, Users } from "lucide-react";
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
  const [isEnabled , setIsEnabled] = useState(false);

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

  useEffect(() => {
  const today = new Date();
  const enableDate = new Date("2025-08-30T00:00:00");

  if (today >= enableDate) {
    setIsEnabled(true);
  }
}, []);

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
              <h1 className="text-2xl font-bold text-gray-900">
                <Link
                  href="https://icainxt.live/"
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


      {/* Hero Section */}
      <section
          id="home"
          className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20 pt-36 min-h-screen flex items-center"
          style={{
            backgroundImage: `url('/aiems-image.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-gray-900/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              International Conference on AI Innovation for Next Generation Technologies
              <br />
              <span className="text-blue-500">(ICAINXT-26)</span>
            </h1>
            <p className="text-xl text-blue-50 mb-8 max-w-5xl mx-auto drop-shadow-md">
              This leading conference seeks to unite academics, researchers, and industry professionals to advance
              AI-driven solutions for next-generation technological progress across diverse domains, including Data
              Science, Advanced Computer Networking, Machine Manufacturing, Operations, Construction Technology, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CalendarDays className="h-5 w-5 mr-2" />
                <span className="font-medium">09th and 10th January 2026</span>
              </div>
              <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 mr-2" />
                <a href="https://maps.app.goo.gl/bQ4wM83wGDgEpJKz5" target="blank">
                  <span className="font-medium">AIEMS, Bengaluru</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#register" >
                <Button size="lg" onClick={() => scrollToSection("register")} className="bg-blue-600 p-4 hover:bg-gray-200 text-white px-8 hover:text-blue-600 py-3 shadow-lg">
                  Submit Abstract
                </Button>
              </Link>
              {isEnabled ? (
                <Link href="/paper">
                <Button size="lg" className="border border-blue-600 hover:bg-blue-900 text-white px-8 py-3 shadow-lg">
                  Submit Paper
                </Button>
              </Link>
              ) : (
                <Button disabled={true} size="lg" className="border border-blue-600 hover:bg-blue-900 text-white px-8 py-3 shadow-lg">Submit Paper</Button>
              )
              }
              {isEnabled ? (
                <Link href="/registration">
                <Button size="lg" className="border border-blue-600 hover:bg-blue-900 text-white px-8 py-3 shadow-lg">
                  Registration
                </Button>
              </Link>
              ) : (
                <Button disabled={true} size="lg" className="border border-blue-600 hover:bg-blue-900 text-white px-8 py-3 shadow-lg">Registration</Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mark your calendar with these key deadlines and dates for ICAINXT-26
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0"> 
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Abstract Submission Deadline</h3>
                  <p className="text-gray-600 mt-1">Submit your research abstracts for review</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">15th August 2025</p>
                  <p className="text-sm text-gray-500">11:59 PM IST</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Notification of Abstract Acceptance</h3>
                  <p className="text-gray-600 mt-1">Authors will be notified about abstract acceptance</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">30th August 2025</p>
                  <p className="text-sm text-gray-500">Via Email</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Submission of Full Paper Deadline</h3>
                  <p className="text-gray-600 mt-1">Submit complete research papers for publication</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">30th September 2025</p>
                  <p className="text-sm text-gray-500">11:59 PM IST</p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Notification of Paper Acceptance</h3>
                  <p className="text-gray-600 mt-1">Selected paper will be notified</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">30th October 2025</p>
                  <p className="text-sm text-gray-500">10:59 PM IST</p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Registration Deadline</h3>
                  <p className="text-gray-600 mt-1">Do payment and registration for the conference</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">15th November 2025</p>
                  <p className="text-sm text-gray-500">10:59 PM IST</p>
                </div>
              </div>

              {/* Row 6 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Conference Dates</h3>
                  <p className="text-gray-600 mt-1">Join us for two days of cutting-edge AI research and networking</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">09th - 10th January 2026</p>
                  <p className="text-sm text-gray-500">AIEMS, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      {/* <section id="about" className="py-20 bg-white pt-40 pb-60">
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
      </section> */}

      {/* Abstract submission Section */}
      <section id="register" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conference Registration</h2>
            <p className="text-lg text-gray-600">Secure your spot at ICAINXT-26</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Abstract Form</CardTitle>
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
                  <Label htmlFor="fileUpload">Upload Your Abstract *</Label>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div>
              <h3 className="text-xl font-bold mb-4">ICAINXT-26</h3>
              <p className="text-gray-400">International Conference on AI Innovation for Next Generation Technologies</p>
              <br/>
              <p className="text-gray-400">Email: <Link href="mailto:icainxt@aiems.edu.in">icainxt@aiems.edu.in</Link></p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="https://icainxt.live/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="https://icainxt.live/#about-college" className="text-gray-400 hover:text-white">About College</Link></li>
                <li><Link href="https://icainxt.live/#about-conference" className="text-gray-400 hover:text-white">About Conference</Link></li>
                <li><Link href="#speakers" className="text-gray-400 hover:text-white">Speakers</Link></li>
                <li><a href="#register" className="text-gray-400 hover:text-white">Register</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                Dr. Kumar B I D<br />
                Professor & HoD, ISE Dept<br />
                ICAINXT-26 Organizing Chair<br />
                Amruta Institute of Engineering and Management Sciences<br />
                Bangalore, Karnataka, India<br />
                Email: <Link href="mailto:dr.kumarbid@aiems.edu.in">dr.kumarbid@aiems.edu.in</Link><br />
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