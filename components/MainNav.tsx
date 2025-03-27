'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'Support', href: '/support' },
];

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-600">
              TechHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === item.href ? 'text-blue-600' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* User Account */}
          <Link href="/signin" className="hidden md:flex">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Sign In
            </Button>
          </Link>

          {/* Shopping Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-md border pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Sign In */}
              <Link
                href="/signin"
                className="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
