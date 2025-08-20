'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Send, CheckCircle } from 'lucide-react'
import { inviteAdmin } from '@/app/actions/invite-admin'
import { toast } from 'sonner'

interface AdminInviteProps {
  currentAdminId: string
}

export function AdminInvite({ currentAdminId }: AdminInviteProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await inviteAdmin({
        ...formData,
        invitedBy: currentAdminId,
      })

      if (result.success) {
        setIsSubmitted(true)
        toast.success('Admin invitation sent successfully!')
        setFormData({ firstName: '', lastName: '', email: '' })
      } else {
        toast.error(result.error || 'Failed to send invitation')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNewInvite = () => {
    setIsSubmitted(false)
    setFormData({ firstName: '', lastName: '', email: '' })
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-xl">Invitation Sent!</CardTitle>
          <CardDescription>
            The admin invitation has been sent successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            The new admin will receive an email with their temporary login credentials. 
            They should change their password after their first login.
          </p>
          <Button onClick={handleNewInvite} variant="outline">
            Invite Another Admin
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Invite New Admin</CardTitle>
            <CardDescription>
              Grant admin access to church board members
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                placeholder="John"
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
                placeholder="Smith"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.smith@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              They'll receive temporary login credentials via email
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Send className="w-4 h-4 mr-2 animate-pulse" />
                Sending Invitation...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Admin Invitation
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• New admin receives email with temporary credentials</li>
            <li>• They can immediately access all admin features</li>
            <li>• They should change their password on first login</li>
            <li>• They can invite other admins if needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
