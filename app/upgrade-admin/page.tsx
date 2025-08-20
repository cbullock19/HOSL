'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertCircle, Shield, ArrowRight } from 'lucide-react'

export default function UpgradeAdminPage() {
  const [email, setEmail] = useState('bullockchristiaan13@gmail.com')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; details?: any } | null>(null)

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter an email address' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Step 1: Sync user from Supabase Auth to our database
      console.log('🔄 Step 1: Syncing user from Supabase...')
      const syncResponse = await fetch('/api/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const syncResult = await syncResponse.json()

      if (!syncResult.success) {
        setMessage({ type: 'error', text: `Sync failed: ${syncResult.error}` })
        setLoading(false)
        return
      }

      console.log('✅ User synced successfully')

      // Step 2: Upgrade user to admin
      console.log('🔄 Step 2: Upgrading user to admin...')
      const upgradeResponse = await fetch('/api/upgrade-to-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const upgradeResult = await upgradeResponse.json()

      if (upgradeResult.success) {
        setMessage({ 
          type: 'success', 
          text: upgradeResult.message,
          details: upgradeResult.user
        })
      } else {
        setMessage({ type: 'error', text: upgradeResult.error })
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Upgrade to Admin</CardTitle>
          <p className="text-gray-600 mt-2">
            Upgrade a user account to administrator status
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleUpgrade} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email address"
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
                {message.details && (
                  <div className="mt-2 text-sm">
                    <p><strong>User ID:</strong> {message.details.id}</p>
                    <p><strong>Name:</strong> {message.details.name}</p>
                    <p><strong>Role:</strong> {message.details.role}</p>
                  </div>
                )}
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
                  Upgrading...
                </>
              ) : (
                <>
                  Upgrade to Admin
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {message?.type === 'success' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Upgrade Successful!</h3>
              <p className="text-green-700 text-sm mb-3">
                The user has been upgraded to admin status. Here's what to do next:
              </p>
              <ol className="text-green-700 text-sm space-y-1">
                <li>1. Sign out of the app</li>
                <li>2. Sign back in to refresh your session</li>
                <li>3. You should now see admin navigation and features</li>
                <li>4. Access admin pages at /admin/tasks and /admin/reports</li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
