'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Calendar, Users, BarChart3, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { getOrgDisplayName } from '@/lib/org'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Opportunities', href: '/opportunities', icon: Calendar },
  { name: 'Dashboard', href: '/dashboard', icon: Users },
  { name: 'How It Works', href: '/confirm', icon: Settings },
  { name: 'About', href: '/about', icon: BarChart3 },
  { name: 'Examples', href: '/examples', icon: BarChart3 },
]

const adminNavigation = [
  { name: 'Tasks', href: '/admin/tasks', icon: Calendar },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-900">{getOrgDisplayName()}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {isAdminPage && adminNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {isAdminPage && adminNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
            
            <div className="pt-4 border-t mt-4 space-y-2">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
