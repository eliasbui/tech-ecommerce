'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CookiePolicy() {
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

      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-lg">
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit our website.
            They help us provide you with a better experience by enabling us to monitor which pages you find useful
            and which you do not.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6">
            <li>Essential cookies: Required for the website to function properly</li>
            <li>Performance cookies: Help us understand how visitors interact with our website</li>
            <li>Functionality cookies: Remember your preferences and settings</li>
            <li>Targeting cookies: Used to deliver relevant advertisements</li>
            <li>Analytics cookies: Help us understand how our website is being used</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as
            security, network management, and accessibility.
          </p>

          <h3 className="text-xl font-medium mb-2">Analytics Cookies</h3>
          <p className="mb-4">
            We use analytics cookies to help us understand how visitors interact with our website. This helps us
            improve our website and provide better service.
          </p>

          <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
          <p className="mb-4">
            These cookies are used to track visitors across websites. The intention is to display ads that are
            relevant and engaging for individual users.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed. However, if you do this, you
            may have to manually adjust some preferences every time you visit a site and some services and
            functionalities may not work.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
          <p>
            We use services from third parties that may also set cookies on your device. These include:
          </p>
          <ul className="list-disc pl-6">
            <li>Google Analytics</li>
            <li>Social media platforms</li>
            <li>Payment processors</li>
            <li>Advertising networks</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
            updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at:
            <br />
            Email: privacy@techhub.com
          </p>
        </section>
      </div>
    </div>
  );
}
