'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Shield, Users, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export function AdminSetupForm() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to invite admin users' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          invitedBy: user.id
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Admin invitation sent successfully to ${formData.email}! They will receive an email with their temporary login credentials.` 
        })
        // Reset form
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        })
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send admin invitation' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Info Card */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="w-5 h-5" />
            Admin Invitation System
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <p className="mb-3">
            Use this form to invite new administrators to the Hands of St. Luke Pantry system. 
            Invited users will receive an email with temporary login credentials.
          </p>
          <div className="text-sm space-y-1">
            <p><strong>Note:</strong> Only existing administrators can invite new admin users.</p>
            <p><strong>Security:</strong> All admin accounts require email verification and secure passwords.</p>
          </div>
        </CardContent>
      </Card>

      {/* Invitation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Invite New Administrator
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>

            {message && (
              <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Invitation...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Admin Invitation
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
