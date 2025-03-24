"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock product data
  const product = {
    id: params.id,
    name: "Ultra Slim Laptop Pro",
    price: 1299.99,
    description:
      "Experience unparalleled performance with the Ultra Slim Laptop Pro. Featuring a stunning 14-inch Retina display, powerful processor, and all-day battery life, this laptop is perfect for professionals and creatives alike.",
    features: [
      "14-inch Retina display with True Tone technology",
      "10-core CPU delivers up to 3.5x faster performance",
      "32-core GPU with up to 5x faster graphics",
      "16GB unified memory for smooth multitasking",
      "512GB SSD storage",
      "Up to 17 hours of battery life",
      "1080p FaceTime HD camera with advanced image signal processor",
      "Studio-quality three-microphone array",
    ],
    specs: {
      processor: "10-core CPU",
      memory: "16GB unified memory",
      storage: "512GB SSD",
      graphics: "32-core GPU",
      display: "14-inch Retina display",
      battery: "Up to 17 hours",
      weight: "3.0 pounds (1.4 kg)",
      dimensions: "12.31 x 8.71 x 0.61 inches",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviewCount: 124,
    category: "Laptops",
    inStock: true,
    relatedProducts: [
      {
        id: "2",
        name: "Wireless Noise-Cancelling Headphones",
        price: 249.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Audio",
        rating: 4.7,
      },
      {
        id: "5",
        name: "Wireless Gaming Mouse",
        price: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Accessories",
        rating: 4.6,
      },
      {
        id: "8",
        name: "Fitness Smartwatch",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Wearables",
        rating: 4.7,
      },
    ],
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    })
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
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:text-blue-600 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
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
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
            </motion.div>
            <div className="flex gap-4 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    selectedImage === index ? "ring-2 ring-blue-600" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
            <p className="text-gray-600">{product.description}</p>
            <div className="space-y-4">
              <h3 className="font-medium">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-4 pt-4 border-t">
              <div className="flex items-center">
                <span className="font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={handleToggleFavorite}>
                  <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Added to Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="w-fit" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share Product
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none py-3"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="space-y-4">
                <p>
                  The Ultra Slim Laptop Pro is designed for professionals who demand the best in performance and
                  portability. With its sleek design and powerful components, this laptop delivers exceptional
                  performance for creative work, programming, and everyday tasks.
                </p>
                <p>
                  The stunning 14-inch Retina display features True Tone technology that automatically adjusts the white
                  balance to match the color temperature of the light around you, providing a more natural viewing
                  experience. The 10-core CPU and 32-core GPU work together to deliver incredible performance for
                  demanding tasks like video editing, 3D rendering, and machine learning.
                </p>
                <p>
                  With up to 17 hours of battery life, you can work all day without needing to recharge. The laptop also
                  features a 1080p FaceTime HD camera with an advanced image signal processor for clearer, sharper video
                  calls, and a studio-quality three-microphone array that captures your voice clearly even in noisy
                  environments.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium capitalize">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{product.rating} out of 5</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Write a Review</Button>
                </div>
                <div className="space-y-4">
                  {/* Sample reviews */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Amazing laptop for professionals</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">John D. - 2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">
                        I've been using this laptop for two weeks now and I'm extremely impressed with its performance.
                        The display is stunning and the battery life is exceptional. It handles all my design work
                        without any lag or issues. Highly recommended for creative professionals!
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Great performance, but runs hot</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">Sarah M. - 1 month ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">
                        The performance of this laptop is excellent, and the display is beautiful. However, it does tend
                        to run hot during intensive tasks like video editing. The battery life is good but not quite the
                        17 hours advertised. Overall, I'm satisfied with my purchase.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="block">
                <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-1">{relatedProduct.category}</div>
                      <h3 className="font-medium text-lg">{relatedProduct.name}</h3>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(relatedProduct.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 font-bold text-xl">${relatedProduct.price.toFixed(2)}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

