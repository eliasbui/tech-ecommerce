'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'verify' | 'otp' | 'reset'>('verify');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'phone'>('email');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 'verify') {
        // Send OTP to email/phone
        setStep('otp');
        toast({
          title: 'Mã xác thực đã được gửi',
          description: `Vui lòng kiểm tra ${verifyMethod === 'email' ? 'email' : 'điện thoại'} của bạn`,
        });
      } else if (step === 'otp') {
        // Verify OTP
        setStep('reset');
      } else {
        // Reset password
        if (formData.newPassword !== formData.confirmPassword) {
          toast({
            title: 'Lỗi',
            description: 'Mật khẩu không khớp',
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: 'Đặt lại mật khẩu thành công',
          description: 'Vui lòng đăng nhập với mật khẩu mới',
        });
        router.push('/signin');
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
        variant: 'destructive',
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
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <CardTitle className="text-2xl font-bold">Quên mật khẩu</CardTitle>
            </div>
            <Link href="/">
              <Button variant="outline" size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardDescription>
            {step === 'verify' && 'Chọn phương thức xác thực để đặt lại mật khẩu'}
            {step === 'otp' && 'Nhập mã xác thực đã được gửi'}
            {step === 'reset' && 'Tạo mật khẩu mới cho tài khoản của bạn'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'verify' && (
              <Tabs value={verifyMethod} onValueChange={(value) => setVerifyMethod(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Điện thoại</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="space-y-4">
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
                </TabsContent>
                <TabsContent value="phone" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0912345678"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Nhập mã xác thực</Label>
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="123456"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Mã xác thực đã được gửi đến{' '}
                    {verifyMethod === 'email' ? formData.email : formData.phone}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: 'Đã gửi lại mã',
                        description: 'Vui lòng kiểm tra lại',
                      });
                    }}
                  >
                    Gửi lại mã
                  </Button>
                </div>
              </div>
            )}

            {step === 'reset' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.newPassword}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : step === 'verify' ? (
                'Tiếp tục'
              ) : step === 'otp' ? (
                'Xác nhận'
              ) : (
                'Đặt lại mật khẩu'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500 text-center">
            Nhớ mật khẩu?{' '}
            <Link href="/signin" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
