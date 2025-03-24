"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SalePopupProps {
  title: string
  description: string
  discountCode?: string
  expiryTime?: number // in seconds
  onClose: () => void
}

export default function SalePopup({
  title,
  description,
  discountCode,
  expiryTime = 3600, // default 1 hour
  onClose,
}: SalePopupProps) {
  const [timeLeft, setTimeLeft] = useState(expiryTime)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCopyCode = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-2">{description}</p>

            {timeLeft > 0 && (
              <div className="mt-4">
                <p className="text-sm text-blue-100">Offer expires in:</p>
                <div className="flex gap-2 mt-1">
                  {formatTime(timeLeft)
                    .split(":")
                    .map((unit, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-lg font-mono">
                        {unit}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {discountCode && (
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">Use this code at checkout:</p>
              <div className="flex">
                <div className="flex-1 bg-gray-100 rounded-l-md p-3 font-mono text-center border border-r-0">
                  {discountCode}
                </div>
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700" onClick={handleCopyCode}>
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          )}

          <div className="p-6 pt-0 flex justify-center">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onClose}>
              Shop Now
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

