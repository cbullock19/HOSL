'use client'

import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Lock, ArrowRight, Star } from 'lucide-react'

interface AuthGateProps {
  children: React.ReactNode
  title: string
  description: string
  requireAuth?: boolean
}

export function AuthGate({ children, title, description, requireAuth = true }: AuthGateProps) {
  const { user, loading } = useAuth()
  const isAuthenticated = !!user

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!requireAuth || isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Create Account Card */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-900">Create Your Account</CardTitle>
              <CardDescription className="text-blue-700">
                Get started with a free volunteer profile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span>Track your volunteer impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span>Earn badges and achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span>Manage your schedule</span>
                </div>
              </div>
              <Link href="/signup" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sign In Card */}
          <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <CardTitle className="text-xl text-gray-700">Already Have an Account?</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access your volunteer profile
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>Access your dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>View your volunteer history</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>Update your preferences</span>
                </div>
              </div>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Signup Reminder */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-900 mb-2">💡 Want to volunteer right now?</h3>
            <p className="text-green-800 mb-4">
              You can still sign up for tasks without an account! Head to our opportunities page to get started immediately.
            </p>
            <Link href="/opportunities">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                Browse Opportunities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
