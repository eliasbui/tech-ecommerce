"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Check, ChevronRight, CreditCard, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    // Credit Card
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    savePaymentInfo: false,

    // PayPal
    paypalEmail: "",

    // Apple Pay / Google Pay
    // These would typically be handled by their respective SDKs
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, savePaymentInfo: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment successful!",
        description: "Your payment has been processed successfully.",
      })

      // Redirect to confirmation page
      // In a real app, you would use router.push('/confirmation')
    }, 1500)
  }

  // Mock order details
  const orderDetails = {
    subtotal: 1549.98,
    shipping: 9.99,
    tax: 123.99,
    total: 1683.96,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                TechHub
              </span>
            </Link>
          </div>
        </div>
      </header>
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
          <Link href="/shipping" className="hover:text-blue-600">
            Shipping
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Payment</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Payment</h1>
          <p className="text-gray-500">Choose your preferred payment method to complete your purchase.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select a payment method and enter your details</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="credit-card" className="w-full" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.5 8.5H4.5C3.4 8.5 2.5 9.4 2.5 10.5V17.5C2.5 18.6 3.4 19.5 4.5 19.5H19.5C20.6 19.5 21.5 18.6 21.5 17.5V10.5C21.5 9.4 20.6 8.5 19.5 8.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 15.5H7.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.5 11.5H20.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="digital-wallet" className="flex items-center gap-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M22 10H2" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Digital Wallet
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card" className="mt-6">
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
                          <motion.div
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
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
                              <path d="M18 7.5C20.5 7.5 22.5 9.5 22.5 12C22.5 14.5 20.5 16.5 18 16.5" fill="#FF5F00" />
                              <path d="M18 16.5C15.5 16.5 13.5 14.5 13.5 12C13.5 9.5 15.5 7.5 18 7.5" fill="#F79E1B" />
                            </svg>
                            <svg
                              className="h-6 w-auto"
                              viewBox="0 0 36 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="36" height="24" rx="4" fill="#0A2540" />
                              <path
                                d="M15 10.5C15 9.4 14.1 8.5 13 8.5H10V15.5H11.5V13H13C14.1 13 15 12.1 15 11V10.5ZM13 11.5H11.5V10H13V11.5Z"
                                fill="#00A2E5"
                              />
                              <path d="M17.5 8.5H16V15.5H17.5V8.5Z" fill="#00A2E5" />
                              <path
                                d="M23 11.5C23 9.85 21.65 8.5 20 8.5H18V15.5H20C21.65 15.5 23 14.15 23 12.5V11.5ZM20 14H19.5V10H20C20.85 10 21.5 10.65 21.5 11.5V12.5C21.5 13.35 20.85 14 20 14Z"
                                fill="#00A2E5"
                              />
                              <path d="M26 8.5H24.5V15.5H26V8.5Z" fill="#00A2E5" />
                            </svg>
                          </motion.div>
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
                          <div className="relative">
                            <Input
                              id="cardCvc"
                              name="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              required
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path
                                  d="M7 15C7 13.3431 8.34315 12 10 12H14C15.6569 12 17 13.3431 17 15V15C17 15.5523 16.5523 16 16 16H8C7.44772 16 7 15.5523 7 15V15Z"
                                  fill="currentColor"
                                />
                                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                              </svg>
                            </div>
                          </div>
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
                    </form>
                  </TabsContent>

                  <TabsContent value="paypal" className="mt-6">
                    <div className="text-center py-6">
                      <div className="inline-flex justify-center mb-6">
                        <svg
                          className="h-12 w-auto"
                          viewBox="0 0 124 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M46.211 6.749H39.854C39.189 6.749 38.633 7.208 38.53 7.866L35.4 27.201C35.331 27.637 35.669 28.031 36.112 28.031H39.148C39.814 28.031 40.37 27.572 40.474 26.914L41.275 22.316C41.379 21.658 41.935 21.199 42.601 21.199H44.814C49.579 21.199 52.377 18.682 53.068 14.083C53.37 12.117 53.036 10.554 52.007 9.435C50.872 8.187 48.861 6.749 46.211 6.749ZM46.94 14.356C46.564 16.978 44.519 16.978 42.601 16.978H41.395L42.16 12.576C42.225 12.206 42.544 11.94 42.92 11.94H43.426C44.775 11.94 46.058 11.94 46.733 12.712C47.13 13.174 47.223 13.668 46.94 14.356Z"
                            fill="#253B80"
                          />
                          <path
                            d="M68.51 14.242H65.465C65.089 14.242 64.77 14.508 64.705 14.878L64.55 15.834L64.302 15.471C63.54 14.307 61.847 13.909 60.155 13.909C56.051 13.909 52.583 16.978 51.901 21.199C51.552 23.297 52.007 25.324 53.142 26.76C54.184 28.094 55.722 28.697 57.6 28.697C60.9 28.697 62.841 26.76 62.841 26.76L62.686 27.716C62.618 28.152 62.955 28.546 63.398 28.546H66.134C66.8 28.546 67.356 28.087 67.459 27.429L69.222 15.072C69.29 14.636 68.953 14.242 68.51 14.242ZM63.895 21.282C63.54 23.297 61.951 24.627 59.876 24.627C58.838 24.627 58.028 24.316 57.497 23.731C56.975 23.146 56.768 22.316 56.923 21.407C57.252 19.421 58.875 18.062 60.9 18.062C61.909 18.062 62.728 18.373 63.267 18.967C63.815 19.57 64.04 20.4 63.895 21.282Z"
                            fill="#253B80"
                          />
                          <path
                            d="M89.6 14.242H86.546C86.118 14.242 85.715 14.45 85.45 14.795L80.686 21.696L78.664 15.138C78.478 14.574 77.953 14.242 77.37 14.242H74.368C73.873 14.242 73.518 14.74 73.684 15.209L77.494 26.418L73.901 31.54C73.57 32.005 73.901 32.627 74.461 32.627H77.515C77.935 32.627 78.33 32.428 78.595 32.091L90.169 15.329C90.491 14.864 90.16 14.242 89.6 14.242Z"
                            fill="#253B80"
                          />
                          <path
                            d="M103.1 6.749H96.743C96.078 6.749 95.522 7.208 95.419 7.866L92.289 27.201C92.22 27.637 92.558 28.031 93.001 28.031H96.536C96.991 28.031 97.372 27.695 97.441 27.242L98.277 22.316C98.381 21.658 98.937 21.199 99.603 21.199H101.816C106.581 21.199 109.379 18.682 110.07 14.083C110.372 12.117 110.038 10.554 109.009 9.435C107.865 8.187 105.854 6.749 103.1 6.749ZM103.933 14.356C103.557 16.978 101.512 16.978 99.594 16.978H98.388L99.153 12.576C99.218 12.206 99.537 11.94 99.913 11.94H100.419C101.768 11.94 103.051 11.94 103.726 12.712C104.123 13.174 104.216 13.668 103.933 14.356Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M125.5 14.242H122.455C122.079 14.242 121.76 14.508 121.695 14.878L121.54 15.834L121.292 15.471C120.53 14.307 118.837 13.909 117.145 13.909C113.041 13.909 109.573 16.978 108.891 21.199C108.542 23.297 108.997 25.324 110.132 26.76C111.174 28.094 112.712 28.697 114.59 28.697C117.89 28.697 119.831 26.76 119.831 26.76L119.676 27.716C119.608 28.152 119.945 28.546 120.388 28.546H123.124C123.79 28.546 124.346 28.087 124.449 27.429L126.212 15.072C126.28 14.636 125.943 14.242 125.5 14.242ZM120.885 21.282C120.53 23.297 118.941 24.627 116.866 24.627C115.828 24.627 115.018 24.316 114.487 23.731C113.965 23.146 113.758 22.316 113.913 21.407C114.242 19.421 115.865 18.062 117.89 18.062C118.899 18.062 119.718 18.373 120.257 18.967C120.805 19.57 121.03 20.4 120.885 21.282Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M131.5 8.187L128.267 27.201C128.198 27.637 128.536 28.031 128.979 28.031H131.603C132.269 28.031 132.825 27.572 132.928 26.914L136.058 7.579C136.127 7.143 135.789 6.749 135.346 6.749H132.312C131.936 6.749 131.617 7.015 131.552 7.385L131.5 8.187Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M7.266 29.154L7.789 25.832L6.455 25.799H1.126L5.184 0.801C5.201 0.71 5.251 0.628 5.323 0.569C5.395 0.51 5.481 0.48 5.574 0.48H16.656C20.159 0.48 22.561 1.13 23.792 2.417C24.354 3.031 24.704 3.643 24.851 4.333C25.006 5.05 25.007 5.933 24.853 7.027L24.844 7.088V7.743L25.328 8.05C25.781 8.305 26.134 8.607 26.386 8.956C26.768 9.485 26.983 10.148 27.026 10.93C27.069 11.728 26.94 12.655 26.644 13.681C26.308 14.854 25.825 15.835 25.207 16.592C24.634 17.29 23.929 17.855 23.11 18.273C22.319 18.677 21.404 18.976 20.392 19.16C19.408 19.34 18.318 19.43 17.15 19.43H16.4C15.834 19.43 15.28 19.645 14.849 20.034C14.419 20.432 14.142 20.979 14.07 21.572L14.008 21.883L12.98 28.34L12.931 28.576C12.914 28.667 12.895 28.713 12.865 28.743C12.839 28.77 12.796 28.803 12.723 28.803H7.266V29.154Z"
                            fill="#253B80"
                          />
                          <path
                            d="M25.827 7.192C25.805 7.328 25.782 7.467 25.756 7.608C24.582 14.537 20.253 17.362 14.582 17.362H11.74C11.004 17.362 10.39 17.9 10.306 18.628L8.876 27.599L8.421 30.523C8.37 30.836 8.617 31.118 8.935 31.118H12.723C13.363 31.118 13.896 30.652 13.969 30.018L14.024 29.752L15.047 23.323L15.113 22.982C15.186 22.347 15.719 21.881 16.359 21.881H17.109C22.037 21.881 25.787 19.379 26.809 13.381C27.229 10.825 27.011 8.7 25.827 7.192Z"
                            fill="#179BD7"
                          />
                          <path
                            d="M24.49 6.7C24.207 6.63 23.909 6.569 23.599 6.516C23.288 6.464 22.965 6.421 22.63 6.386C21.547 6.28 20.349 6.28 19.059 6.386C18.898 6.401 18.739 6.419 18.582 6.439C17.557 6.564 16.642 6.809 15.858 7.192C15.74 6.042 15.858 5.301 16.359 4.333C16.966 3.161 18.213 2.417 19.953 2.417H24.49C24.825 2.417 25.148 2.46 25.459 2.512C25.769 2.565 26.067 2.626 26.35 2.696C26.633 2.766 26.904 2.847 27.161 2.939C27.418 3.031 27.661 3.134 27.89 3.246C28.119 3.358 28.334 3.48 28.535 3.612C28.334 5.301 27.661 6.516 26.35 7.192C25.827 6.991 25.218 6.826 24.49 6.7Z"
                            fill="#222D65"
                          />
                          <path
                            d="M24.49 6.7C24.207 6.63 23.909 6.569 23.599 6.516C23.288 6.464 22.965 6.421 22.63 6.386C21.547 6.28 20.349 6.28 19.059 6.386C18.898 6.401 18.739 6.419 18.582 6.439C17.557 6.564 16.642 6.809 15.858 7.192C15.74 6.042 15.858 5.301 16.359 4.333C16.966 3.161 18.213 2.417 19.953 2.417H24.49C24.825 2.417 25.148 2.46 25.459 2.512C25.769 2.565 26.067 2.626 26.35 2.696C26.633 2.766 26.904 2.847 27.161 2.939C27.418 3.031 27.661 3.134 27.89 3.246C28.119 3.358 28.334 3.48 28.535 3.612C28.334 5.301 27.661 6.516 26.35 7.192C25.827 6.991 25.218 6.826 24.49 6.7Z"
                            fill="#253B80"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium mb-6">Pay with your PayPal account</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full max-w-md" onClick={handleSubmit}>
                        Continue to PayPal
                      </Button>
                      <p className="text-xs text-gray-500 mt-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="digital-wallet" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M17.5 13.5H6.5C5.4 13.5 4.5 12.6 4.5 11.5V6.5C4.5 5.4 5.4 4.5 6.5 4.5H17.5C18.6 4.5 19.5 5.4 19.5 6.5V11.5C19.5 12.6 18.6 13.5 17.5 13.5Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.5 8.5H19.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <h3 className="font-medium text-lg">Apple Pay</h3>
                          <p className="text-sm text-gray-500 mt-1">Pay securely with Apple Pay</p>
                          <motion.div className="mt-4 w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full bg-black hover:bg-gray-900">Pay with Apple Pay</Button>
                          </motion.div>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center mb-4">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 2L4 6V12C4 15.31 7.58 19.8 12 22C16.42 19.8 20 15.31 20 12V6L12 2Z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12 11C12.83 11 13.5 10.33 13.5 9.5C13.5 8.67 12.83 8 12 8C11.17 8 10.5 8.67 10.5 9.5C10.5 10.33 11.17 11 12 11ZM12 12.5C10.33 12.5 9 13.83 9 15.5V16H15V15.5C15 13.83 13.67 12.5 12 12.5Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <h3 className="font-medium text-lg">Google Pay</h3>
                          <p className="text-sm text-gray-500 mt-1">Pay securely with Google Pay</p>
                          <motion.div className="mt-4 w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Pay with Google Pay</Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8">
                  <motion.div
                    className="p-4 bg-green-50 rounded-lg border border-green-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full mt-1">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Secure Payment</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your payment information is encrypted and secure. We use industry-standard security measures
                          to protect your data.
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Lock className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-700">SSL Encrypted</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-700">PCI Compliant</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-700">Fraud Protection</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/shipping">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shipping
                  </Link>
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
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" /> Complete Payment
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>${orderDetails.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                  <path
                    d="M22.5 18H13.5C12.4 18 11.5 17.1 11.5 16V8C11.5 6.9 12.4 6 13.5 6H22.5C23.6 6 24.5 6.9 24.5 8V16C24.5 17.1 23.6 18 22.5 18Z"
                    fill="#EB001B"
                  />
                  <path
                    d="M13.5 12C13.5 9.5 15.5 7.5 18 7.5C20.5 7.5 22.5 9.5 22.5 12C22.5 14.5 20.5 16.5 18 16.5C15.5 16.5 13.5 14.5 13.5 12Z"
                    fill="#F79E1B"
                  />
                  <path d="M18 7.5C20.5 7.5 22.5 9.5 22.5 12C22.5 14.5 20.5 16.5 18 16.5" fill="#FF5F00" />
                  <path d="M18 16.5C15.5 16.5 13.5 14.5 13.5 12C13.5 9.5 15.5 7.5 18 7.5" fill="#F79E1B" />
                </svg>
                <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="24" rx="4" fill="#0A2540" />
                  <path
                    d="M15 10.5C15 9.4 14.1 8.5 13 8.5H10V15.5H11.5V13H13C14.1 13 15 12.1 15 11V10.5ZM13 11.5H11.5V10H13V11.5Z"
                    fill="#00A2E5"
                  />
                  <path d="M17.5 8.5H16V15.5H17.5V8.5Z" fill="#00A2E5" />
                  <path
                    d="M23 11.5C23 9.85 21.65 8.5 20 8.5H18V15.5H20C21.65 15.5 23 14.15 23 12.5V11.5ZM20 14H19.5V10H20C20.85 10 21.5 10.65 21.5 11.5V12.5C21.5 13.35 20.85 14 20 14Z"
                    fill="#00A2E5"
                  />
                  <path d="M26 8.5H24.5V15.5H26V8.5Z" fill="#00A2E5" />
                </svg>
                <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                  <path
                    d="M18 7C14.13 7 11 10.13 11 14C11 17.87 14.13 21 18 21C21.87 21 25 17.87 25 14C25 10.13 21.87 7 18 7ZM21.5 14.5H18.5V17.5H17.5V14.5H14.5V13.5H17.5V10.5H18.5V13.5H21.5V14.5Z"
                    fill="#5F6368"
                  />
                </svg>
                <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="24" rx="4" fill="#F7F7F7" />
                  <path
                    d="M18 7C14.13 7 11 10.13 11 14C11 17.87 14.13 21 18 21C21.87 21 25 17.87 25 14C25 10.13 21.87 7 18 7ZM18 19.5C14.97 19.5 12.5 17.03 12.5 14C12.5 10.97 14.97 8.5 18 8.5C21.03 8.5 23.5 10.97 23.5 14C23.5 17.03 21.03 19.5 18 19.5Z"
                    fill="black"
                  />
                  <path d="M17.25 16.75H18.75V18.25H17.25V16.75Z" fill="black" />
                  <path d="M17.25 9.75H18.75V15.25H17.25V9.75Z" fill="black" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

