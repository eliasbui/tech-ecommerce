"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description:
          "We've received your message and will get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How Can We Help You?
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Our support team is here to assist you with any questions or
                  issues you may have.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-md"
              >
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-300" />
                  <Input
                    type="search"
                    placeholder="Search our knowledge base..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus-visible:ring-blue-300"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                className="col-span-1"
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Contact Methods</CardTitle>
                    <CardDescription>
                      Choose how you'd like to get in touch with us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone Support</h3>
                        <p className="text-sm text-gray-500">
                          Available Mon-Fri, 9am-5pm
                        </p>
                        <p className="text-sm font-medium mt-1">
                          +1 (800) 123-4567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-gray-500">
                          We'll respond within 24 hours
                        </p>
                        <p className="text-sm font-medium mt-1">
                          support@techhub.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Live Chat</h3>
                        <p className="text-sm text-gray-500">
                          Chat with our support team
                        </p>
                        <Button
                          variant="link"
                          className="text-sm p-0 h-auto mt-1 text-blue-600"
                        >
                          Start a chat session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View all support options
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.1 }}
                className="col-span-1 md:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is your inquiry about?"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your issue or question in detail"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  Find answers to our most commonly asked questions.
                </p>
              </div>
            </div>

            <Tabs defaultValue="orders" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I track my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can track your order by logging into your account and
                      visiting the "Order History" section. Alternatively, you
                      can use the tracking number provided in your shipping
                      confirmation email to track your package on the carrier's
                      website.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Can I modify or cancel my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can modify or cancel your order within 1 hour of
                      placing it. After that, the order may have already been
                      processed for shipping. Please contact our customer
                      support team as soon as possible if you need to make
                      changes to your order.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards (Visa, Mastercard,
                      American Express, Discover), PayPal, Apple Pay, and Google
                      Pay. We also offer financing options through Affirm for
                      eligible purchases.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How can I get an invoice for my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      An invoice is automatically sent to your email address
                      when your order is confirmed. You can also download a copy
                      of your invoice by logging into your account and visiting
                      the "Order History" section.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How long will it take to receive my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      Standard shipping typically takes 3-5 business days.
                      Expedited shipping options are available at checkout for
                      faster delivery. Please note that delivery times may be
                      affected by customs clearance for international orders.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Do you ship internationally?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to most countries worldwide. International
                      shipping rates and delivery times vary by location. Please
                      note that customers are responsible for any customs fees
                      or import taxes that may apply.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Is free shipping available?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer free standard shipping on all orders over $50
                      within the continental United States. Free shipping
                      promotions may be available for international orders
                      during special sales events.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      What if my package is lost or damaged?
                    </AccordionTrigger>
                    <AccordionContent>
                      If your package is lost or damaged during transit, please
                      contact our customer support team within 7 days of the
                      expected delivery date. We'll work with the shipping
                      carrier to resolve the issue and arrange for a replacement
                      or refund.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="returns" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What is your return policy?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer a 30-day return policy for most products. Items
                      must be in their original condition with all packaging and
                      accessories. Some products, such as software and
                      personalized items, may not be eligible for return.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How do I initiate a return?
                    </AccordionTrigger>
                    <AccordionContent>
                      To initiate a return, log into your account and visit the
                      "Order History" section. Select the order containing the
                      item you wish to return and follow the return
                      instructions. You can also contact our customer support
                      team for assistance.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How long does it take to process a refund?
                    </AccordionTrigger>
                    <AccordionContent>
                      Once we receive your returned item, it typically takes 3-5
                      business days to process the refund. The funds may take an
                      additional 5-10 business days to appear in your account,
                      depending on your payment method and financial
                      institution.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do you offer exchanges?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer exchanges for items of equal or lesser
                      value. If you wish to exchange for an item of greater
                      value, you'll need to pay the difference. To request an
                      exchange, follow the same process as initiating a return
                      and select "Exchange" instead of "Return."
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="technical" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I reset my password?
                    </AccordionTrigger>
                    <AccordionContent>
                      To reset your password, click on the "Forgot Password"
                      link on the login page. Enter the email address associated
                      with your account, and we'll send you a password reset
                      link. Follow the instructions in the email to create a new
                      password.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      What should I do if a product is defective?
                    </AccordionTrigger>
                    <AccordionContent>
                      If you receive a defective product, please contact our
                      customer support team within 14 days of delivery. We'll
                      help troubleshoot the issue and arrange for a replacement
                      or refund if necessary. For products under manufacturer
                      warranty, we can also help you contact the manufacturer
                      for warranty service.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Do you offer technical support for products?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer basic technical support for all products
                      purchased from our store. For more complex issues, we may
                      refer you to the manufacturer's technical support team.
                      Many of our products also include access to online
                      resources, user manuals, and troubleshooting guides.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      How do I update my device's firmware or software?
                    </AccordionTrigger>
                    <AccordionContent>
                      Firmware and software updates vary by product and
                      manufacturer. Generally, you can find the latest updates
                      on the manufacturer's website or through the device's
                      built-in update feature. We recommend regularly checking
                      for updates to ensure optimal performance and security.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button
                asChild
                variant="outline"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Link href="/support/faq">
                  View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Self-Service Support
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
                  Find answers and solutions with our helpful resources.
                </p>
              </div>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <motion.div variants={item}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LifeBuoy className="h-5 w-5 mr-2 text-blue-600" />
                      Knowledge Base
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Browse our comprehensive collection of articles,
                      tutorials, and guides to find answers to your questions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/support/knowledge-base">
                        Browse Articles
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
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
                        className="h-5 w-5 mr-2 text-blue-600"
                      >
                        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      </svg>
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Watch step-by-step video tutorials on how to set up, use,
                      and troubleshoot your products.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/support/tutorials">Watch Tutorials</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
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
                        className="h-5 w-5 mr-2 text-blue-600"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      User Manuals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Download user manuals, quick start guides, and technical
                      specifications for your products.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/support/manuals">Download Manuals</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Customer support team"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  We're Here to Help
                </h2>
                <p className="text-gray-600">
                  Our dedicated support team is committed to providing
                  exceptional service and resolving your issues quickly and
                  efficiently.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span>24/7 customer support for urgent issues</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span>Knowledgeable technical support specialists</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span>Multiple support channels for your convenience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span>Comprehensive self-service resources</span>
                  </li>
                </ul>
                <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Link href="#contact-form">Contact Us Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
