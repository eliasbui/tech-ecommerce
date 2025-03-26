"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Bell, CreditCard, Edit, Heart, LogOut, MapPin, Package, Settings, ShoppingBag, User, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { UserInfo } from '@/components/profile/UserInfo'
import { OrderHistory } from '@/components/profile/OrderHistory'
import { Wishlist } from '@/components/profile/Wishlist'
import { AccountSettings } from '@/components/profile/AccountSettings'
import { LoyaltyPoints } from '@/components/profile/LoyaltyPoints'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info')

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Trang chủ
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="info" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">Thông tin tài khoản</TabsTrigger>
          <TabsTrigger value="orders">Lịch sử đơn hàng</TabsTrigger>
          <TabsTrigger value="wishlist">Danh sách yêu thích</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt tài khoản</TabsTrigger>
          <TabsTrigger value="points">Điểm thưởng</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="info">
            <UserInfo />
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="wishlist">
            <Wishlist />
          </TabsContent>

          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="points">
            <LoyaltyPoints />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

