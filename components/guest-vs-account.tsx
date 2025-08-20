'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Star, TrendingUp, Award, Clock } from 'lucide-react'
import Link from 'next/link'

export function GuestVsAccount() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Guest Experience */}
      <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
          <CardTitle className="text-xl text-gray-700">Quick & Simple</CardTitle>
          <CardDescription className="text-gray-600">
            Perfect for occasional volunteers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Sign up in 30 seconds</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">No password to remember</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Email reminders & confirmations</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Instant task confirmation</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <Badge variant="outline" className="w-full justify-center py-2">
              Current Status: Guest User
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Account Experience */}
      <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <Star className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl text-blue-900">Full Experience</CardTitle>
          <CardDescription className="text-blue-700">
            Track your impact & earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-900">Everything from Quick Signup</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-900">Complete volunteer history</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-900">Earn badges & achievements</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-900">Personalized opportunities</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-900">Progress tracking & stats</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-blue-100">
            <Link href="/signup" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade to Account
              </Button>
            </Link>
            <p className="text-xs text-blue-600 text-center mt-2">
              Free • 2-minute setup • All data transfers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
