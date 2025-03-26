'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PointsHistory {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}

const mockPointsHistory: PointsHistory[] = [
  {
    id: '1',
    date: '25/03/2024',
    description: 'Mua Laptop ASUS ROG Strix G15',
    points: 1450,
    type: 'earned',
  },
  {
    id: '2',
    date: '20/03/2024',
    description: 'Đổi voucher giảm giá 200.000đ',
    points: -200,
    type: 'redeemed',
  },
  {
    id: '3',
    date: '15/03/2024',
    description: 'Mua Chuột Logitech G Pro X',
    points: 289,
    type: 'earned',
  },
];

export function LoyaltyPoints() {
  const currentPoints = 1539;
  const nextTier = 2000;
  const progress = (currentPoints / nextTier) * 100;
  const membershipTier = 'Gold Member';

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Điểm thưởng TechHub</CardTitle>
          <CardDescription>Tích điểm và đổi ưu đãi hấp dẫn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Badge className="mb-2">{membershipTier}</Badge>
            <h2 className="text-4xl font-bold mb-2">{currentPoints}</h2>
            <p className="text-sm text-gray-500">điểm thưởng khả dụng</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Tiến độ lên hạng Platinum</span>
              <span>{currentPoints}/{nextTier} điểm</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500">
              Còn {nextTier - currentPoints} điểm nữa để lên hạng Platinum
            </p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">Đổi ưu đãi</Button>
            <Button variant="outline" className="flex-1">Xem ưu đãi khả dụng</Button>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Đặc quyền thành viên {membershipTier}</CardTitle>
          <CardDescription>Tận hưởng các ưu đãi đặc biệt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                ⭐
              </div>
              <div>
                <h3 className="font-medium">Tích điểm x2</h3>
                <p className="text-sm text-gray-500">Nhận gấp đôi điểm thưởng cho mọi đơn hàng</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                🎁
              </div>
              <div>
                <h3 className="font-medium">Quà sinh nhật</h3>
                <p className="text-sm text-gray-500">Nhận voucher đặc biệt vào tháng sinh nhật</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                🚚
              </div>
              <div>
                <h3 className="font-medium">Miễn phí vận chuyển</h3>
                <p className="text-sm text-gray-500">Cho mọi đơn hàng từ 500.000đ</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử điểm thưởng</CardTitle>
          <CardDescription>Xem lịch sử tích lũy và sử dụng điểm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPointsHistory.map((history) => (
              <div key={history.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{history.description}</p>
                    <p className="text-sm text-gray-500">{history.date}</p>
                  </div>
                  <span className={`font-bold ${history.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                    {history.type === 'earned' ? '+' : '-'}{history.points}
                  </span>
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
