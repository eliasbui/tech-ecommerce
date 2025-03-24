"use client"

import { motion } from "framer-motion"

interface LoadingSkeletonProps {
  type?: "product" | "card" | "text" | "circle"
  count?: number
  className?: string
  width?: string | number
  height?: string | number
}

export default function LoadingSkeleton({
  type = "text",
  count = 1,
  className = "",
  width,
  height,
}: LoadingSkeletonProps) {
  const getSkeletonStyle = () => {
    switch (type) {
      case "product":
        return "h-[300px] w-full rounded-md"
      case "card":
        return "h-32 w-full rounded-md"
      case "circle":
        return "h-12 w-12 rounded-full"
      case "text":
      default:
        return "h-4 w-full rounded"
    }
  }

  const baseStyle = getSkeletonStyle()
  const style = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  }

  const shimmer = {
    hidden: { backgroundPosition: "-200% 0" },
    visible: {
      backgroundPosition: "200% 0",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "linear",
      },
    },
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`${baseStyle} ${className} bg-gray-200 overflow-hidden relative`}
          style={style}
          variants={shimmer}
          initial="hidden"
          animate="visible"
          css={{
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      ))}
    </>
  )
}

