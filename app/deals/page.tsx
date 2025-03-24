"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Filter, Flame, Percent, ShoppingCart, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45,
  })

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              hours = 23
              if (days > 0) {
                days -= 1
              } else {
                // Reset timer when it reaches zero
                days = 2
                hours = 14
                minutes = 36
                seconds = 45
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  // Mock deals data
  const flashDeals = [
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      originalPrice: 1499.99,
      salePrice: 1199.99,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "Laptops",
      rating: 4.8,
      reviewCount: 124,
      badge: "Flash Sale",
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      originalPrice: 349.99,
      salePrice: 249.99,
      discount: 28,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.7,
      reviewCount: 89,
      badge: "Flash Sale",
    },
    {
      id: "3",
      name: "Smart 4K Ultra HD TV",
      originalPrice: 999.99,
      salePrice: 799.99,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "TVs",
      rating: 4.5,
      reviewCount: 56,
      badge: "Flash Sale",
    },
    {
      id: "4",
      name: "Premium Smartphone X",
      originalPrice: 1299.99,
      salePrice: 999.99,
      discount: 23,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smartphones",
      rating: 4.9,
      reviewCount: 203,
      badge: "Flash Sale",
    },
  ]

  const weeklyDeals = [
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      originalPrice: 99.99,
      salePrice: 79.99,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.6,
      reviewCount: 78,
      badge: "Weekly Deal",
    },
    {
      id: "6",
      name: "Smart Home Security Camera",
      originalPrice: 199.99,
      salePrice: 149.99,
      discount: 25,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smart Home",
      rating: 4.4,
      reviewCount: 42,
      badge: "Weekly Deal",
    },
    {
      id: "7",
      name: "Portable Bluetooth Speaker",
      originalPrice: 179.99,
      salePrice: 129.99,
      discount: 28,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.3,
      reviewCount: 65,
      badge: "Weekly Deal",
    },
    {
      id: "8",
      name: "Fitness Smartwatch",
      originalPrice: 249.99,
      salePrice: 199.99,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      category: "Wearables",
      rating: 4.7,
      reviewCount: 112,
      badge: "Weekly Deal",
    },
  ]

  const clearanceDeals = [
    {
      id: "9",
      name: "Mechanical Gaming Keyboard",
      originalPrice: 149.99,
      salePrice: 89.99,
      discount: 40,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.5,
      reviewCount: 56,
      badge: "Clearance",
    },
    {
      id: "10",
      name: "Wireless Earbuds",
      originalPrice: 129.99,
      salePrice: 79.99,
      discount: 38,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.2,
      reviewCount: 87,
      badge: "Clearance",
    },
    {
      id: "11",
      name: "External SSD 1TB",
      originalPrice: 199.99,
      salePrice: 129.99,
      discount: 35,
      image: "/placeholder.svg?height=300&width=300",
      category: "Storage",
      rating: 4.8,
      reviewCount: 34,
      badge: "Clearance",
    },
    {
      id: "12",
      name: "Smart Wi-Fi Router",
      originalPrice: 179.99,
      salePrice: 99.99,
      discount: 44,
      image: "/placeholder.svg?height=300&width=300",
      category: "Networking",
      rating: 4.4,
      reviewCount: 45,
      badge: "Clearance",
    },
  ]

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

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
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hot Deals & Special Offers
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Discover incredible savings on the latest tech products. Limited time offers you don't want to miss!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center mt-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-200" />
                  <span className="text-blue-200 font-medium">Flash Sale Ends In:</span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                      {formatTime(timeLeft.days)}
                    </div>
                    <span className="text-xs mt-1 text-blue-200">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                      {formatTime(timeLeft.hours)}
                    </div>
                    <span className="text-xs mt-1 text-blue-200">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                      {formatTime(timeLeft.minutes)}
                    </div>
                    <span className="text-xs mt-1 text-blue-200">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl font-bold">
                      {formatTime(timeLeft.seconds)}
                    </div>
                    <span className="text-xs mt-1 text-blue-200">Seconds</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="flash" className="w-full">
              <div className="flex items-center justify-between mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="flash" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <Flame className="h-4 w-4 mr-2" /> Flash Deals
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Tag className="h-4 w-4 mr-2" /> Weekly Offers
                  </TabsTrigger>
                  <TabsTrigger
                    value="clearance"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Percent className="h-4 w-4 mr-2" /> Clearance
                  </TabsTrigger>
                </TabsList>
                <div className="hidden md:block">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Filter Deals
                  </Button>
                </div>
              </div>

              <TabsContent value="flash" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {flashDeals.map((deal) => (
                    <motion.div key={deal.id} variants={item}>
                      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
                        <CardContent className="p-0">
                          <div className="relative aspect-square bg-gray-100">
                            <Image
                              src={deal.image || "/placeholder.svg"}
                              alt={deal.name}
                              fill
                              className="object-contain p-4"
                            />
                            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 flex items-center gap-1">
                              <Flame className="h-3 w-3" /> {deal.badge}
                            </Badge>
                            <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">
                              {deal.discount}% OFF
                            </Badge>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAddToCart(deal)}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{deal.category}</div>
                            <h3 className="font-medium text-lg line-clamp-2 min-h-[56px]">{deal.name}</h3>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-lg font-bold text-blue-600">${deal.salePrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">
                                ${deal.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">75% claimed</p>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="weekly" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {weeklyDeals.map((deal) => (
                    <motion.div key={deal.id} variants={item}>
                      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
                        <CardContent className="p-0">
                          <div className="relative aspect-square bg-gray-100">
                            <Image
                              src={deal.image || "/placeholder.svg"}
                              alt={deal.name}
                              fill
                              className="object-contain p-4"
                            />
                            <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                              <Tag className="h-3 w-3" /> {deal.badge}
                            </Badge>
                            <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">
                              {deal.discount}% OFF
                            </Badge>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAddToCart(deal)}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{deal.category}</div>
                            <h3 className="font-medium text-lg line-clamp-2 min-h-[56px]">{deal.name}</h3>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-lg font-bold text-blue-600">${deal.salePrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">
                                ${deal.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="clearance" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {clearanceDeals.map((deal) => (
                    <motion.div key={deal.id} variants={item}>
                      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
                        <CardContent className="p-0">
                          <div className="relative aspect-square bg-gray-100">
                            <Image
                              src={deal.image || "/placeholder.svg"}
                              alt={deal.name}
                              fill
                              className="object-contain p-4"
                            />
                            <Badge className="absolute top-2 left-2 bg-orange-600 hover:bg-orange-700 flex items-center gap-1">
                              <Percent className="h-3 w-3" /> {deal.badge}
                            </Badge>
                            <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">
                              {deal.discount}% OFF
                            </Badge>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAddToCart(deal)}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{deal.category}</div>
                            <h3 className="font-medium text-lg line-clamp-2 min-h-[56px]">{deal.name}</h3>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-lg font-bold text-blue-600">${deal.salePrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">
                                ${deal.originalPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Deal Categories</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  Browse deals by category to find exactly what you're looking for.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/categories/laptops" className="group">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
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
                        className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="2" x2="22" y1="20" y2="20" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Laptops</h3>
                    <p className="text-sm text-gray-500 mt-1">Up to 30% off</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/categories/smartphones" className="group">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
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
                        className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors"
                      >
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" x2="12.01" y1="18" y2="18" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Smartphones</h3>
                    <p className="text-sm text-gray-500 mt-1">Up to 25% off</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/categories/audio" className="group">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
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
                        className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors"
                      >
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Audio</h3>
                    <p className="text-sm text-gray-500 mt-1">Up to 40% off</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/categories/smart-home" className="group">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
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
                        className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Smart Home</h3>
                    <p className="text-sm text-gray-500 mt-1">Up to 35% off</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/categories">
                  View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Subscribe for Exclusive Deals</h2>
                <p className="text-gray-600 mb-6">
                  Be the first to know about our special offers, new products, and exclusive deals. Subscribe to our
                  newsletter and never miss out on savings!
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Special deals illustration"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

