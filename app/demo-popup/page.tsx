"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import SalePopup from "@/components/sale-popup"

export default function DemoPopupPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<"welcome" | "flash" | "discount">("welcome")

  const handleShowPopup = (type: "welcome" | "flash" | "discount") => {
    setPopupType(type)
    setShowPopup(true)
  }

  const popupContent = {
    welcome: {
      title: "Welcome to TechHub!",
      description: "Sign up today and get 10% off your first order.",
      discountCode: "WELCOME10",
    },
    flash: {
      title: "Flash Sale!",
      description: "Get up to 50% off on selected items. Limited time only!",
      expiryTime: 3600, // 1 hour
    },
    discount: {
      title: "Exclusive Offer",
      description: "Use this code to get 20% off on all accessories.",
      discountCode: "TECH20",
      expiryTime: 7200, // 2 hours
    },
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
          <span className="text-gray-900 font-medium">Demo Popups</span>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Sale Popup Demos</h1>
          <p className="text-gray-500 mb-8">
            Click the buttons below to see different types of promotional popups that can be used throughout the
            eCommerce site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleShowPopup("welcome")}>
              Welcome Popup
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleShowPopup("flash")}>
              Flash Sale Popup
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleShowPopup("discount")}>
              Discount Code Popup
            </Button>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Implementation Notes</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                These popups can be triggered based on various user actions or events:
                <ul className="space-y-1 list-disc pl-5 mt-2">
                  <li>First-time visitors (Welcome popup)</li>
                  <li>Exit intent detection (Discount code popup)</li>
                  <li>Time-based triggers for flash sales</li>
                  <li>Cart abandonment prevention</li>
                </ul>
              </li>
              <li>All popups include smooth animations for entry and exit using Framer Motion</li>
              <li>The countdown timer updates in real-time to create urgency</li>
              <li>Discount codes can be copied to clipboard with a single click</li>
            </ul>
          </div>
        </div>
      </div>

      {showPopup && (
        <SalePopup
          title={popupContent[popupType].title}
          description={popupContent[popupType].description}
          discountCode={popupContent[popupType].discountCode}
          expiryTime={popupContent[popupType].expiryTime}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  )
}

