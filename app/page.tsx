import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeaturedCategories from "@/components/featured-categories"
import TrendingProducts from "@/components/trending-products"
import NewsletterSection from "@/components/newsletter-section"

export default function Home() {
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
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/products"
                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
              >
                Deals
              </Link>
              <Link
                href="/support"
                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
              >
                Support
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/search" className="hidden md:flex">
              <Button variant="ghost" size="icon" className="hover:text-blue-600">
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
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Search</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="hover:text-blue-600">
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
                  className="h-5 w-5"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:text-blue-600 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/signin" className="hidden md:block">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TrendingProducts />
        <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Special Offers</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Check out our limited-time deals on the latest tech products.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    View All Deals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <NewsletterSection />
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Featured
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Latest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Bestsellers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Order Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">

          </div>
        </div>
      </footer>
    </div>
  )
}

