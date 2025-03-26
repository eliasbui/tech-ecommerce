'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function AccountSettings() {
  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Bảo mật tài khoản</CardTitle>
          <CardDescription>Quản lý mật khẩu và cài đặt bảo mật</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Mật khẩu</h3>
                <p className="text-sm text-gray-500">Thay đổi lần cuối: 3 tháng trước</p>
              </div>
              <Button variant="outline">
                Đổi mật khẩu
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Xác thực 2 lớp</h3>
                <p className="text-sm text-gray-500">Thêm lớp bảo mật cho tài khoản của bạn</p>
              </div>
              <Button variant="outline">
                Kích hoạt
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Lịch sử đăng nhập</h3>
                <p className="text-sm text-gray-500">Xem hoạt động đăng nhập gần đây</p>
              </div>
              <Button variant="outline">
                Xem lịch sử
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>Quản lý thông báo và cập nhật từ TechHub</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo qua Email</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về đơn hàng và khuyến mãi</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo qua SMS</Label>
                <p className="text-sm text-gray-500">Nhận thông báo về đơn hàng và giao hàng</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo khuyến mãi</Label>
                <p className="text-sm text-gray-500">Nhận thông tin về ưu đãi và khuyến mãi đặc biệt</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Quyền riêng tư</CardTitle>
          <CardDescription>Quản lý quyền riêng tư và dữ liệu cá nhân</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị thông tin cá nhân</Label>
                <p className="text-sm text-gray-500">Cho phép người khác xem thông tin cá nhân của bạn</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lịch sử tìm kiếm</Label>
                <p className="text-sm text-gray-500">Lưu lịch sử tìm kiếm để gợi ý tốt hơn</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div>
              <Button variant="outline" className="text-red-500">
                Xóa tài khoản
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Thao tác này sẽ xóa vĩnh viễn tài khoản và dữ liệu của bạn
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
