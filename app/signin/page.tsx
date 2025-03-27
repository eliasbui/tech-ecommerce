"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Github, Loader2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code2FA: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!show2FA) {
        // First step: validate credentials
        // This is where you would make an API call to validate credentials
        setShow2FA(true);
        toast({
          title: "Xác thực 2 lớp",
          description:
            "Vui lòng nhập mã xác thực được gửi đến điện thoại của bạn",
        });
      } else {
        // Second step: validate 2FA code
        // This is where you would make an API call to validate 2FA code
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn trở lại!",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Thông tin đăng nhập không chính xác",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <Link href="/">
              <Button variant="outline" size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardDescription className="text-center">
            {!show2FA
              ? "Login to shop and get great deals"
              : "Get 2FA code to complete login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!show2FA ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link
                      href="/signin/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code2FA">Mã xác thực</Label>
                  <Input
                    id="code2FA"
                    name="code2FA"
                    placeholder="123456"
                    required
                    value={formData.code2FA}
                    onChange={handleChange}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Mã xác thực đã được gửi đến điện thoại của bạn
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Đã gửi lại mã",
                        description: "Vui lòng kiểm tra điện thoại của bạn",
                      });
                    }}
                  >
                    Gửi lại mã
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : show2FA ? (
                "Xác nhận"
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          {!show2FA && (
            <>
              <div className="relative my-6">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-gray-500">
                  hoặc
                </div>
              </div>

              <div className="grid gap-2">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Đăng nhập với Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M9.1 21.371c-5.144 0-9.1-4.156-9.1-9.1 0-5.144 4.156-9.1 9.1-9.1 2.169 0 4.25.821 5.872 2.306l-2.893 2.893c-.945-.945-2.169-1.414-3.379-1.414-2.769 0-5.021 2.252-5.021 5.021s2.252 5.021 5.021 5.021c2.169 0 3.983-1.414 4.644-3.379h-4.644v-3.789h8.023c.126.631.126 1.262.126 1.893 0 5.144-3.694 9.648-8.749 9.648z"
                      fill="#4285F4"
                    />
                  </svg>
                  Đăng nhập với Facebook
                </Button>
              </div>
            </>
          )}
        </CardContent>
        {!show2FA && (
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500 text-center">
              Chưa có tài khoản?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
