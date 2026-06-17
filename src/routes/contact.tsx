import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Camera, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const bakeryAddress = import.meta.env.VITE_BAKERY_ADDRESS || '123 Baker Street, New Delhi, Delhi 110001'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Message sent! We will get back to you soon.')
    reset()
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl text-center text-chocolate mb-4">Get in Touch</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We would love to hear from you! Whether you have a question about our products, wholesale orders, or just want to say hi.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Card className="shadow-soft rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-serif text-xl text-chocolate mb-4">Contact Information</h2>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-strawberry mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate">Address</p>
                    <p className="text-sm text-muted-foreground">{bakeryAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-strawberry mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-strawberry mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-chocolate">Email</p>
                    <p className="text-sm text-muted-foreground">hello@homemadehappiness.in</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dusty-rose">
                  <p className="font-medium text-chocolate mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" asChild className="rounded-full border-caramel bg-strawberry/5 hover:bg-strawberry hover:text-white">
                      <a href="#" aria-label="Facebook"><ExternalLink className="w-5 h-5" /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-caramel bg-strawberry/5 hover:bg-strawberry hover:text-white">
                      <a href="#" aria-label="Instagram"><Camera className="w-5 h-5" /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="rounded-full border-caramel bg-strawberry/5 hover:bg-strawberry hover:text-white">
                      <a href="#" aria-label="Twitter"><AtSign className="w-5 h-5" /></a>
                    </Button>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-soft" asChild>
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent('Hi! I have a question about your bakery products.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-2xl overflow-hidden border border-caramel h-[300px] shadow-soft">
              <iframe
                title="Bakery Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(bakeryAddress)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Card className="shadow-soft rounded-2xl">
            <CardContent className="p-6">
              <h2 className="font-serif text-xl text-chocolate mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Full Name</label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Subject</label>
                  <input
                    {...register('subject')}
                    placeholder="Order inquiry"
                    className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                  />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Message</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-2.5 rounded-2xl border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C] resize-none"
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" variant="gradient" className="w-full rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
