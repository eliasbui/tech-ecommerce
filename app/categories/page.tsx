"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CategoriesPage() {
  // Main categories
  const mainCategories = [
    {
      id: "laptops",
      name: "Laptops & Computers",
      description: "Powerful machines for work and play",
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
      subcategories: [
        { id: "laptops-gaming", name: "Gaming Laptops" },
        { id: "laptops-ultrabook", name: "Ultrabooks" },
        { id: "laptops-workstation", name: "Workstations" },
        { id: "desktops", name: "Desktop Computers" },
        { id: "components", name: "PC Components" },
      ],
    },
    {
      id: "smartphones",
      name: "Smartphones & Accessories",
      description: "Stay connected with the latest mobile technology",
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
      subcategories: [
        { id: "smartphones-android", name: "Android Phones" },
        { id: "smartphones-ios", name: "iPhones" },
        { id: "smartphones-cases", name: "Phone Cases" },
        { id: "smartphones-chargers", name: "Chargers & Cables" },
        { id: "smartphones-screen", name: "Screen Protectors" },
      ],
    },
    {
      id: "audio",
      name: "Audio & Headphones",
      description: "Immersive sound experiences for every situation",
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
      subcategories: [
        { id: "audio-headphones", name: "Headphones" },
        { id: "audio-earbuds", name: "Earbuds" },
        { id: "audio-speakers", name: "Speakers" },
        { id: "audio-home", name: "Home Audio" },
        { id: "audio-accessories", name: "Audio Accessories" },
      ],
    },
    {
      id: "tvs",
      name: "TVs & Displays",
      description: "Crystal clear visuals for entertainment and productivity",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
      subcategories: [
        { id: "tvs-smart", name: "Smart TVs" },
        { id: "tvs-oled", name: "OLED TVs" },
        { id: "tvs-qled", name: "QLED TVs" },
        { id: "tvs-monitors", name: "Computer Monitors" },
        { id: "tvs-projectors", name: "Projectors" },
      ],
    },
    {
      id: "smart-home",
      name: "Smart Home",
      description: "Transform your living space with cutting-edge technology",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
      subcategories: [
        { id: "smart-home-speakers", name: "Smart Speakers" },
        { id: "smart-home-security", name: "Security Cameras" },
        { id: "smart-home-lighting", name: "Smart Lighting" },
        { id: "smart-home-thermostats", name: "Smart Thermostats" },
        { id: "smart-home-hubs", name: "Smart Hubs" },
      ],
    },
    {
      id: "wearables",
      name: "Wearable Technology",
      description: "Track your fitness and stay connected on the go",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
      subcategories: [
        { id: "wearables-smartwatches", name: "Smartwatches" },
        { id: "wearables-fitness", name: "Fitness Trackers" },
        { id: "wearables-vr", name: "VR Headsets" },
        { id: "wearables-ar", name: "AR Glasses" },
        { id: "wearables-accessories", name: "Wearable Accessories" },
      ],
    },
    {
      id: "gaming",
      name: "Gaming & Entertainment",
      description: "Level up your gaming experience with the latest gear",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
      subcategories: [
        { id: "gaming-consoles", name: "Gaming Consoles" },
        { id: "gaming-accessories", name: "Gaming Accessories" },
        { id: "gaming-controllers", name: "Controllers" },
        { id: "gaming-vr", name: "VR Gaming" },
        { id: "gaming-games", name: "Video Games" },
      ],
    },
    {
      id: "cameras",
      name: "Cameras & Photography",
      description: "Capture life's moments with stunning clarity",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
      subcategories: [
        { id: "cameras-dslr", name: "DSLR Cameras" },
        { id: "cameras-mirrorless", name: "Mirrorless Cameras" },
        { id: "cameras-point", name: "Point & Shoot" },
        { id: "cameras-lenses", name: "Camera Lenses" },
        { id: "cameras-accessories", name: "Photography Accessories" },
      ],
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Our Categories</h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Explore our wide range of tech products across popular categories.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {mainCategories
                .filter((cat) => cat.featured)
                .map((category) => (
                  <motion.div key={category.id} variants={item}>
                    <Link href={`/categories/${category.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                        <CardContent className="p-0">
                          <div className="relative h-48 bg-gray-100">
                            <Image
                              src={category.image || "/placeholder.svg"}
                              alt={category.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                              <h3 className="font-bold text-xl">{category.name}</h3>
                              <p className="text-sm text-white/80">{category.description}</p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex flex-wrap gap-2">
                              {category.subcategories.slice(0, 3).map((sub) => (
                                <Badge key={sub.id} variant="outline">
                                  {sub.name}
                                </Badge>
                              ))}
                              {category.subcategories.length > 3 && (
                                <Badge variant="outline">+{category.subcategories.length - 3} more</Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              className="mt-4 w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              View All Products <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">All Categories</h2>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {mainCategories.map((category) => (
                <motion.div key={category.id} variants={item}>
                  <Link href={`/categories/${category.id}`} className="block h-full">
                    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full">
                          <div className="mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                              {category.id === "laptops" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <rect x="2" y="3" width="20" height="14" rx="2" />
                                  <line x1="2" x2="22" y1="20" y2="20" />
                                </svg>
                              )}
                              {category.id === "smartphones" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                  <line x1="12" x2="12.01" y1="18" y2="18" />
                                </svg>
                              )}
                              {category.id === "audio" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                </svg>
                              )}
                              {category.id === "tvs" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                  <polyline points="17 2 12 7 7 2" />
                                </svg>
                              )}
                              {category.id === "smart-home" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                  <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                              )}
                              {category.id === "wearables" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <circle cx="12" cy="12" r="7" />
                                  <polyline points="12 9 12 12 13.5 13.5" />
                                  <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
                                </svg>
                              )}
                              {category.id === "gaming" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <line x1="6" x2="10" y1="12" y2="12" />
                                  <line x1="8" x2="8" y1="10" y2="14" />
                                  <line x1="15" x2="15.01" y1="13" y2="13" />
                                  <line x1="18" x2="18.01" y1="11" y2="11" />
                                  <rect x="2" y="6" width="20" height="12" rx="2" />
                                </svg>
                              )}
                              {category.id === "cameras" && (
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
                                  className="h-6 w-6 text-blue-600"
                                >
                                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                                  <circle cx="12" cy="13" r="3" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                            <ul className="space-y-1 text-sm text-gray-500 flex-1">
                              {category.subcategories.slice(0, 4).map((sub) => (
                                <li key={sub.id} className="flex items-center">
                                  <ChevronRight className="h-3 w-3 mr-1 text-blue-600" />
                                  {sub.name}
                                </li>
                              ))}
                              {category.subcategories.length > 4 && (
                                <li className="text-blue-600">+ more subcategories</li>
                              )}
                            </ul>
                          </div>
                          <Button
                            variant="ghost"
                            className="mt-4 justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            Explore <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">Can't Find What You're Looking For?</h2>
                <p className="text-gray-600 mb-6">
                  Our customer support team is here to help you find the perfect product for your needs. Contact us for
                  personalized recommendations and assistance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/support">Contact Support</Link>
                  </Button>
                  <Button asChild variant="outline" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <Link href="/search">Search Products</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Customer support"
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

