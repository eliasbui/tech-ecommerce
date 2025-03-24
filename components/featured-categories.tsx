"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Laptops & Computers",
      image: "/placeholder.svg?height=200&width=200",
      link: "/categories/laptops",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Smartphones & Accessories",
      image: "/placeholder.svg?height=200&width=200",
      link: "/categories/smartphones",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Smart Home",
      image: "/placeholder.svg?height=200&width=200",
      link: "/categories/smart-home",
      color: "from-blue-700 to-blue-900",
    },
    {
      name: "Audio & Headphones",
      image: "/placeholder.svg?height=200&width=200",
      link: "/categories/audio",
      color: "from-blue-800 to-blue-950",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Explore our wide range of tech products across popular categories.
            </p>
          </div>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {categories.map((category, index) => (
            <motion.div key={category.name} variants={item}>
              <Link href={category.link} className="block h-full">
                <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className={`relative h-40 bg-gradient-to-r ${category.color}`}>
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-contain p-4 mix-blend-overlay"
                      />
                    </div>
                    <div className="p-6 flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <ChevronRight className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

