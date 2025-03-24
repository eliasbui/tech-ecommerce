"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Filter, Grid3X3, List, SearchIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "wireless headphones",
    "gaming laptop",
    "smartphone",
    "smart watch",
  ])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock product data
  const allProducts = [
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

  // Simulate search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Generate suggestions based on search query
    const potentialSuggestions = [
      `${searchQuery} pro`,
      `${searchQuery} wireless`,
      `${searchQuery} premium`,
      `${searchQuery} bluetooth`,
      `${searchQuery} ultra`,
    ].filter((suggestion) => suggestion !== searchQuery)

    setSuggestions(potentialSuggestions.slice(0, 5))
    setShowSuggestions(true)
  }, [searchQuery])

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim() === "") return

    setIsLoading(true)
    setShowSuggestions(false)

    // Add to recent searches if not already there
    if (!recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev].slice(0, 5))
    }

    // Simulate API call delay
    setTimeout(() => {
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setIsLoading(false)
    }, 800)
  }

  const handleFilterChange = () => {
    setIsLoading(true)
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
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
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for products, brands, or categories..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border"
            >
              <ul className="py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        setSearchQuery(suggestion)
                        handleSearch(suggestion)
                      }}
                    >
                      <SearchIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {searchQuery === "" ? (
          <div className="space-y-8">
            {recentSearches.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery(search)
                        handleSearch(search)
                      }}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
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
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Trending Searches</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "wireless earbuds",
                  "gaming laptop",
                  "mechanical keyboard",
                  "smart watch",
                  "4k monitor",
                  "bluetooth speaker",
                ].map((trend, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSearchQuery(trend)
                      handleSearch(trend)
                    }}
                  >
                    {trend}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                {searchResults.length > 0 ? (
                  <h1 className="text-2xl font-bold tracking-tight">Search results for "{searchQuery}"</h1>
                ) : isLoading ? (
                  <h1 className="text-2xl font-bold tracking-tight">Searching for "{searchQuery}"...</h1>
                ) : (
                  <h1 className="text-2xl font-bold tracking-tight">No results found for "{searchQuery}"</h1>
                )}
                {searchResults.length > 0 && <p className="text-gray-500">{searchResults.length} products found</p>}
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
                      <SheetDescription>Narrow down your search results with filters.</SheetDescription>
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
                      </Accordion>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="flex items-center">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
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
                ) : searchResults.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={
                      view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"
                    }
                  >
                    {searchResults.map((product) => (
                      <motion.div key={product.id} variants={item}>
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <SearchIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      We couldn't find any products matching "{searchQuery}". Try using different keywords or browse our
                      categories.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <p className="w-full text-sm text-gray-500 mb-2">Try searching for:</p>
                      {["laptop", "smartphone", "headphones", "smartwatch", "camera"].map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSearchQuery(suggestion)
                            handleSearch(suggestion)
                          }}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/categories">
                        Browse Categories <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

