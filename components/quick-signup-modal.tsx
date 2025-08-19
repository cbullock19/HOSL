'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Calendar, Clock, MapPin, Package, Truck } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

interface Task {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  type: 'PICKUP' | 'DELIVERY'
  location: string
  address: string
  capacity: number
  claimed: number
}

interface QuickSignupModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
  onSignup: (data: QuickSignupData) => Promise<void>
}

interface QuickSignupData {
  firstName: string
  lastName: string
  email: string
  phone: string
  taskId: string
}

export function QuickSignupModal({ task, isOpen, onClose, onSignup }: QuickSignupModalProps) {
  const [formData, setFormData] = useState<Omit<QuickSignupData, 'taskId'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !task) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSignup({
        ...formData,
        taskId: task.id,
      })
      onClose()
      // Reset form
      setFormData({ firstName: '', lastName: '', email: '', phone: '' })
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const spotsAvailable = task.capacity - task.claimed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">Quick Signup</CardTitle>
          <CardDescription>
            Sign up for this task in just a few seconds
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Task Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-3">{task.title}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{formatDate(task.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{formatTime(task.startTime)} - {formatTime(task.endTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{task.location}</span>
              </div>
              <div className="flex items-center gap-2">
                {task.type === 'PICKUP' ? (
                  <Package className="w-4 h-4 text-gray-500" />
                ) : (
                  <Truck className="w-4 h-4 text-gray-500" />
                )}
                <span>{task.type === 'PICKUP' ? 'Pick up' : 'Delivery'}</span>
              </div>
              <div className="text-blue-600 font-medium">
                {spotsAvailable} spot{spotsAvailable !== 1 ? 's' : ''} available
              </div>
            </div>
          </div>

          {/* Quick Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="mt-1"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
                placeholder="(555) 123-4567"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send you a reminder the day before
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'I can take this task!'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Button variant="link" className="p-0 h-auto text-blue-600">
                Sign in here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
