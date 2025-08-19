import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { Calendar, Users, BarChart3, Package, Truck, Bell, Download } from 'lucide-react'
import { getOrgDisplayName } from '@/lib/org'

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="App Examples & Screenshots"
        description={`Explore the different screens and flows in the ${getOrgDisplayName()} volunteer app`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Public Pages */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Public Pages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Home Page</CardTitle>
                  <CardDescription>
                    Welcome screen with app overview and call-to-action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/">
                    <Button className="w-full">View Home Page</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Available Opportunities</CardTitle>
                  <CardDescription>
                    Browse and claim volunteer tasks with filtering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/opportunities">
                    <Button className="w-full">View Opportunities</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Explanation of reminder system and task management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/confirm">
                    <Button className="w-full">View Guide</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Volunteer Experience */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Experience</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle>Volunteer Dashboard</CardTitle>
                  <CardDescription>
                    Personal dashboard with upcoming tasks and activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/dashboard">
                    <Button className="w-full">View Dashboard</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>
                    Confirm, cancel, and complete volunteer tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Accessible from dashboard
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    View in Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle>Food Logging</CardTitle>
                  <CardDescription>
                    Record pounds collected and items delivered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Available after task completion
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Task First
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Admin Experience */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Experience</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>
                    Create weekly schedules and manage tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/tasks">
                    <Button className="w-full">View Task Manager</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                    <BarChart3 className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>
                    View monthly totals and export data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/reports">
                    <Button className="w-full">View Reports</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle>Volunteer Management</CardTitle>
                  <CardDescription>
                    Manage volunteer profiles and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Coming in next release
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Features Demo */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features Demo</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mobile-First Design</CardTitle>
                  <CardDescription>
                    Test the app on mobile devices to see the responsive design
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Large touch targets for easy navigation</li>
                    <li>• Responsive layouts that work on all screen sizes</li>
                    <li>• Mobile-optimized forms and buttons</li>
                    <li>• Touch-friendly date and time pickers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Accessibility Features</CardTitle>
                  <CardDescription>
                    Built with accessibility in mind for older volunteers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Large text mode toggle (top-right corner)</li>
                    <li>• High contrast color scheme</li>
                    <li>• Clear focus states and keyboard navigation</li>
                    <li>• Semantic HTML and ARIA labels</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Explore?</CardTitle>
                <CardDescription className="text-lg">
                  Start with the public pages and work your way through the volunteer and admin experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/opportunities">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Browse Opportunities
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500">
                  Use the navigation menu above to explore different sections
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
