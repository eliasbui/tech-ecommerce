"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-blue-50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
              Subscribe to our newsletter to receive updates on new products, special offers, and tech tips.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                  >
                    <Send className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

