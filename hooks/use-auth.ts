'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  role: 'GUEST' | 'VOLUNTEER' | 'ADMIN'
  firstName?: string
  lastName?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual authentication check
        // For now, simulate checking auth status
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // TODO: Replace with actual API call
        // const user = await getCurrentUser()
        // setUser(user)
        
        // For demo purposes, always show as not authenticated
        setUser(null)
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signOut = async () => {
    try {
      // TODO: Implement actual sign out
      // await signOutUser()
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signOut,
    isAdmin: user?.role === 'ADMIN',
    isVolunteer: user?.role === 'VOLUNTEER',
  }
}
