'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Laptop ASUS ROG Strix G15',
    price: 14500000,
    image: '/images/products/laptop-asus.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Chuột Logitech G Pro X Superlight',
    price: 2890000,
    image: '/images/products/mouse-logitech.jpg',
    inStock: true,
  },
  {
    id: '3',
    name: 'Bàn phím cơ Keychron K8 Pro',
    price: 3200000,
    image: '/images/products/keyboard-keychron.jpg',
    inStock: false,
  },
];

export function Wishlist() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Danh sách yêu thích</CardTitle>
          <CardDescription>Các sản phẩm bạn đã lưu để mua sau</CardDescription>
        </CardHeader>
        <CardContent>
          {mockWishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Danh sách yêu thích trống</h2>
              <p className="text-gray-500 mb-6">
                Hãy thêm sản phẩm vào danh sách yêu thích để mua sau nhé!
              </p>
              <Button asChild>
                <a href="/products">Xem sản phẩm</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWishlist.map((item) => (
                <Card key={item.id} className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                      />
                      {!item.inStock && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          Hết hàng
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-red-500"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate">{item.name}</h3>
                      <div className="mt-2 font-bold text-xl">{formatCurrency(item.price)}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" disabled={!item.inStock}>
                      {item.inStock ? 'Thêm vào giỏ hàng' : 'Thông báo khi có hàng'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
