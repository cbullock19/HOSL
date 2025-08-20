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
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            {/* Logo placeholder - replace with your St. Luke logo */}
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-bold">SL</span>
            </div>
            <span className="text-base lg:text-lg font-bold text-gray-900 hidden sm:block">{getOrgDisplayName()}</span>
            <span className="text-sm font-bold text-gray-900 sm:hidden">HOSL</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Tablet Navigation - Visible on md, hidden on mobile and lg+ */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {navigation.slice(0, 3).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="px-4 py-2">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-4 py-2">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Auth Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="px-3 py-2 text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm">
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
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {isAdminPage && (
                <>
                  <div className="pt-2 pb-1">
                    <div className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </div>
                  </div>
                  {adminNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </>
              )}
            </div>
            
            <div className="pt-4 border-t mt-4 space-y-3 px-4">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full py-3" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3" onClick={() => setIsMobileMenuOpen(false)}>
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
