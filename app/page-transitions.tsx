"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface PageTransitionsProps {
  children: React.ReactNode
}

export default function PageTransitions({ children }: PageTransitionsProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Skip the animation on first mount
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3 },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
      transition: { duration: 0.3 },
    },
  }

  // Choose transition based on path
  const getTransition = (path: string) => {
    if (path.includes("/product")) return variants.zoom
    if (path.includes("/cart") || path.includes("/checkout")) return variants.slideLeft
    if (path.includes("/profile")) return variants.slideUp
    return variants.fadeIn
  }

  const transition = getTransition(pathname)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? false : transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={transition.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

