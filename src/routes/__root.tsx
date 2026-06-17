import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-warm-cream bg-[radial-gradient(#D4A57410_1px,transparent_1px)] [background-size:20px_20px]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  ),
})
