"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderHistoryCardProps {
  order: {
    id: string
    date: string
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
    total: number
    items: OrderItem[]
    trackingNumber?: string
    estimatedDelivery?: string
  }
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-600 hover:bg-blue-700"
      case "Shipped":
        return "bg-amber-600 hover:bg-amber-700"
      case "Delivered":
        return "bg-green-600 hover:bg-green-700"
      case "Cancelled":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getStatusPercentage = (status: string) => {
    switch (status) {
      case "Processing":
        return 25
      case "Shipped":
        return 75
      case "Delivered":
        return 100
      case "Cancelled":
        return 100
      default:
        return 0
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <motion.div
          className="p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{order.id}</h3>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
              <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold">${order.total.toFixed(2)}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {order.status !== "Cancelled" && order.status !== "Delivered" && (
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">Order Progress</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {getStatusPercentage(order.status)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <motion.div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${getStatusPercentage(order.status)}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Package className="h-3 w-3" /> Processing
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" /> Shipped
                  </span>
                  <span className="flex items-center gap-1">
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
                      className="h-3 w-3"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Delivered
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator />
              <div className="p-6">
                <h4 className="font-medium mb-4">Order Items</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 rounded-md border bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(order.status === "Shipped" || order.status === "Delivered") && order.trackingNumber && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number</p>
                        <p className="font-medium">{order.trackingNumber}</p>
                      </div>
                      {order.estimatedDelivery && (
                        <div>
                          <p className="text-sm text-gray-500">Estimated Delivery</p>
                          <p className="font-medium">{order.estimatedDelivery}</p>
                        </div>
                      )}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm mt-2">
                      Track Package
                    </Button>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" size="sm">
                    View Order Details
                  </Button>
                  {order.status !== "Cancelled" && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Request Return
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

