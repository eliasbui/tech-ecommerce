"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight, Info, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

export default function ShippingPage() {
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate delivery dates based on shipping method
  const today = new Date();
  const deliveryDates = {
    standard: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    express: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    sameDay: new Date(today.setHours(20, 0, 0, 0)), // Today at 8 PM
  };

  // Calculate time left until delivery
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate =
        deliveryDates[selectedShipping as keyof typeof deliveryDates];
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [selectedShipping]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Mock cart items
  const cartItems = [
    {
      id: "1",
      name: "Ultra Slim Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
    {
      id: "2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCosts = {
    standard: 9.99,
    express: 19.99,
    sameDay: 29.99,
  };
  const tax = subtotal * 0.08;
  const total =
    subtotal +
    shippingCosts[selectedShipping as keyof typeof shippingCosts] +
    tax;

  const handleContinue = () => {
    toast({
      title: "Shipping method selected",
      description: `Your order will be delivered via ${selectedShipping} shipping.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">Shipping</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Shipping Method</CardTitle>
                <CardDescription>
                  Choose how you want your order delivered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="standard"
                  value={selectedShipping}
                  onValueChange={setSelectedShipping}
                  className="space-y-4"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-md"
                      animate={{
                        backgroundColor:
                          selectedShipping === "standard"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(0, 0, 0, 0)",
                        borderColor:
                          selectedShipping === "standard"
                            ? "rgba(59, 130, 246, 0.5)"
                            : "rgba(0, 0, 0, 0)",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ border: "1px solid" }}
                    />
                    <div className="relative flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label
                        htmlFor="standard"
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Truck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-500">
                              Delivery by {formatDate(deliveryDates.standard)}
                            </p>
                          </div>
                        </div>
                        <div className="font-medium">$9.99</div>
                      </Label>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-md"
                      animate={{
                        backgroundColor:
                          selectedShipping === "express"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(0, 0, 0, 0)",
                        borderColor:
                          selectedShipping === "express"
                            ? "rgba(59, 130, 246, 0.5)"
                            : "rgba(0, 0, 0, 0)",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ border: "1px solid" }}
                    />
                    <div className="relative flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="express" id="express" />
                      <Label
                        htmlFor="express"
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">
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
                              className="h-5 w-5 text-blue-600"
                            >
                              <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                              <polygon points="12 15 17 21 7 21 12 15" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Express Shipping</p>
                              <Badge className="bg-blue-600">Recommended</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Delivery by {formatDate(deliveryDates.express)}
                            </p>
                          </div>
                        </div>
                        <div className="font-medium">$19.99</div>
                      </Label>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-md"
                      animate={{
                        backgroundColor:
                          selectedShipping === "sameDay"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(0, 0, 0, 0)",
                        borderColor:
                          selectedShipping === "sameDay"
                            ? "rgba(59, 130, 246, 0.5)"
                            : "rgba(0, 0, 0, 0)",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ border: "1px solid" }}
                    />
                    <div className="relative flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="sameDay" id="sameDay" />
                      <Label
                        htmlFor="sameDay"
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">
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
                              className="h-5 w-5 text-blue-600"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Same-Day Delivery</p>
                              <Badge className="bg-green-600">Fastest</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Delivery today by 8:00 PM
                            </p>
                          </div>
                        </div>
                        <div className="font-medium">$29.99</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">
                    Estimated Delivery
                  </h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Expected Delivery Date
                            </p>
                            <p className="text-xl font-bold text-blue-600">
                              {formatDate(
                                deliveryDates[
                                  selectedShipping as keyof typeof deliveryDates
                                ]
                              )}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Info className="h-3 w-3" />
                              {selectedShipping === "sameDay"
                                ? "Order within 2 hours to ensure same-day delivery"
                                : "Delivery times are estimates and not guaranteed"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <p className="text-sm text-gray-500 mb-2">
                            Time until delivery:
                          </p>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="flex flex-col items-center">
                              <motion.div
                                key={`days-${timeLeft.days}`}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-blue-600 text-white rounded-md w-12 h-10 flex items-center justify-center text-lg font-bold"
                              >
                                {formatTime(timeLeft.days)}
                              </motion.div>
                              <span className="text-xs mt-1">Days</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <motion.div
                                key={`hours-${timeLeft.hours}`}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-blue-600 text-white rounded-md w-12 h-10 flex items-center justify-center text-lg font-bold"
                              >
                                {formatTime(timeLeft.hours)}
                              </motion.div>
                              <span className="text-xs mt-1">Hours</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <motion.div
                                key={`minutes-${timeLeft.minutes}`}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-blue-600 text-white rounded-md w-12 h-10 flex items-center justify-center text-lg font-bold"
                              >
                                {formatTime(timeLeft.minutes)}
                              </motion.div>
                              <span className="text-xs mt-1">Mins</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <motion.div
                                key={`seconds-${timeLeft.seconds}`}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-blue-600 text-white rounded-md w-12 h-10 flex items-center justify-center text-lg font-bold"
                              >
                                {formatTime(timeLeft.seconds)}
                              </motion.div>
                              <span className="text-xs mt-1">Secs</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/cart">Back to Cart</Link>
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleContinue}
                  asChild
                >
                  <Link href="/checkout">
                    Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 rounded-md border bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>
                      $
                      {shippingCosts[
                        selectedShipping as keyof typeof shippingCosts
                      ].toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Shipping Policy</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      All orders are processed and shipped within 24 hours on
                      business days. Delivery times vary based on the selected
                      shipping method and your location.
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 text-sm"
                    >
                      View Full Shipping Policy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
