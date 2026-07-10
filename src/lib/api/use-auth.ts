import { useState, useEffect, useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { supabaseUrl } from './config.server'

interface MockUser {
  id: string
  email: string
  user_metadata: { name?: string }
}

const MOCK_KEY = 'bakery-mock-user'

function getMockUser(): MockUser | null {
  try {
    const raw = localStorage.getItem(MOCK_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setMockUser(u: MockUser | null) {
  if (u) localStorage.setItem(MOCK_KEY, JSON.stringify(u))
  else localStorage.removeItem(MOCK_KEY)
}

function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co')
}

let mockUserInit = getMockUser()

export interface AuthState {
  user: User | MockUser | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | MockUser | null>(mockUserInit)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(!mockUserInit)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        checkAdminStatus(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        checkAdminStatus(session.user.id)
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAdminStatus = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
      setIsAdmin(data?.role === 'admin')
    } catch {
      setIsAdmin(false)
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      await new Promise((r) => setTimeout(r, 500))
      const user: MockUser = { id: 'mock-user-1', email, user_metadata: { name: email.split('@')[0] } }
      mockUserInit = user
      setMockUser(user)
      setUser(user)
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    if (!isSupabaseConfigured()) {
      await new Promise((r) => setTimeout(r, 500))
      const user: MockUser = { id: 'mock-user-' + Date.now(), email, user_metadata: { name } }
      mockUserInit = user
      setMockUser(user)
      setUser(user)
      return
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    mockUserInit = null
    setMockUser(null)
    setUser(null)
    setSession(null)
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Google sign-in requires Supabase configuration')
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
  }, [])

  return { user, session, loading, isAdmin, signIn, signUp, signOut, signInWithGoogle }
}
