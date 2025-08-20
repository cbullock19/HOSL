'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Package, Truck, Trophy, Star, Heart, Award, Settings, BarChart3, Users } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

// Mock data - replace with actual API calls
const mockUpcomingTasks = [
  {
    id: '1',
    title: 'Morning Food Pickup',
    date: new Date('2024-01-15'),
    startTime: '09:00',
    endTime: '10:00',
    type: 'PICKUP' as const,
    location: 'ShopRite – Chester',
    status: 'CONFIRMED' as const,
  },
  {
    id: '2',
    title: 'Food Delivery to Pantry',
    date: new Date('2024-01-16'),
    startTime: '14:00',
    endTime: '15:00',
    type: 'DELIVERY' as const,
    location: 'Hands of St. Luke Pantry',
    status: 'PENDING' as const,
  },
  {
    id: '3',
    title: 'Weekend Pick up',
    date: new Date('2024-01-20'),
    startTime: '11:00',
    endTime: '12:00',
    type: 'PICKUP' as const,
    location: 'Stop & Shop – Mansfield',
    status: 'CONFIRMED' as const,
  },
]

const mockRecentActivity = [
  {
    id: '1',
    task: 'Morning Food Pick up',
    date: new Date('2024-01-10'),
    action: 'COMPLETED',
    pounds: 45.5,
    items: 'Bread, produce, canned goods',
  },
  {
    id: '2',
    task: 'Food Delivery',
    date: new Date('2024-01-08'),
    action: 'COMPLETED',
    pounds: 32.0,
    items: 'Dairy, meat, frozen items',
  },
]

const mockVolunteerStats = {
  totalTasks: 47,
  totalPounds: 1247.5,
  totalMiles: 89,
  currentStreak: 3,
  badges: [
    { name: 'First Timer', icon: Star, color: 'bg-yellow-500' },
    { name: 'Food Hero', icon: Heart, color: 'bg-red-500' },
    { name: 'Distance Driver', icon: MapPin, color: 'bg-blue-500' },
    { name: 'Consistent Helper', icon: Award, color: 'bg-green-500' },
  ],
  achievements: [
    { name: '10 Tasks', progress: 47, target: 10, completed: true },
    { name: '100 Pounds', progress: 1247.5, target: 100, completed: true },
    { name: '50 Miles', progress: 89, target: 50, completed: true },
    { name: '5 Week Streak', progress: 3, target: 5, completed: false },
  ]
}

export function VolunteerDashboard() {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({
    '1': 'CONFIRMED',
    '2': 'PENDING',
    '3': 'CONFIRMED',
  })

  const handleConfirm = (taskId: string) => {
    setTaskStatuses(prev => ({
      ...prev,
      [taskId]: 'CONFIRMED'
    }))
  }

  const handleCancel = (taskId: string) => {
    setTaskStatuses(prev => ({
      ...prev,
      [taskId]: 'CANCELLED'
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge className="bg-green-600">Confirmed</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-600">Pending</Badge>
      case 'CANCELLED':
        return <Badge className="bg-red-600">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const totalPounds = mockRecentActivity.reduce((sum, activity) => sum + activity.pounds, 0)
  const totalTasks = mockRecentActivity.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold">{mockVolunteerStats.totalTasks}</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Pounds Delivered</p>
                <p className="text-2xl font-bold">{mockVolunteerStats.totalPounds.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Miles Driven</p>
                <p className="text-2xl font-bold">{mockVolunteerStats.totalMiles}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Week Streak</p>
                <p className="text-2xl font-bold">{mockVolunteerStats.currentStreak}</p>
              </div>
              <Star className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {mockVolunteerStats.badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVolunteerStats.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{achievement.name}</span>
                    <span className="text-sm text-gray-600">
                      {achievement.progress} / {achievement.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        achievement.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ 
                        width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockUpcomingTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(task.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(task.startTime)} - {formatTime(task.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.type === 'PICKUP' ? (
                        <Package className="w-4 h-4" />
                      ) : (
                        <Truck className="w-4 h-4" />
                      )}
                      <span>{task.type === 'PICKUP' ? 'Pick up' : 'Delivery'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusBadge(taskStatuses[task.id])}
                </div>
              </div>

              {taskStatuses[task.id] === 'PENDING' && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleConfirm(task.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancel(task.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}

              {taskStatuses[task.id] === 'CONFIRMED' && (
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancel(task.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}

              {taskStatuses[task.id] === 'CANCELLED' && (
                <div className="text-red-600 text-sm font-medium">
                  Task cancelled
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{activity.task}</h3>
                <Badge className="bg-green-600">Completed</Badge>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(activity.date)}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4" />
                  <span>{activity.pounds} pounds delivered</span>
                </div>
                <div className="text-xs text-gray-500">
                  {activity.items}
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm">View Calendar</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="w-6 h-6 mb-2" />
              <span className="text-sm">Log Food</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="w-6 h-6 mb-2" />
              <span className="text-sm">Update Profile</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm">Set Preferences</span>
            </Button>
          </div>
          
          {/* Admin Quick Actions */}
          {isAdmin && (
            <>
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col bg-blue-50 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push('/admin/tasks')}
                  >
                    <Settings className="w-6 h-6 mb-2 text-blue-600" />
                    <span className="text-sm text-blue-700">Manage Tasks</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col bg-blue-50 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push('/admin/reports')}
                  >
                    <BarChart3 className="w-6 h-6 mb-2 text-blue-600" />
                    <span className="text-sm text-blue-700">View Reports</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col bg-blue-50 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push('/admin/tasks')}
                  >
                    <Trophy className="w-6 h-6 mb-2 text-blue-600" />
                    <span className="text-sm text-blue-700">Invite Admin</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col bg-blue-50 border-blue-200 hover:bg-blue-100"
                    onClick={() => router.push('/admin/tasks')}
                  >
                    <Users className="w-6 h-6 mb-2 text-blue-600" />
                    <span className="text-sm text-blue-700">Manage Users</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
