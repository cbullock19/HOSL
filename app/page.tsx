import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Truck, BarChart3 } from 'lucide-react'
import { getOrgDisplayName, getParishName, getPublicUrl } from '@/lib/org'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Welcome to Our Volunteer Community
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Join us in making a difference by helping move food from local stores to families in need. 
            Our simple, mobile-friendly platform makes it easy to sign up for tasks and track your impact.
          </p>
          <div className="mt-6">
            <Link href={getPublicUrl()}>
              <Button variant="outline" size="lg">
                About the Pantry
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Easy Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Sign up for weekly pick up and delivery tasks with just one tap
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Volunteer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Track your contributions and manage your volunteer preferences
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Food Logistics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Efficiently manage food collection and delivery operations
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Track Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Track impact with detailed reports and analytics
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join our community of volunteers making a difference in our community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/opportunities">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    View available tasks
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign in to your account
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                New volunteers will be contacted by our team to set up their account
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">{getOrgDisplayName()}</p>
          <p className="text-gray-300">
            Serving our community through volunteer service and food assistance
          </p>
          <div className="mt-4">
            <Link href={getPublicUrl()} className="text-blue-300 hover:text-white underline">
              {getParishName()}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
