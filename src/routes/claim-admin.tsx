import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ShieldCheck, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/lib/api/use-auth'
import { toast } from 'sonner'

export const Route = createFileRoute('/claim-admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState(false)

  const handleClaim = () => {
    toast.success('Admin role claimed successfully! Redirecting to dashboard...')
    setTimeout(() => navigate({ to: '/admin' }), 1500)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-warm-cream">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-warm-cream">
      <Card className="max-w-md w-full border-0 shadow-soft rounded-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-strawberry/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-strawberry" />
          </div>
          <CardTitle className="font-serif text-2xl text-chocolate">Claim Admin Access</CardTitle>
          <CardDescription>
            Become the administrator of Homemade Happiness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-vanilla border border-caramel rounded-2xl p-4 text-sm text-chocolate">
            <AlertTriangle className="w-4 h-4 inline-block mr-2 text-caramel" />
            The first person to claim admin will get full access to the admin dashboard including order management, product editing, and site analytics.
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>As an admin you will be able to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>View and manage all orders</li>
              <li>Add, edit, and remove products</li>
              <li>Access sales analytics and reports</li>
              <li>Manage user accounts</li>
            </ul>
          </div>

          {!user ? (
            <div className="bg-vanilla rounded-2xl p-4 text-center text-sm text-chocolate">
              Please <Button variant="link" className="p-0 h-auto text-strawberry" onClick={() => navigate({ to: '/auth' })}>sign in</Button> to claim admin access.
            </div>
          ) : (
            <Button
              variant="gradient"
              className="w-full rounded-full"
              size="lg"
              onClick={() => setShowDialog(true)}
            >
              <ShieldCheck className="w-5 h-5 mr-2" />
              Claim Admin Role
            </Button>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="rounded-3xl border-0 shadow-soft">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-chocolate">Confirm Admin Claim</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to become the admin? This action will give you full control over the bakery management system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-caramel">Cancel</AlertDialogCancel>
            <Button variant="gradient" className="rounded-full" onClick={handleClaim}>Confirm & Proceed</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
