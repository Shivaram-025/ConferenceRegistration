"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, CreditCard, FileText, QrCode, Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface FormData {
  fullName: string
  phone: string
  paperFile: FileList
  paymentFile: FileList
}

export default function PaperSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [dynamicQrCode, setDynamicQrCode] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("fullName", data.fullName)
      formData.append("phone", data.phone)
      formData.append("paperFile", data.paperFile[0])
      formData.append("paymentFile", data.paymentFile[0])

      const response = await fetch("/api/submit-paper", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setQrCodeUrl(result.qrCode)
        setIsSubmitted(true)
        toast({
          title: "Success!",
          description: "Paper submitted successfully. Data exported to Excel.",
        })
        reset()
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit paper. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatePersonalizedQR = async (name: string, phone: string) => {
    try {
      const response = await fetch("/api/generate-payment-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, amount: 50 }),
      })

      if (response.ok) {
        const result = await response.json()
        setDynamicQrCode(result.qrCode)
      }
    } catch (error) {
      console.error("Failed to generate personalized QR:", error)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">Submission Successful!</CardTitle>
            <CardDescription>Your paper has been submitted and data has been exported to Excel.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {qrCodeUrl && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Payment Confirmation QR Code:</Label>
                <div className="mt-2 p-6 border rounded-lg bg-white shadow-sm">
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="Payment Confirmation QR Code"
                    className="mx-auto w-40 h-40"
                  />
                  <p className="text-xs text-center text-gray-500 mt-2">Save this QR code for your records</p>
                </div>
              </div>
            )}
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Paper
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Paper Submission</CardTitle>
          <CardDescription className="text-center">
            Submit your research paper with payment confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
                placeholder="Enter your full name"
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[\d\s\-$$$$]{10,}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                placeholder="Enter your phone number"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          
            {/* Paper PDF Upload */}
            <div className="space-y-2">
              <Label htmlFor="paperFile">Upload Paper (PDF) *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <Input
                  id="paperFile"
                  type="file"
                  accept=".pdf"
                  {...register("paperFile", {
                    required: "Paper PDF is required",
                    validate: {
                      fileType: (files) => {
                        if (files[0] && !files[0].type.includes("pdf")) {
                          return "Only PDF files are allowed"
                        }
                        return true
                      },
                    },
                  })}
                  className="hidden"
                />
                <Label htmlFor="paperFile" className="cursor-pointer">
                  <Upload className="w-5 h-5 inline mr-2" />
                  Click to upload PDF file
                </Label>
              </div>
              {errors.paperFile && <p className="text-sm text-red-500">{errors.paperFile.message}</p>}
            </div>    

            {/* Payment Instructions with QR Code */}
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                <Label className="text-lg font-semibold text-blue-800">Payment Instructions</Label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">
                    <strong>Scan QR Code to Pay:</strong>
                  </p>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Submission Fee: $50</li>
                    <li>• UPI ID: papers@university.edu</li>
                    <li>• Account: 9876543210</li>
                    <li>• IFSC: BANK0001234</li>
                  </ul>
                  <p className="text-xs text-blue-500 mt-2">After payment, upload the screenshot/receipt below</p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <img
                      src={dynamicQrCode || "/payment.png"}
                      alt="Payment QR Code - Scan to pay $50 submission fee"
                      className="w-32 h-32 mx-auto"
                    />
                    <p className="text-xs text-center text-gray-600 mt-2">
                      {dynamicQrCode ? "Personalized QR Code" : "Scan to Pay"}
                    </p>
                    {!dynamicQrCode && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 text-xs bg-transparent"
                        onClick={() => {
                          const name = (document.getElementById("fullName") as HTMLInputElement)?.value
                          const phone = (document.getElementById("phone") as HTMLInputElement)?.value
                          if (name && phone) {
                            generatePersonalizedQR(name, phone)
                          } else {
                            toast({
                              title: "Please fill name and phone first",
                              description: "Enter your details to generate a personalized QR code",
                            })
                          }
                        }}
                      >
                        Generate Personal QR
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            

            {/* Payment File Upload */}
            <div className="space-y-2">
              <Label htmlFor="paymentFile">Upload Payment Proof *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <Input
                  id="paymentFile"
                  type="file"
                  accept="image/*,.pdf"
                  {...register("paymentFile", {
                    required: "Payment proof is required",
                  })}
                  className="hidden"
                />
                <Label htmlFor="paymentFile" className="cursor-pointer">
                  <Upload className="w-5 h-5 inline mr-2" />
                  Click to upload payment proof
                </Label>
              </div>
              {errors.paymentFile && <p className="text-sm text-red-500">{errors.paymentFile.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Paper"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
