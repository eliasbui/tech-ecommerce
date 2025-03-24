"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Github, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sign in successful",
        description: "Welcome back to TechHub!",
      })
      setIsLoading(false)
      // Redirect would happen here
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block relative w-1/2 bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold mb-6">Welcome to TechHub</h1>
            <p className="text-xl mb-8 max-w-md text-blue-100">
              Your one-stop destination for the latest and greatest tech products.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Wide Selection</h3>
                <p className="text-blue-100 text-sm">Explore thousands of products from top brands</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Fast Delivery</h3>
                <p className="text-blue-100 text-sm">Get your products delivered quickly to your doorstep</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Secure Payments</h3>
                <p className="text-blue-100 text-sm">Shop with confidence with our secure payment options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">24/7 Support</h3>
                <p className="text-blue-100 text-sm">Our customer support team is always ready to help</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/" className="text-blue-100 hover:text-white text-sm flex items-center">
              &larr; Back to home
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                TechHub
              </span>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign in to your account</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="Google logo"
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center space-y-2">
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                  Sign up
                </Link>
              </div>
              <div className="text-center text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-blue-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-blue-600">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

