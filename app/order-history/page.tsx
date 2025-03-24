"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderHistoryCard from "@/components/order-history-card"

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      status: "Delivered" as const,
      total: 1549.98,
      items: [
        {
          id: "1",
          name: "Ultra Slim Laptop Pro",
          price: 1299.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "2",
          name: "Wireless Noise-Cancelling Headphones",
          price: 249.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      trackingNumber: "1Z999AA10123456784",
      estimatedDelivery: "Delivered on April 20, 2023",
    },
    {
      id: "ORD-12346",
      date: "2023-03-22",
      status: "Delivered" as const,
      total: 999.99,
      items: [
        {
          id: "4",
          name: "Premium Smartphone X",
          price: 999.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      trackingNumber: "1Z999AA10123456785",
      estimatedDelivery: "Delivered on March 25, 2023",
    },
    {
      id: "ORD-12347",
      date: "2023-05-03",
      status: "Shipped" as const,
      total: 409.97,
      items: [
        {
          id: "5",
          name: "Wireless Gaming Mouse",
          price: 79.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "7",
          name: "Portable Bluetooth Speaker",
          price: 129.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "8",
          name: "Fitness Smartwatch",
          price: 199.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      trackingNumber: "1Z999AA10123456786",
      estimatedDelivery: "Expected delivery by May 10, 2023",
    },
    {
      id: "ORD-12348",
      date: "2023-05-15",
      status: "Processing" as const,
      total: 349.98,
      items: [
        {
          id: "9",
          name: "Smart Home Security Camera",
          price: 149.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "10",
          name: "Wireless Earbuds",
          price: 199.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
  ]

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/profile" className="hover:text-blue-600">
            My Account
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Order History</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-500">View and manage your previous orders</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <motion.div key={order.id} variants={item}>
                    <OrderHistoryCard order={order} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
                  <p className="text-gray-500 mb-6">We couldn't find any orders matching your search criteria.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {filteredOrders.filter((order) => order.status === "Processing").length > 0 ? (
                filteredOrders
                  .filter((order) => order.status === "Processing")
                  .map((order) => (
                    <motion.div key={order.id} variants={item}>
                      <OrderHistoryCard order={order} />
                    </motion.div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
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
                      className="h-8 w-8 text-gray-400"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No processing orders</h2>
                  <p className="text-gray-500 mb-6">You don't have any orders that are currently being processed.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {filteredOrders.filter((order) => order.status === "Shipped").length > 0 ? (
                filteredOrders
                  .filter((order) => order.status === "Shipped")
                  .map((order) => (
                    <motion.div key={order.id} variants={item}>
                      <OrderHistoryCard order={order} />
                    </motion.div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
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
                      className="h-8 w-8 text-gray-400"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 9h10" />
                      <path d="M7 13h10" />
                      <path d="M7 17h10" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No shipped orders</h2>
                  <p className="text-gray-500 mb-6">You don't have any orders that are currently being shipped.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              {filteredOrders.filter((order) => order.status === "Delivered").length > 0 ? (
                filteredOrders
                  .filter((order) => order.status === "Delivered")
                  .map((order) => (
                    <motion.div key={order.id} variants={item}>
                      <OrderHistoryCard order={order} />
                    </motion.div>
                  ))
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
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
                      className="h-8 w-8 text-gray-400"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No delivered orders</h2>
                  <p className="text-gray-500 mb-6">You don't have any orders that have been delivered yet.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

