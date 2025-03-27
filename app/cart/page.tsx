"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Menu, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      quantity: 1,
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      quantity: 1,
    },
    {
      id: "4",
      name: "Premium Smartphone X",
      price: 999.99,
      image: "/placeholder.svg?height=300&width=300",
      quantity: 1,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleApplyPromoCode = () => {
    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "tech20") {
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        setDiscount(subtotal * 0.2)
        toast({
          title: "Promo code applied",
          description: "20% discount has been applied to your order.",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 9.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                TechHub
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Deals
              </Link>
              <Link href="/support" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Support
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search, Account, Cart Icons */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="sr-only">Search</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="sr-only">Account</span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span className="sr-only">Cart</span>
            </Button>
            
            {/* Sign In Button */}
            <Button variant="default" className="hidden md:flex bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
                  <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                  <div className="flex flex-col space-y-4 py-4">
                    <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text mb-6">
                      TechHub
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      <Link href="/products" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Products
                      </Link>
                      <Separator className="my-1" />
                      <Link href="/categories" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Categories
                      </Link>
                      <Separator className="my-1" />
                      <Link href="/deals" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Deals
                      </Link>
                      <Separator className="my-1" />
                      <Link href="/support" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Support
                      </Link>
                      <Separator className="my-1" />
                      <Link href="/search" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Search
                      </Link>
                      <Separator className="my-1" />
                      <Link href="/account" className="text-base font-medium hover:text-blue-600 transition-colors">
                        Account
                      </Link>
                      <Separator className="my-1" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                        Sign In
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div key={item.id} variants={itemAnimation}>
                    <Card>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-lg">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">ID: {item.id}</p>
                              </div>
                              <p className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                  <span className="sr-only">Decrease quantity</span>
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                  <span className="sr-only">Increase quantity</span>
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 -mr-2"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8">
                <Button asChild variant="outline" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Link href="/products">
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" /> Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleApplyPromoCode} disabled={isApplyingPromo || !promoCode}>
                        {isApplyingPromo ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </div>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link href="/checkout">
                        Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="text-xs text-gray-500 text-center">Secure checkout powered by Stripe</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
