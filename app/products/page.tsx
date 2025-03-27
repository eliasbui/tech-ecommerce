"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Filter, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ProductCard from "@/components/product-card"

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [isLoading, setIsLoading] = useState(false)

  // Mock products data
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
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Accessories",
      rating: 4.6,
      reviewCount: 78,
    },
    {
      id: "6",
      name: "Smart Home Security Camera",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Smart Home",
      rating: 4.4,
      reviewCount: 42,
    },
    {
      id: "7",
      name: "Portable Bluetooth Speaker",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Audio",
      rating: 4.3,
      reviewCount: 65,
    },
    {
      id: "8",
      name: "Fitness Smartwatch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Wearables",
      rating: 4.7,
      reviewCount: 112,
    },
  ]

  const handleFilterChange = () => {
    setIsLoading(true)
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-gray-500">Browse our collection of tech products</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your product search with filters.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <Accordion type="single" collapsible className="w-full" defaultValue="category">
                    <AccordionItem value="category">
                      <AccordionTrigger>Category</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="laptops-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="laptops-mobile">Laptops & Computers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="smartphones-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="smartphones-mobile">Smartphones</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="audio-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="audio-mobile">Audio</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tvs-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="tvs-mobile">TVs & Displays</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="wearables-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="wearables-mobile">Wearables</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="pt-4">
                            <Slider
                              defaultValue={[0, 2000]}
                              max={2000}
                              step={10}
                              onValueChange={(value) => {
                                setPriceRange(value)
                                handleFilterChange()
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="brand">
                      <AccordionTrigger>Brand</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="apple-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="apple-mobile">Apple</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="samsung-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="samsung-mobile">Samsung</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sony-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="sony-mobile">Sony</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="microsoft-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="microsoft-mobile">Microsoft</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="google-mobile" onCheckedChange={handleFilterChange} />
                            <Label htmlFor="google-mobile">Google</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rating">
                      <AccordionTrigger>Rating</AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup defaultValue="all" className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all-mobile" />
                            <Label htmlFor="all-mobile">All Ratings</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4plus" id="4plus-mobile" />
                            <Label htmlFor="4plus-mobile">4+ Stars</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3plus" id="3plus-mobile" />
                            <Label htmlFor="3plus-mobile">3+ Stars</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2plus" id="2plus-mobile" />
                            <Label htmlFor="2plus-mobile">2+ Stars</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1plus" id="1plus-mobile" />
                            <Label htmlFor="1plus-mobile">1+ Stars</Label>
                          </div>
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden md:flex items-center gap-1 ml-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                className={view === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                className={view === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="laptops" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="laptops">Laptops & Computers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="smartphones" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="smartphones">Smartphones</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audio" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="audio">Audio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tvs" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="tvs">TVs & Displays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wearables" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="wearables">Wearables</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="space-y-4">
                      <div className="pt-4">
                        <Slider
                          defaultValue={[0, 2000]}
                          max={2000}
                          step={10}
                          onValueChange={(value) => {
                            setPriceRange(value)
                            handleFilterChange()
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Brand</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="apple" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="apple">Apple</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="samsung" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="samsung">Samsung</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sony" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="sony">Sony</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="microsoft" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="microsoft">Microsoft</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="google" onCheckedChange={handleFilterChange} />
                        <Label htmlFor="google">Google</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Rating</h3>
                    <RadioGroup defaultValue="all" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All Ratings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4plus" id="4plus" />
                        <Label htmlFor="4plus">4+ Stars</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3plus" id="3plus" />
                        <Label htmlFor="3plus">3+ Stars</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2plus" id="2plus" />
                        <Label htmlFor="2plus">2+ Stars</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1plus" id="1plus" />
                        <Label htmlFor="1plus">1+ Stars</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-[300px] bg-gray-100 animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                          ))}
                        </div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={
                  view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                }
              >
                {products.map((product) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

