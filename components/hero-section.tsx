"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Next-Gen Tech at Your Fingertips",
      description: "Discover the latest innovations in technology with our premium selection of devices.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Shop Now",
      link: "/products",
    },
    {
      title: "Exclusive Summer Deals",
      description: "Limited time offers on our most popular tech products. Save up to 40% on selected items.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "View Deals",
      link: "/deals",
    },
    {
      title: "Smart Home Revolution",
      description: "Transform your living space with cutting-edge smart home devices and systems.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Explore",
      link: "/categories/smart-home",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-blue-900/30 z-10"></div>
      <div className="container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">{slides[currentSlide].title}</h1>
              <p className="mt-4 text-xl text-blue-100 max-w-md">{slides[currentSlide].description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  <Link href={slides[currentSlide].link}>
                    {slides[currentSlide].cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </motion.div>
            <div className="flex space-x-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Featured product"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-400/30 backdrop-blur-md"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 7,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-500/20 backdrop-blur-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

