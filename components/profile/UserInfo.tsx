'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface UserData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  membershipLevel: string;
}

export function UserInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0912345678',
    avatar: '/images/avatars/default.jpg',
    memberSince: '15/01/2024',
    membershipLevel: 'Gold Member',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Thông tin đã được cập nhật',
      description: 'Thông tin cá nhân của bạn đã được cập nhật thành công.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
            <Badge className="mt-2">{userData.membershipLevel}</Badge>
          </div>

          {isEditing ? (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>
              <Button type="button" onClick={handleSave}>
                Lưu thay đổi
              </Button>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Họ và tên</h3>
                <p>{userData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{userData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                <p>{userData.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ngày tham gia</h3>
                <p>{userData.memberSince}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
