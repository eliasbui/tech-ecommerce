"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingSkeleton from "@/components/loading-skeleton"

export default function LoadingDemoPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleProcessing = () => {
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
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
          <span className="text-gray-900 font-medium">Loading Effects Demo</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Loading Effects Demo</h1>
          <p className="text-gray-500 mb-8">
            This page demonstrates various loading effects and animations that can be used throughout the eCommerce
            site.
          </p>

          <Tabs defaultValue="skeleton" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="skeleton">Skeleton Loaders</TabsTrigger>
              <TabsTrigger value="spinner">Spinner Effects</TabsTrigger>
              <TabsTrigger value="shimmer">Shimmer Effects</TabsTrigger>
            </TabsList>

            <TabsContent value="skeleton" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton Loaders</CardTitle>
                  <CardDescription>
                    Placeholder UI that mimics the layout of the content while it's loading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Product Card Skeletons</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                          Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardContent className="p-0">
                                <LoadingSkeleton type="product" />
                                <div className="p-4 space-y-3">
                                  <LoadingSkeleton type="text" className="w-1/3" />
                                  <LoadingSkeleton type="text" className="w-3/4" />
                                  <div className="flex space-x-1">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                      <LoadingSkeleton
                                        key={j}
                                        type="text"
                                        width={16}
                                        height={16}
                                        className="rounded-full"
                                      />
                                    ))}
                                  </div>
                                  <LoadingSkeleton type="text" className="w-1/4" />
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="col-span-full">
                            <Button onClick={() => setIsLoading(true)} className="bg-blue-600 hover:bg-blue-700">
                              Reload Skeletons
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Text Content Skeletons</h3>
                      <Card>
                        <CardContent className="p-6">
                          {isLoading ? (
                            <div className="space-y-4">
                              <LoadingSkeleton type="text" className="w-3/4" height={28} />
                              <LoadingSkeleton type="text" className="w-1/2" />
                              <div className="space-y-2">
                                <LoadingSkeleton type="text" />
                                <LoadingSkeleton type="text" />
                                <LoadingSkeleton type="text" />
                                <LoadingSkeleton type="text" className="w-3/4" />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h2 className="text-2xl font-bold mb-2">Product Description</h2>
                              <p className="text-gray-500 mb-4">High-quality tech products for every need</p>
                              <p className="mb-2">
                                Experience unparalleled performance with our premium selection of devices. Designed for
                                professionals and enthusiasts alike, our products combine cutting-edge technology with
                                sleek design.
                              </p>
                              <p>Every product comes with a 2-year warranty and free technical support.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spinner" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spinner Effects</CardTitle>
                  <CardDescription>Animated spinners and loaders for processing states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Button Loading States</h3>
                      <div className="space-y-4">
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isProcessing}
                          onClick={handleProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Process Payment"
                          )}
                        </Button>

                        <Button variant="outline" className="w-full" disabled={isProcessing} onClick={handleProcessing}>
                          {isProcessing ? (
                            <>
                              <div className="flex space-x-1 mr-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                              Loading...
                            </>
                          ) : (
                            "Load More Products"
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Standalone Spinners</h3>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                          <p className="text-sm text-gray-500 mt-2">Basic Spinner</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="relative w-12 h-12">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-blue-600">
                              75%
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Progress Spinner</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex space-x-1">
                            <div
                              className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Bouncing Dots</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shimmer" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shimmer Effects</CardTitle>
                  <CardDescription>Animated shimmer effects that add visual interest to loading states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Card Shimmer Effect</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isLoading ? (
                          Array.from({ length: 2 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardContent className="p-6">
                                <div className="flex gap-4">
                                  <LoadingSkeleton type="circle" width={48} height={48} />
                                  <div className="flex-1 space-y-2">
                                    <LoadingSkeleton type="text" className="w-3/4" />
                                    <LoadingSkeleton type="text" className="w-1/2" />
                                  </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                  <LoadingSkeleton type="text" />
                                  <LoadingSkeleton type="text" />
                                  <LoadingSkeleton type="text" className="w-3/4" />
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="col-span-full">
                            <Button onClick={() => setIsLoading(true)} className="bg-blue-600 hover:bg-blue-700">
                              Reload Shimmer Effect
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Image Shimmer Effect</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {isLoading ? (
                          Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="aspect-square relative overflow-hidden rounded-md">
                              <LoadingSkeleton className="absolute inset-0" />
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full">
                            <Button onClick={() => setIsLoading(true)} className="bg-blue-600 hover:bg-blue-700">
                              Reload Image Shimmer
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

