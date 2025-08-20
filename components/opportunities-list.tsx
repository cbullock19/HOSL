'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Truck, Package, CheckCircle } from 'lucide-react'
import { formatDate, formatTime, getDayOfWeek } from '@/lib/utils'
import { QuickSignupModal } from '@/components/quick-signup-modal'
import { quickSignup } from '@/app/actions/quick-signup'
import { toast } from 'sonner'

// Mock data - replace with actual API calls
const mockTasks = [
  {
    id: '1',
    title: 'Morning Food Pick up',
    date: new Date('2024-01-15'),
    startTime: '09:00',
    endTime: '10:00',
    type: 'PICKUP' as const,
    source: 'ShopRite – Chester',
    address: '123 Main St, Chester, NJ',
    capacity: 2,
    claimed: 1,
    status: 'OPEN' as const,
  },
  {
    id: '2',
    title: 'Food Delivery to Pantry',
    date: new Date('2024-01-15'),
    startTime: '14:00',
    endTime: '15:00',
    type: 'DELIVERY' as const,
    recipient: 'Hands of St. Luke Pantry',
    address: '456 Oak Ave, Long Valley, NJ',
    capacity: 1,
    claimed: 0,
    status: 'OPEN' as const,
  },
  {
    id: '3',
    title: 'Afternoon Pick up',
    date: new Date('2024-01-16'),
    startTime: '15:00',
    endTime: '16:00',
    type: 'PICKUP' as const,
    source: 'Stop & Shop – Mansfield',
    address: '789 Pine St, Mansfield, NJ',
    capacity: 1,
    claimed: 0,
    status: 'OPEN' as const,
  },
  {
    id: '4',
    title: 'Evening Delivery',
    date: new Date('2024-01-16'),
    startTime: '18:00',
    endTime: '19:00',
    type: 'DELIVERY' as const,
    recipient: 'Long Valley Community Assistance',
    address: '321 Elm St, Long Valley, NJ',
    capacity: 2,
    claimed: 1,
    status: 'OPEN' as const,
  },
]

export function OpportunitiesList() {
  const [claimedTasks, setClaimedTasks] = useState<Set<string>>(new Set())
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClaim = (task: any) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleQuickSignup = async (data: any) => {
    try {
      const result = await quickSignup(data)
      if (result.success) {
        toast.success('Successfully signed up for the task!')
        // Update the claimed state
        setClaimedTasks(prev => new Set(Array.from(prev).concat(data.taskId)))
      } else {
        toast.error(result.error || 'Signup failed')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const isClaimed = (taskId: string) => claimedTasks.has(taskId)

  return (
    <div className="space-y-4">
      {mockTasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant={task.type === 'PICKUP' ? 'default' : 'secondary'}>
                    {task.type === 'PICKUP' ? (
                      <Package className="w-3 h-3 mr-1" />
                    ) : (
                      <Truck className="w-3 h-3 mr-1" />
                    )}
                    {task.type === 'PICKUP' ? 'Pick up' : 'Delivery'}
                  </Badge>
                  <Badge variant="outline">
                    {task.claimed}/{task.capacity} spots
                  </Badge>
                  {task.status === 'OPEN' && (
                    <Badge variant="default" className="bg-green-600">
                      Available
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDate(task.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{formatTime(task.startTime)} - {formatTime(task.endTime)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">
                    {task.type === 'PICKUP' ? task.source : task.recipient}
                  </span>
                </div>
                <div className="text-sm text-gray-500 ml-6">
                  {task.address}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {task.capacity - task.claimed > 0 
                  ? `${task.capacity - task.claimed} spot${task.capacity - task.claimed > 1 ? 's' : ''} available`
                  : 'All spots filled'
                }
              </div>
              
              <Button
                onClick={() => handleClaim(task)}
                disabled={task.capacity === task.claimed}
                className={`min-w-[140px] ${
                  isClaimed(task.id)
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isClaimed(task.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Signed Up!
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4 mr-2" />
                    Quick Signup
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {mockTasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">No tasks available</h3>
              <p>Check back later for new volunteer opportunities</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Quick Signup Modal */}
      <QuickSignupModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
        }}
        onSignup={handleQuickSignup}
      />
    </div>
  )
}
