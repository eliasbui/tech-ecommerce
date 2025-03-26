'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl relative">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            At TechHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">Personal Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information</li>
            <li>Order history</li>
          </ul>

          <h3 className="text-xl font-medium mb-2">Non-Personal Information</h3>
          <ul className="list-disc pl-6">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited</li>
            <li>Time spent on website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use the collected information for various purposes, including:</p>
          <ul className="list-disc pl-6">
            <li>Processing your orders and payments</li>
            <li>Sending order confirmations and updates</li>
            <li>Providing customer support</li>
            <li>Improving our website and services</li>
            <li>Sending marketing communications (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@techhub.com
          </p>
        </section>
      </div>
    </div>
  );
}
