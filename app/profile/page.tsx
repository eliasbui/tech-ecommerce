"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Bell, CreditCard, Edit, Heart, LogOut, MapPin, Package, Settings, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  // Mock orders data
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      status: "Delivered",
      total: 1549.98,
      items: [
        {
          id: "1",
          name: "Ultra Slim Laptop Pro",
          price: 1299.99,
          quantity: 1,
        },
        {
          id: "2",
          name: "Wireless Noise-Cancelling Headphones",
          price: 249.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12346",
      date: "2023-03-22",
      status: "Delivered",
      total: 999.99,
      items: [
        {
          id: "4",
          name: "Premium Smartphone X",
          price: 999.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12347",
      date: "2023-05-03",
      status: "Processing",
      total: 279.98,
      items: [
        {
          id: "5",
          name: "Wireless Gaming Mouse",
          price: 79.99,
          quantity: 1,
        },
        {
          id: "7",
          name: "Portable Bluetooth Speaker",
          price: 129.99,
          quantity: 1,
        },
        {
          id: "8",
          name: "Fitness Smartwatch",
          price: 199.99,
          quantity: 1,
        },
      ],
    },
  ]

  // Mock addresses data
  const addresses = [
    {
      id: "addr-1",
      type: "Home",
      name: "John Doe",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-2",
      type: "Work",
      name: "John Doe",
      street: "456 Market Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      isDefault: false,
    },
  ]

  // Mock payment methods data
  const paymentMethods = [
    {
      id: "pm-1",
      type: "Visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/24",
      isDefault: false,
    },
  ]

  // Mock wishlist data
  const wishlist = [
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      inStock: true,
    },
    {
      id: "3",
      name: "Smart 4K Ultra HD TV",
      price: 799.99,
      image: "/placeholder.svg?height=300&width=300",
      inStock: true,
    },
    {
      id: "8",
      name: "Fitness Smartwatch",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      inStock: false,
    },
  ]

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
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:text-blue-600 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="hover:text-blue-600 relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                  5
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                  <Badge className="mt-2 bg-blue-600 hover:bg-blue-700">Premium Member</Badge>
                </div>
                <Separator className="my-4" />
                <nav className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-blue-600"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
                  >
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                  <Link
                    href="/profile/addresses"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Addresses</span>
                  </Link>
                  <Link
                    href="/profile/payment"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Methods</span>
                  </Link>
                  <Link
                    href="/profile/wishlist"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="/logout"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your personal information and contact details</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? (
                        "Cancel"
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                        </div>
                        <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                          Save Changes
                        </Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p>{profileData.name}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                            <p>{profileData.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p>{profileData.phone}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                            <p>January 15, 2022</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Login History</h3>
                          <p className="text-sm text-gray-500">View your recent login activity</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your notification and communication preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive order updates and promotions</p>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-blue-600 p-1 shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                          <div className="h-4 w-4 rounded-full bg-white shadow-sm transition duration-200 translate-x-5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Receive order and delivery updates via text</p>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-gray-200 p-1 shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                          <div className="h-4 w-4 rounded-full bg-white shadow-sm transition duration-200"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="font-medium">Marketing Communications</h3>
                          <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-blue-600 p-1 shadow-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                          <div className="h-4 w-4 rounded-full bg-white shadow-sm transition duration-200 translate-x-5"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      {orders.map((order) => (
                        <motion.div key={order.id} variants={item}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                  <h3 className="font-medium">Order #{order.id}</h3>
                                  <p className="text-sm text-gray-500">
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center gap-4">
                                  <Badge
                                    className={
                                      order.status === "Delivered"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                              <Separator className="my-4" />
                              <div className="space-y-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-md border bg-gray-100 flex-shrink-0">
                                      <Image
                                        src="/placeholder.svg"
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="object-contain p-2"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium truncate">{item.name}</h4>
                                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <Separator className="my-4" />
                              <div className="flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-bold">${order.total.toFixed(2)}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your shipping and billing addresses</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Add New Address</Button>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {addresses.map((address) => (
                        <motion.div key={address.id} variants={item}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{address.type}</Badge>
                                  {address.isDefault && (
                                    <Badge className="bg-blue-600 hover:bg-blue-700">Default</Badge>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
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
                                      className="h-4 w-4"
                                    >
                                      <path d="M3 6h18" />
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium">{address.name}</p>
                                <p>{address.street}</p>
                                <p>
                                  {address.city}, {address.state} {address.zip}
                                </p>
                                <p>{address.country}</p>
                              </div>
                              {!address.isDefault && (
                                <Button variant="link" className="mt-4 h-auto p-0 text-blue-600">
                                  Set as default
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your saved payment methods</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Add Payment Method</Button>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {paymentMethods.map((method) => (
                        <motion.div key={method.id} variants={item}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                  {method.type === "Visa" ? (
                                    <svg
                                      className="h-8 w-12"
                                      viewBox="0 0 48 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect width="48" height="32" rx="4" fill="white" />
                                      <path
                                        d="M18.4241 21.3418H14.9578L17.1708 11.0181H20.6371L18.4241 21.3418Z"
                                        fill="#00579F"
                                      />
                                      <path
                                        d="M28.0587 11.2864C27.3431 11.0181 26.2212 10.75 24.8329 10.75C21.7595 10.75 19.5465 12.3545 19.5465 14.7681C19.5465 16.6409 21.0964 17.5772 22.2839 18.1772C23.4714 18.7772 23.8778 19.1772 23.8778 19.7136C23.8778 20.5181 22.8903 20.9181 21.9684 20.9181C20.6456 20.9181 19.9301 20.6499 18.8771 20.1817L18.4707 19.9817L18.0643 22.8135C18.9206 23.2135 20.4049 23.5499 21.9684 23.5499C25.2346 23.5499 27.3825 21.9772 27.3825 19.3772C27.3825 17.9363 26.5262 16.8681 24.7673 16.0045C23.6487 15.4045 22.9987 15.0045 22.9987 14.4045C22.9987 13.8681 23.6487 13.3363 24.9715 13.3363C26.0901 13.3363 26.8712 13.5363 27.4556 13.8045L27.7307 13.9363L28.0587 11.2864Z"
                                        fill="#00579F"
                                      />
                                      <path
                                        d="M32.3937 17.7772C32.6687 17.0409 33.5906 14.7 33.5906 14.7C33.5906 14.7 33.7875 14.1636 33.9187 13.8272L34.1281 14.5636C34.1281 14.5636 34.7125 16.9772 34.8437 17.7772C34.3031 17.7772 32.9803 17.7772 32.3937 17.7772ZM35.9625 11.0181H33.3156C32.6 11.0181 32.0812 11.2181 31.7531 11.9545L27.3825 21.3418H30.7843C30.7843 21.3418 31.3031 19.9772 31.4343 19.6409C31.8406 19.6409 34.7125 19.6409 35.2312 19.6409C35.3625 20.0409 35.6375 21.3418 35.6375 21.3418H38.6453L35.9625 11.0181Z"
                                        fill="#00579F"
                                      />
                                      <path
                                        d="M13.0797 11.0181L9.87969 18.0454L9.55156 16.5727C8.97813 14.9318 7.40938 13.1272 5.64688 12.1909L8.57813 21.3318H12.0141L16.9734 11.0181H13.0797Z"
                                        fill="#00579F"
                                      />
                                      <path
                                        d="M7.84375 11.0181H2.97656C2.3625 11.0863 1.88906 11.2863 1.61719 11.8863L0.0140625 21.3318H3.45156L4.22031 16.9727H7.84375L7.84375 11.0181Z"
                                        fill="#00579F"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="h-8 w-12"
                                      viewBox="0 0 48 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect width="48" height="32" rx="4" fill="white" />
                                      <path d="M29.6768 21.1483H26.1104V11.3483H29.6768V21.1483Z" fill="#FF5F00" />
                                      <path
                                        d="M26.3768 16.2483C26.3768 14.1483 27.3768 12.2483 28.9768 11.0483C28.0768 10.3483 26.9768 9.94827 25.7768 9.94827C22.5768 9.94827 19.9768 12.7483 19.9768 16.1483C19.9768 19.5483 22.5768 22.3483 25.7768 22.3483C26.9768 22.3483 28.0768 21.9483 28.9768 21.2483C27.3768 20.2483 26.3768 18.3483 26.3768 16.2483Z"
                                        fill="#EB001B"
                                      />
                                      <path
                                        d="M35.7768 16.1483C35.7768 19.5483 33.1768 22.3483 29.9768 22.3483C28.7768 22.3483 27.6768 21.9483 26.7768 21.2483C28.3768 20.0483 29.3768 18.1483 29.3768 16.0483C29.3768 13.9483 28.3768 12.0483 26.7768 10.8483C27.6768 10.1483 28.7768 9.74827 29.9768 9.74827C33.1768 9.94827 35.7768 12.7483 35.7768 16.1483Z"
                                        fill="#F79E1B"
                                      />
                                    </svg>
                                  )}
                                  {method.isDefault && <Badge className="bg-blue-600 hover:bg-blue-700">Default</Badge>}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
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
                                      className="h-4 w-4"
                                    >
                                      <path d="M3 6h18" />
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium">
                                  {method.type} ending in {method.last4}
                                </p>
                                <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                              </div>
                              {!method.isDefault && (
                                <Button variant="link" className="mt-4 h-auto p-0 text-blue-600">
                                  Set as default
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wishlist</CardTitle>
                    <CardDescription>Products you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                          <Heart className="h-8 w-8 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-6">
                          Browse our products and add items to your wishlist to save them for later.
                        </p>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link href="/products">Browse Products</Link>
                        </Button>
                      </div>
                    ) : (
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {wishlist.map((item) => (
                          <motion.div key={item.id} variants={item}>
                            <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                              <CardContent className="p-0">
                                <div className="relative aspect-square bg-gray-100">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-4"
                                  />
                                  {!item.inStock && (
                                    <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                                      Out of Stock
                                    </Badge>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-red-500"
                                  >
                                    <Heart className="h-4 w-4 fill-current" />
                                    <span className="sr-only">Remove from wishlist</span>
                                  </Button>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-medium text-lg">{item.name}</h3>
                                  <div className="mt-2 font-bold text-xl">${item.price.toFixed(2)}</div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={!item.inStock}>
                                  {item.inStock ? "Add to Cart" : "Notify When Available"}
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

