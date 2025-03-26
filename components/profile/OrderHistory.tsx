'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define order status types and their corresponding colors
const OrderStatus = {
  PENDING: { label: '🟠 Chờ xác nhận', color: 'bg-orange-500' },
  PROCESSING: { label: '🏬 Đang xử lý', color: 'bg-blue-500' },
  SHIPPING: { label: '🚛 Đang giao hàng', color: 'bg-yellow-500' },
  DELIVERED: { label: '✅ Đã giao', color: 'bg-green-500' },
  CANCELLED: { label: '❌ Đã hủy', color: 'bg-red-500' },
} as const;

type OrderStatusType = keyof typeof OrderStatus;

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: Date;
  status: OrderStatusType;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  shipping: {
    recipient: string;
    phone: string;
    address: string;
    carrier: string;
  };
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'THS202403250001',
    date: new Date('2024-03-25T14:30:00'),
    status: 'SHIPPING',
    items: [
      {
        id: '1',
        name: 'Laptop ASUS ROG Strix G15',
        price: 14500000,
        quantity: 1,
        image: '/images/products/laptop-asus.jpg',
      },
      {
        id: '2',
        name: 'Chuột Logitech G Pro X Superlight',
        price: 550000,
        quantity: 1,
        image: '/images/products/mouse-logitech.jpg',
      },
    ],
    total: 15050000,
    paymentMethod: 'Ví ShopeePay',
    shipping: {
      recipient: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      carrier: 'Giao hàng tiết kiệm',
    },
  },
  // Add more mock orders as needed
];

export function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  // Filter orders based on search query
  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const renderOrderList = (orders: Order[]) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-gray-500 mb-6">Không tìm thấy đơn hàng phù hợp với tìm kiếm của bạn.</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Xóa tìm kiếm
          </Button>
        </div>
      );
    }

    return orders.map((order) => (
      <motion.div key={order.id} variants={item}>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="font-medium">Đơn hàng #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {format(order.date, 'dd/MM/yyyy - HH:mm')}
                </p>
              </div>
              <Badge className={OrderStatus[order.status].color}>
                {OrderStatus[order.status].label}
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-20 w-20 relative rounded-md border bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    <p className="font-medium">{formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Thông tin thanh toán</h4>
                <p className="text-sm text-gray-500">Phương thức: {order.paymentMethod}</p>
                <p className="font-bold mt-1">Tổng tiền: {formatCurrency(order.total)}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Thông tin vận chuyển</h4>
                <div className="text-sm text-gray-500">
                  <p>{order.shipping.recipient}</p>
                  <p>{order.shipping.phone}</p>
                  <p>{order.shipping.address}</p>
                  <p>Đơn vị vận chuyển: {order.shipping.carrier}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => handleTrackOrder(order)}
              >
                📦 Theo dõi đơn hàng
              </Button>
              {order.status === 'DELIVERED' && (
                <Button variant="outline">
                  ⭐ Đánh giá sản phẩm
                </Button>
              )}
              {['PENDING', 'PROCESSING'].includes(order.status) && (
                <Button variant="outline" className="text-red-500 hover:text-red-700">
                  ✏ Hủy đơn hàng
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Lịch sử đơn hàng</CardTitle>
              <CardDescription>Xem và quản lý các đơn hàng của bạn</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Tìm kiếm đơn hàng..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-5">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
              <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
              <TabsTrigger value="shipping">Đang giao</TabsTrigger>
              <TabsTrigger value="delivered">Đã giao</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {renderOrderList(filteredOrders)}
              </motion.div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {renderOrderList(filteredOrders.filter(order => order.status === 'PENDING'))}
              </motion.div>
            </TabsContent>

            <TabsContent value="processing" className="mt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {renderOrderList(filteredOrders.filter(order => order.status === 'PROCESSING'))}
              </motion.div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {renderOrderList(filteredOrders.filter(order => order.status === 'SHIPPING'))}
              </motion.div>
            </TabsContent>

            <TabsContent value="delivered" className="mt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {renderOrderList(filteredOrders.filter(order => order.status === 'DELIVERED'))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Theo dõi đơn hàng #{selectedOrder.id}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTrackingModal(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <div>
                    <p className="font-medium">Đơn hàng đã rời kho</p>
                    <p className="text-sm text-gray-500">25/03/2024 - 10:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <div>
                    <p className="font-medium">Đang giao đến bạn</p>
                    <p className="text-sm text-gray-500">25/03/2024 - 14:30</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
