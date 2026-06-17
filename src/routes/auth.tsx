import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogIn, UserPlus, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/api/use-auth'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const { signIn, signUp, signInWithGoogle, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const onLogin = async (data: LoginForm) => {
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
      navigate({ to: '/' })
    } catch (err: any) {
      toast.error(err.message || 'Login failed')
    }
  }

  const onRegister = async (data: RegisterForm) => {
    try {
      await signUp(data.email, data.password, data.name)
      toast.success('Account created! Check your email to confirm.')
      setTab('login')
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err: any) {
      toast.error(err.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-warm-cream">
      <Card className="w-full max-w-md border-0 shadow-soft rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl text-chocolate">
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {tab === 'login'
              ? 'Sign in to your Homemade Happiness account'
              : 'Join the Homemade Happiness family'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6 bg-vanilla rounded-full p-1">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${tab === 'login' ? 'bg-white shadow-sm text-chocolate' : 'text-muted-foreground hover:text-chocolate'}`}
            >
              <LogIn className="w-4 h-4 inline-block mr-1.5" />
              Login
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${tab === 'register' ? 'bg-white shadow-sm text-chocolate' : 'text-muted-foreground hover:text-chocolate'}`}
            >
              <UserPlus className="w-4 h-4 inline-block mr-1.5" />
              Register
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Email</label>
                <input
                  {...loginForm.register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Password</label>
                <input
                  {...loginForm.register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button variant="link" className="p-0 h-auto text-sm text-caramel" type="button">
                  Forgot Password?
                </Button>
              </div>
              <Button type="submit" variant="gradient" className="w-full rounded-full" disabled={authLoading}>
                {authLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Full Name</label>
                <input
                  {...registerForm.register('name')}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {registerForm.formState.errors.name && (
                  <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Email</label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Phone Number</label>
                <input
                  {...registerForm.register('phone')}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Password</label>
                <input
                  {...registerForm.register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1">Confirm Password</label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" variant="gradient" className="w-full rounded-full" disabled={authLoading}>
                {authLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dusty-rose" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full rounded-full border-caramel hover:bg-vanilla" onClick={handleGoogleSignIn} disabled={authLoading}>
            <Globe className="w-5 h-5 mr-2" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
