'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  userRole: 'ADMIN' | 'VOLUNTEER' | null
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; message?: string }>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string; phone?: string }) => Promise<{ success: boolean; error?: string }>
  clearSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'ADMIN' | 'VOLUNTEER' | null>(null)

  // Function to fetch user role from database
  const fetchUserRole = async (userId: string) => {
    try {
      const response = await fetch('/api/user-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      
      if (response.ok) {
        const { role } = await response.json()
        setUserRole(role)
      } else {
        setUserRole('VOLUNTEER') // Default fallback
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      setUserRole('VOLUNTEER') // Default fallback
    }
  }

  useEffect(() => {
    // Get initial session and validate it
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      // Validate the session by checking if the user still exists
      if (session?.user) {
        try {
          // Try to get user info to validate the session
          const { data: { user }, error } = await supabase.auth.getUser()
          
          if (error || !user) {
            // Session is invalid, clear it
            console.log('Invalid session detected, clearing...')
            await supabase.auth.signOut()
            setSession(null)
            setUser(null)
            setUserRole(null)
          } else {
            // Session is valid
            setSession(session)
            setUser(user)
            // Fetch user role from database
            await fetchUserRole(user.id)
          }
        } catch (error) {
          // Error validating session, clear it
          console.log('Error validating session, clearing...')
          await supabase.auth.signOut()
          setSession(null)
          setUser(null)
          setUserRole(null)
        }
      } else {
        setSession(null)
        setUser(null)
        setUserRole(null)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserRole(session.user.id)
        } else {
          setUserRole(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email)
      
      // Use traditional email/password sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.log('Sign in response:', { data, error })

      if (error) {
        console.error('Sign in error:', error)
        return { success: false, error: error.message }
      }

      console.log('Sign in successful:', data)
      return { success: true, message: 'Signed in successfully' }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signUp = async (email: string, password: string, userData: { firstName: string; lastName: string; phone?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://hosl.vercel.app'}/login`
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      // Also clear any local state
      setSession(null)
      setUser(null)
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      // Force clear local state even if Supabase fails
      setSession(null)
      setUser(null)
    }
  }

  const clearSession = async () => {
    try {
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      console.log('Session cleared successfully')
    } catch (error) {
      console.error('Error clearing session:', error)
      setSession(null)
      setUser(null)
    }
  }

  const value = {
    user,
    session,
    loading,
    userRole,
    isAdmin: userRole === 'ADMIN',
    signIn,
    signOut,
    signUp,
    clearSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
