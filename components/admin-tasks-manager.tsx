'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Plus, Copy, Package, Truck } from 'lucide-react'

// Mock data
const mockSources = [
  { id: '1', name: 'ShopRite – Chester' },
  { id: '2', name: 'Weis – Hackettstown' },
  { id: '3', name: 'Stop & Shop – Mansfield' },
]

const mockRecipients = [
  { id: '1', name: 'Hands of St. Luke Pantry' },
  { id: '2', name: 'Long Valley Community Assistance' },
  { id: '3', name: 'Mt. Olive Food Bank' },
]

const mockWeeklyTasks = [
  {
    id: '1',
    title: 'Monday Morning Pick up',
    day: 'Monday',
    time: '09:00-10:00',
    type: 'PICKUP',
    location: 'ShopRite – Chester',
    capacity: 2,
    filled: 1,
    status: 'OPEN',
  },
  {
    id: '2',
    title: 'Tuesday Delivery',
    day: 'Tuesday',
    time: '14:00-15:00',
    type: 'DELIVERY',
    location: 'Hands of St. Luke Pantry',
    capacity: 1,
    filled: 0,
    status: 'OPEN',
  },
  {
    id: '3',
    title: 'Wednesday Pick up',
    day: 'Wednesday',
    time: '09:00-10:00',
    type: 'PICKUP',
    location: 'Stop & Shop – Mansfield',
    capacity: 2,
    filled: 2,
    status: 'FILLED',
  },
  {
    id: '4',
    title: 'Thursday Delivery',
    day: 'Thursday',
    time: '14:00-15:00',
    type: 'DELIVERY',
    location: 'Long Valley Community Assistance',
    capacity: 1,
    filled: 1,
    status: 'FILLED',
  },
]

export function AdminTasksManager() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    day: '',
    startTime: '',
    endTime: '',
    type: '',
    sourceId: '',
    recipientId: '',
    capacity: 1,
  })

  const handleCreateTask = () => {
    // Handle task creation
    console.log('Creating task:', newTask)
    setShowCreateForm(false)
    setNewTask({
      title: '',
      day: '',
      startTime: '',
      endTime: '',
      type: '',
      sourceId: '',
      recipientId: '',
      capacity: 1,
    })
  }

  const duplicateLastWeek = () => {
    // Handle duplicating last week's schedule
    console.log('Duplicating last week')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Badge className="bg-green-600">Open</Badge>
      case 'FILLED':
        return <Badge className="bg-blue-600">Filled</Badge>
      case 'DONE':
        return <Badge className="bg-gray-600">Done</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Task
            </Button>
            <Button
              onClick={duplicateLastWeek}
              variant="outline"
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Last Week
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Manage Locations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Task Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Morning Food Pickup"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select value={newTask.day} onValueChange={(value) => setNewTask({ ...newTask, day: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newTask.startTime}
                  onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newTask.endTime}
                  onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Task Type</Label>
                <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Volunteer Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={newTask.capacity}
                  onChange={(e) => setNewTask({ ...newTask, capacity: parseInt(e.target.value) })}
                />
              </div>

              {newTask.type === 'pickup' && (
                <div className="space-y-2">
                  <Label htmlFor="source">Pickup Location</Label>
                  <Select value={newTask.sourceId} onValueChange={(value) => setNewTask({ ...newTask, sourceId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {newTask.type === 'delivery' && (
                <div className="space-y-2">
                  <Label htmlFor="recipient">Delivery Location</Label>
                  <Select value={newTask.recipientId} onValueChange={(value) => setNewTask({ ...newTask, recipientId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRecipients.map((recipient) => (
                        <SelectItem key={recipient.id} value={recipient.id}>
                          {recipient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700">
                Create Task
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWeeklyTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
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
                        {getStatusBadge(task.status)}
                      </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {task.filled}/{task.capacity} filled
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{task.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{task.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    View Signups
                  </Button>
                  <Button size="sm" variant="outline">
                    Duplicate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
