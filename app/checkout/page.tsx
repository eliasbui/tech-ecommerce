"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Edit,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",

    // Shipping Information
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment Information
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    savePaymentInfo: false,

    // Shipping Method
    shippingMethod: "standard",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, savePaymentInfo: checked }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, shippingMethod: value }))
  }

  const nextStep = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep((prev) => prev + 1)

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 800)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      })

      // Redirect to confirmation page
      // In a real app, you would use router.push('/confirmation')
    }, 1500)
  }

  // Mock cart items
  const cartItems = [
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingCost =
    formData.shippingMethod === "standard" ? 9.99 : formData.shippingMethod === "express" ? 19.99 : 29.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  // Progress bar steps
  const steps = [
    { id: 1, name: "Information", icon: <User className="h-4 w-4" /> },
    { id: 2, name: "Shipping", icon: <Truck className="h-4 w-4" /> },
    { id: 3, name: "Payment", icon: <CreditCard className="h-4 w-4" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {/* Progress Bar */}
          <div className="relative">
            <div className="overflow-hidden h-2 mb-6 flex rounded bg-gray-200">
              <motion.div
                className="bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between">
              {steps.map((s) => (
                <div key={s.id} className="relative flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                    animate={{
                      backgroundColor: step >= s.id ? "#2563eb" : "#e5e7eb",
                      color: step >= s.id ? "#ffffff" : "#6b7280",
                      scale: step === s.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step > s.id ? <Check className="h-5 w-5" /> : s.icon}
                  </motion.div>
                  <div className="text-xs mt-2 font-medium text-center">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Enter your contact details for order updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="(123) 456-7890"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                      <CardDescription>Enter your shipping address for delivery</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            name="address"
                            placeholder="123 Main St"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apartment">Apartment, Suite, etc. (optional)</Label>
                          <Input
                            id="apartment"
                            name="apartment"
                            placeholder="Apt 4B"
                            value={formData.apartment}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="San Francisco"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="California"
                              value={formData.state}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              placeholder="94105"
                              value={formData.zipCode}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href="/cart">
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                        </Link>
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={nextStep} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to Shipping <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Method</CardTitle>
                      <CardDescription>Choose how you want your order delivered</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        defaultValue="standard"
                        value={formData.shippingMethod}
                        onValueChange={handleRadioChange}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <motion.div
                            className="absolute inset-0 rounded-md"
                            animate={{
                              backgroundColor:
                                formData.shippingMethod === "standard" ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)",
                              borderColor:
                                formData.shippingMethod === "standard" ? "rgba(59, 130, 246, 0.5)" : "rgba(0, 0, 0, 0)",
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ border: "1px solid" }}
                          />
                          <div className="relative flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label
                              htmlFor="standard"
                              className="flex flex-1 cursor-pointer items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <Truck className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Standard Shipping</p>
                                  <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                                </div>
                              </div>
                              <div className="font-medium">$9.99</div>
                            </Label>
                          </div>
                        </div>

                        <div className="relative">
                          <motion.div
                            className="absolute inset-0 rounded-md"
                            animate={{
                              backgroundColor:
                                formData.shippingMethod === "express" ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)",
                              borderColor:
                                formData.shippingMethod === "express" ? "rgba(59, 130, 246, 0.5)" : "rgba(0, 0, 0, 0)",
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ border: "1px solid" }}
                          />
                          <div className="relative flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="express" id="express" />
                            <Label
                              htmlFor="express"
                              className="flex flex-1 cursor-pointer items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-blue-600"
                                  >
                                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                                    <polygon points="12 15 17 21 7 21 12 15" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium">Express Shipping</p>
                                  <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                                </div>
                              </div>
                              <div className="font-medium">$19.99</div>
                            </Label>
                          </div>
                        </div>

                        <div className="relative">
                          <motion.div
                            className="absolute inset-0 rounded-md"
                            animate={{
                              backgroundColor:
                                formData.shippingMethod === "sameDay" ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)",
                              borderColor:
                                formData.shippingMethod === "sameDay" ? "rgba(59, 130, 246, 0.5)" : "rgba(0, 0, 0, 0)",
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ border: "1px solid" }}
                          />
                          <div className="relative flex items-center space-x-2 rounded-md border p-4">
                            <RadioGroupItem value="sameDay" id="sameDay" />
                            <Label
                              htmlFor="sameDay"
                              className="flex flex-1 cursor-pointer items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-blue-600"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium">Same-Day Delivery</p>
                                  <p className="text-sm text-gray-500">Delivery today (order before 2 PM)</p>
                                </div>
                              </div>
                              <div className="font-medium">$29.99</div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-full mt-1">
                            <MapPin className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Shipping to:</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              {formData.firstName} {formData.lastName}
                              <br />
                              {formData.address} {formData.apartment && `, ${formData.apartment}`}
                              <br />
                              {formData.city}, {formData.state} {formData.zipCode}
                              <br />
                              {formData.country}
                            </p>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-blue-600 text-sm"
                              onClick={() => setStep(1)}
                            >
                              <Edit className="h-3 w-3 mr-1" /> Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Information
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={nextStep} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Enter your payment details to complete your purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                              <svg
                                className="h-6 w-auto"
                                viewBox="0 0 36 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect width="36" height="24" rx="4" fill="#016FD0" />
                                <path d="M18.5 15.5H17.5V10.5H18.5V15.5Z" fill="white" />
                                <path
                                  d="M24 10.5H21.5C21 10.5 20.5 11 20.5 11.5V15.5H21.5V14H24V15.5H25V11.5C25 11 24.5 10.5 24 10.5ZM24 13H21.5V11.5H24V13Z"
                                  fill="white"
                                />
                                <path
                                  d="M17 14L17.5 10.5H16L15 14V10.5H14L12.5 13.5L11 10.5H10V15.5H11V12L12.5 15.5H13.5L15 12V15.5H17V15C16.5 15 16 14.5 16 14C16 13.5 16.5 13 17 13V14Z"
                                  fill="white"
                                />
                              </svg>
                              <svg
                                className="h-6 w-auto"
                                viewBox="0 0 36 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                                <path
                                  d="M22.5 18H13.5C12.4 18 11.5 17.1 11.5 16V8C11.5 6.9 12.4 6 13.5 6H22.5C23.6 6 24.5 6.9 24.5 8V16C24.5 17.1 23.6 18 22.5 18Z"
                                  fill="#EB001B"
                                />
                                <path
                                  d="M13.5 12C13.5 9.5 15.5 7.5 18 7.5C20.5 7.5 22.5 9.5 22.5 12C22.5 14.5 20.5 16.5 18 16.5C15.5 16.5 13.5 14.5 13.5 12Z"
                                  fill="#F79E1B"
                                />
                                <path
                                  d="M18 7.5C20.5 7.5 22.5 9.5 22.5 12C22.5 14.5 20.5 16.5 18 16.5"
                                  fill="#FF5F00"
                                />
                                <path
                                  d="M18 16.5C15.5 16.5 13.5 14.5 13.5 12C13.5 9.5 15.5 7.5 18 7.5"
                                  fill="#F79E1B"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiration Date (MM/YY)</Label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input
                              id="cardCvc"
                              name="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox
                            id="savePaymentInfo"
                            checked={formData.savePaymentInfo}
                            onCheckedChange={handleCheckboxChange}
                          />
                          <Label htmlFor="savePaymentInfo">Save this card for future purchases</Label>
                        </div>

                        <div className="mt-6 p-4 bg-green-50 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-full mt-1">
                              <ShieldCheck className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-green-800">Secure Checkout</h4>
                              <p className="text-sm text-green-700 mt-1">
                                Your payment information is encrypted and secure. We never store your full card details.
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" /> Complete Order
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 rounded-md border bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Checkout</h4>
                    <p className="text-xs text-gray-500 mt-1">Your payment information is encrypted and secure</p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-600"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Satisfaction Guaranteed</h4>
                    <p className="text-xs text-gray-500 mt-1">30-day money-back guarantee</p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-600"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Privacy Protected</h4>
                    <p className="text-xs text-gray-500 mt-1">Your data is never shared with third parties</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

