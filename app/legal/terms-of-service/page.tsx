'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function TermsOfService() {
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

      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg">
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using TechHub's website and services, you agree to be bound by these Terms of Service.
            If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily access and use TechHub's website for personal, non-commercial
            transitory viewing only. This license does not include:
          </p>
          <ul className="list-disc pl-6">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose</li>
            <li>Attempting to decompile or reverse engineer any software</li>
            <li>Removing any copyright or other proprietary notations</li>
            <li>Transferring the materials to another person</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information.
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Purchases and Payment</h2>
          <p>
            All purchases made through our website are subject to product availability. We reserve the right to
            discontinue any products at any time for any reason. Prices for our products are subject to change.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
          <p>
            We will make every effort to deliver your products in a timely manner. However, we are not responsible
            for delays beyond our control. Shipping times are estimates and not guaranteed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
          <p>
            Our return policy is subject to the following conditions:
          </p>
          <ul className="list-disc pl-6">
            <li>Items must be returned within 30 days of purchase</li>
            <li>Items must be unused and in original packaging</li>
            <li>Refunds will be processed within 14 business days</li>
            <li>Shipping costs for returns are the responsibility of the customer</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
          <p>
            The materials on TechHub's website are provided on an 'as is' basis. We make no warranties,
            expressed or implied, and hereby disclaim and negate all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@techhub.com
          </p>
        </section>
      </div>
    </div>
  );
}
