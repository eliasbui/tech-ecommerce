import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {Toaster} from "@/components/ui/toaster"
import {ThemeProvider} from "@/components/ThemeProvider"
import FooterPopup from "@/components/FooterPopup"
import { MainNav } from "@/components/MainNav"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "TechHub - Premium Tech Products",
  description: "Discover the latest innovations in technology with our premium selection of devices.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen pb-20`}>
        <ThemeProvider>
          <MainNav />
          <main className="min-h-screen">
            {children}
          </main>
          <FooterPopup />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
