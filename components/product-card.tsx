"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviewCount: number
  badge?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card
          className="overflow-hidden h-full border-transparent hover:border-blue-200 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-square bg-gray-100">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
              {product.badge && (
                <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">{product.badge}</Badge>
              )}
              <Button
                size="icon"
                variant="ghost"
                className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm ${
                  isFavorite ? "text-red-500" : "text-gray-500"
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                <span className="sr-only">Add to favorites</span>
              </Button>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </motion.div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-medium text-lg line-clamp-2 min-h-[56px]">{product.name}</h3>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
              </div>
              <div className="mt-3 font-bold text-xl">${product.price.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

