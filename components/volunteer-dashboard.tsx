'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Package, Truck } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

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

export function VolunteerDashboard() {
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
    <div className="space-y-6">
      {/* Welcome and Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, Jane!</CardTitle>
          <p className="text-gray-600">
            You have {mockUpcomingTasks.length} upcoming tasks this week
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalPounds.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Pounds Delivered</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{mockUpcomingTasks.length}</div>
              <div className="text-sm text-gray-600">Upcoming Tasks</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Days This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
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
                                          <div className="flex items-center gap-2 mt-1">
                        <Badge variant={task.type === 'PICKUP' ? 'default' : 'secondary'}>
                          {task.type === 'PICKUP' ? (
                            <Package className="w-3 h-3 mr-1" />
                          ) : (
                            <Truck className="w-3 h-3 mr-1" />
                          )}
                          {task.type === 'PICKUP' ? 'Pick up' : 'Delivery'}
                        </Badge>
                        {getStatusBadge(taskStatuses[task.id])}
                      </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
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
                </div>

                {taskStatuses[task.id] === 'PENDING' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleConfirm(task.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
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
                  <h3 className="font-semibold">{activity.task}</h3>
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
      </div>

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
        </CardContent>
      </Card>
    </div>
  )
}
