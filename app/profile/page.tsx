'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Edit, Save, X, Trophy, Star, Heart, Award, Plus, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { AuthGate } from '@/components/auth-gate'
import { useAuth } from '@/contexts/auth-context'

export default function ProfilePage() {
  const { user: authUser, session, clearSession, userRole, isAdmin } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [isAddingPhone, setIsAddingPhone] = useState(false)
  const [newPhone, setNewPhone] = useState('')

  // Extract user data from Supabase Auth
  const userData = authUser?.user_metadata || {}
  const firstName = userData.first_name || 'N/A'
  const lastName = userData.last_name || 'N/A'
  const phone = userData.phone || ''
  const email = authUser?.email || 'N/A'
  const createdAt = authUser?.created_at ? new Date(authUser.created_at) : new Date()

  useEffect(() => {
    setEditData({
      firstName,
      lastName,
      phone,
    })
  }, [firstName, lastName, phone])

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      firstName,
      lastName,
      phone,
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      firstName,
      lastName,
      phone,
    })
  }

  const handleSave = async () => {
    try {
      // TODO: Implement actual API call to update profile in database
      // For now, just show success message
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddPhone = () => {
    setIsAddingPhone(true)
    setNewPhone('')
  }

  const handleSavePhone = async () => {
    if (!newPhone.trim()) {
      toast.error('Please enter a phone number')
      return
    }
    
    try {
      // TODO: Implement actual API call to update phone in database
      toast.success('Phone number added successfully!')
      setIsAddingPhone(false)
      // Refresh user data or update local state
    } catch (error) {
      toast.error('Failed to add phone number')
    }
  }

  const handleCancelPhone = () => {
    setIsAddingPhone(false)
    setNewPhone('')
  }

  // Mock volunteer stats for now (will be replaced with real data)
  const volunteerStats = {
    totalTasks: 0,
    totalPounds: 0,
    totalMiles: 0,
    currentStreak: 0,
    badges: [],
    achievements: [
      { name: 'First Task', progress: 0, target: 1, description: 'Complete your first volunteer task' },
      { name: 'Week Warrior', progress: 0, target: 4, description: 'Volunteer for 4 weeks in a row' },
      { name: 'Community Helper', progress: 0, target: 10, description: 'Complete 10 volunteer tasks' }
    ]
  }

  return (
    <AuthGate 
      title="My Profile"
      description="Sign in or create an account to access your volunteer profile"
    >
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
                          value={email}
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
                          <p className="text-lg">{firstName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Last Name</Label>
                          <p className="text-lg">{lastName}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-lg">{email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Phone</Label>
                        {phone ? (
                          <p className="text-lg">{phone}</p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="text-lg text-gray-400">Not provided</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleAddPhone}
                              className="h-8 px-3"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Phone
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Phone Number Add Modal */}
              {isAddingPhone && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Add Phone Number</CardTitle>
                    <CardDescription className="text-blue-700">
                      Add a phone number to your profile for notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="newPhone">Phone Number</Label>
                      <Input
                        id="newPhone"
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSavePhone} className="bg-blue-600 hover:bg-blue-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Save Phone
                      </Button>
                      <Button variant="outline" onClick={handleCancelPhone}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Volunteer Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Volunteer Statistics</CardTitle>
                  <CardDescription>Your contribution to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{volunteerStats.totalTasks}</div>
                      <div className="text-sm text-gray-600">Total Tasks</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{volunteerStats.totalPounds}</div>
                      <div className="text-sm text-gray-600">Pounds Delivered</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{volunteerStats.totalMiles}</div>
                      <div className="text-sm text-gray-600">Miles Driven</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{volunteerStats.currentStreak}</div>
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
                  {volunteerStats.achievements.map((achievement, index) => (
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
                  {volunteerStats.badges.length > 0 ? (
                    <div className="space-y-3">
                      {volunteerStats.badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{badge}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No badges earned yet</p>
                      <p className="text-xs">Complete tasks to earn your first badge!</p>
                    </div>
                  )}
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
                    <Badge 
                      variant={isAdmin ? "default" : "secondary"}
                      className={isAdmin ? "bg-blue-100 text-blue-800" : ""}
                    >
                      {userRole || 'VOLUNTEER'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium">
                      {createdAt.toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Debug Section - Remove in production */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800">Debug Info</CardTitle>
                  <CardDescription className="text-orange-700">
                    For testing purposes only
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-orange-700">
                    <p><strong>User ID:</strong> {authUser?.id || 'None'}</p>
                    <p><strong>Email:</strong> {authUser?.email || 'None'}</p>
                    <p><strong>Role:</strong> {userRole || 'None'} {isAdmin && '(Admin)'}</p>
                    <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
                    <p><strong>Created:</strong> {authUser?.created_at || 'None'}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSession}
                    className="w-full text-orange-700 border-orange-300 hover:bg-orange-100"
                  >
                    Clear Session (Debug)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGate>
  )
}
