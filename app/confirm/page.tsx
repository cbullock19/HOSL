import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { Bell, Calendar, Mail, Smartphone, XCircle, CheckCircle } from 'lucide-react'

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="How It Works"
        description="Learn about our reminder system and how to manage your volunteer commitments"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Reminder System */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Automatic Reminders</CardTitle>
                  <CardDescription className="text-lg">
                    We'll keep you informed about your upcoming tasks
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Weekly Digest</h3>
                  <p className="text-gray-600">
                    Every Sunday at 6 AM, get an email with all open tasks for the week ahead
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Day Before Reminder</h3>
                  <p className="text-gray-600">
                    Receive a reminder at 10 AM the day before your scheduled task
                  </p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">SMS Option</h3>
                  <p className="text-gray-600">
                    Opt in to receive text message reminders for urgent updates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Commitments */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Managing Your Commitments</CardTitle>
                  <CardDescription className="text-lg">
                    How to confirm, complete, or cancel your volunteer tasks
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-green-700">Confirming Tasks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Click "Confirm" when you receive your reminder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>This lets us know you're still available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We'll send you the final details</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-700">Completing Tasks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>After your task, log the pounds of food collected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Add any notes about what was delivered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Track your impact on our community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canceling Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Need to Cancel?</CardTitle>
                  <CardDescription className="text-lg">
                    Life happens - here's how to handle schedule changes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700">
                  Please cancel at least 24 hours in advance when possible. This gives us time to find another volunteer and ensures food doesn't go to waste.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">How to Cancel:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>Go to your dashboard and find the task you need to cancel</li>
                  <li>Click the "Cancel" button next to the task</li>
                  <li>Confirm your cancellation</li>
                  <li>We'll automatically notify our team</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-blue-800 mb-2">Emergency Cancellations</h3>
                <p className="text-blue-700">
                  If you need to cancel last minute due to an emergency, please call our volunteer coordinator at (555) 123-4567.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Need Help?</CardTitle>
              <CardDescription className="text-lg">
                Our team is here to support you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Volunteer Coordinator</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> (555) 123-4567<br />
                    <strong>Email:</strong> volunteer@hosl.org<br />
                    <strong>Hours:</strong> Monday-Friday, 9 AM - 5 PM
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Technical Support</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> support@hosl.org<br />
                    <strong>Response Time:</strong> Within 24 hours<br />
                    <strong>Emergency:</strong> Call coordinator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                View Available Tasks
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="px-8">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
