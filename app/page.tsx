"use client"
import { Button } from "@/components/ui/button";
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
  "Adversarial machine learning",
  "Robust AI models for critical systems",
  "Secure deep learning architectures",
  "Privacy-preserving AI",
  "AI security in cyber-physical systems",
  "Analog & Mixed Signal and, RF Circuits",
  "VLSI for Automotive Circuits and Systems",
  "Low Power Digital Systems",
  "Hardware & Systems Security",
  "Wireless Systems, 5G & beyond",
  "Quantum Computing & Communications",
  "Blockchain-enabled secure systems",
  "Secure IoT and embedded systems",
  "Cybersecurity in intelligent networks",
  "Secure communication protocols",
  "AI-driven intrusion detection systems",
  "Renewable Energy & Power Electronics",
  "Nanoelectronics & Nanotechnology",
  "Biomedical Electronics Technologies",
  "Satellite Communication",
  "5G/6G secure computational frameworks",
  "Numerical methods and optimization techniques",
  "Intelligent optimization algorithms",
  "Data-driven modeling of dynamic systems",
  "High-performance computing for AI applications",
  "AI for environmental monitoring",
  "Computational intelligence in material science",
  "Secure smart city infrastructures",
  "AI-driven sustainable engineering systems"
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
      if (file.size > 50 * 1024 * 1024) {
        setSubmitMessage({
          type: 'error',
          message: 'File size must be 50MB or less'
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
                  ICACSEA-26
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
              International Conference on AI-Driven Computational Systems and Engineering Applications
              <br />
              <span className="text-blue-500">(ICACSEA 2026)</span>
            </h1>
            <p className="text-xl text-blue-50 mb-8 max-w-5xl mx-auto drop-shadow-md">
              This leading conference seeks to unite academics, researchers, and industry professionals to advance
              AI-driven solutions for next-generation technological progress across diverse domains, including Data
              Science, Advanced Computer Networking, Machine Manufacturing, Operations, Construction Technology, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <CalendarDays className="h-5 w-5 mr-2" />
                <span className="font-medium">29<sup className="lowercase">th</sup> and 30<sup className="lowercase">th</sup> May 2026</span>
              </div>
              <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 mr-2" />
                <a href="https://maps.app.goo.gl/bQ4wM83wGDgEpJKz5" target="blank">
                  <span className="font-medium">AIEMS, Bidadi, Bengaluru</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link href="#register" >
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
              } */}
              {isEnabled ? (
                <Link href="#">
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
                  <h3 className="text-xl font-semibold text-gray-900">Paper Abstract Submission Deadline</h3>
                  <p className="text-gray-600 mt-1">Submit your abstract paper</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">15<sup className="lowercase">th</sup> April 2026</p>
                  <p className="text-sm text-gray-500">11:59 PM IST</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Full Paper Submission Deadline</h3>
                  <p className="text-gray-600 mt-1">Submit your complete research paper</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">30<sup className="lowercase">th</sup> April 2026</p>
                  <p className="text-sm text-gray-500">Via Email</p>
                </div>
              </div>

              {/* Row 3
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
              </div> */}

              {/* Row 4 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Notification of Paper Acceptance</h3>
                  <p className="text-gray-600 mt-1">Authors will receive confirmation on whether their paper is accepted.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">10<sup className="lowercase">th</sup> May 2026</p>
                  <p className="text-sm text-gray-500">10:59 PM IST</p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Camera Ready Paper & Registration</h3>
                  <p className="text-gray-600 mt-1">Submit the final version of your paper and complete registration with payment.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">15<sup className="lowercase">th</sup> May 2026</p>
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
                  <p className="text-2xl font-bold text-blue-600">29<sup className="lowercase">th</sup> - 30<sup className="lowercase">th</sup> May 2026</p>
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
      
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div>
              <h3 className="text-xl font-bold mb-4">ICACSEA-26</h3>
              <p className="text-gray-400">International Conference on AI-Driven Computational Systems and Engineering Applications</p>
              <br/>
              <p className="text-gray-400">Email: <Link href="mailto:icacsea2026@gmail.com">icacsea2026@gmail.com </Link></p>
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
                Prof. Shreyas Shivananjappa<br />
                Professor & HoD, AI & ML Dept<br />
                ICACSEA-26 Convenors<br />
                Amruta Institute of Engineering and Management Sciences<br />
                Bangalore, Karnataka, India<br />
                {/* Email: <Link href="mailto:dr.kumarbid@aiems.edu.in">dr.kumarbid@aiems.edu.in</Link><br />
                Phone: +91 78924 38079 */}
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 ICACSEA-26. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}