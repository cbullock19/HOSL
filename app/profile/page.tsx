'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Edit, Save, X, Trophy, Star, Heart, Award } from 'lucide-react'
import { toast } from 'sonner'

// Mock user data - replace with actual API calls
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  role: 'VOLUNTEER',
  volunteerProfile: {
    totalTasks: 15,
    totalPounds: 450,
    totalMiles: 120,
    currentStreak: 3,
    badges: ['First Task', 'Week Warrior', 'Mile Master'],
    achievements: [
      { name: 'Task Master', progress: 15, target: 20, description: 'Complete 20 tasks' },
      { name: 'Weight Lifter', progress: 450, target: 500, description: 'Deliver 500 pounds of food' },
      { name: 'Road Warrior', progress: 120, target: 200, description: 'Drive 200 miles for deliveries' }
    ]
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  })

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    })
  }

  const handleSave = async () => {
    try {
      // TODO: Implement actual API call to update profile
      setUser(prev => ({
        ...prev,
        ...editData
      }))
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your volunteer profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Profile Information</CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled
                        className="mt-1 bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">First Name</Label>
                        <p className="text-lg">{user.firstName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                        <p className="text-lg">{user.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p className="text-lg">{user.phone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Volunteer Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Volunteer Statistics</CardTitle>
                <CardDescription>Your contribution to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user.volunteerProfile.totalTasks}</div>
                    <div className="text-sm text-gray-600">Total Tasks</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{user.volunteerProfile.totalPounds}</div>
                    <div className="text-sm text-gray-600">Pounds Delivered</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{user.volunteerProfile.totalMiles}</div>
                    <div className="text-sm text-gray-600">Miles Driven</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{user.volunteerProfile.currentStreak}</div>
                    <div className="text-sm text-gray-600">Week Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Achievements & Progress</CardTitle>
                <CardDescription>Track your goals and milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.volunteerProfile.achievements.map((achievement, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <span className="text-sm text-gray-500">
                        {achievement.progress} / {achievement.target}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Badges Earned</CardTitle>
                <CardDescription>Your volunteer accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.volunteerProfile.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
