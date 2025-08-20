'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Calendar, Users, BarChart3, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { getOrgDisplayName } from '@/lib/org'
import { useAuth } from '@/contexts/auth-context'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Opportunities', href: '/opportunities', icon: Calendar },
  { name: 'How It Works', href: '/confirm', icon: Settings },
  { name: 'About', href: '/about', icon: BarChart3 },
]

const adminNavigation = [
  { name: 'Tasks', href: '/admin/tasks', icon: Calendar },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
]

const setupNavigation = [
  { name: 'Admin Setup', href: '/admin-setup', icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAdminPage = pathname?.startsWith('/admin')
  const { user, loading, isAdmin } = useAuth()
  const isAuthenticated = !!user

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            {/* St. Luke Logo */}
            <img 
              src="/st-luke-logo.webp" 
              alt="St. Luke Logo" 
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain flex-shrink-0"
            />
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
            
            {/* Dashboard & Profile - Only show when signed in */}
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    pathname === '/dashboard'
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  href="/profile"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    pathname === '/profile'
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </>
            )}
            
            {isAdminPage && isAdmin && adminNavigation.map((item) => {
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
            
            {/* Show setup navigation when no admin exists */}
            {!isAdmin && setupNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-100 text-orange-700 shadow-sm'
                      : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
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
            {!isAuthenticated ? (
              <Link href="/login">
                <Button variant="outline" size="sm" className="px-4 py-2">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-4 py-2">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Auth Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            {!isAuthenticated ? (
              <Link href="/login">
                <Button variant="outline" size="sm" className="px-3 py-2 text-sm">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm">
                  Dashboard
                </Button>
              </Link>
            )}
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
              
              {isAdminPage && isAdmin && (
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
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
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
              
              {/* Show setup navigation when no admin exists */}
              {!isAdmin && (
                <>
                  <div className="pt-2 pb-1">
                    <div className="px-4 text-xs font-semibold text-orange-500 uppercase tracking-wider">
                      Setup
                    </div>
                  </div>
                  {setupNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-orange-100 text-orange-700'
                            : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
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
