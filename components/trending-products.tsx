"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"

export default function TrendingProducts() {
  const products = [
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Laptops",
      rating: 4.8,
      reviewCount: 124,
      badge: "New",
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.7,
      reviewCount: 89,
      badge: "Bestseller",
    },
    {
      id: "3",
      name: "Smart 4K Ultra HD TV",
      price: 799.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "TVs",
      rating: 4.5,
      reviewCount: 56,
      badge: "Sale",
    },
    {
      id: "4",
      name: "Premium Smartphone X",
      price: 999.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smartphones",
      rating: 4.9,
      reviewCount: 203,
      badge: "Featured",
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
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Trending Products</h2>
            <p className="text-gray-500 mt-2">Our most popular products based on sales</p>
          </div>
          <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mr-4">
            <Link href="/products">
              View all products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

