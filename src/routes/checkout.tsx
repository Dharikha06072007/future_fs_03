import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Smartphone, ShoppingBag, ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/api/cart-store'
import { toast } from 'sonner'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Please enter your full address'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits').max(6),
  deliveryTime: z.string(),
  paymentMethod: z.enum(['upi', 'cod']),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const upiId = import.meta.env.VITE_UPI_ID || 'bakery@upi'

export const Route = createFileRoute('/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { items, total, itemCount, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryTime: 'asap',
      paymentMethod: 'cod',
    },
  })

  const watchPayment = watch('paymentMethod')

  if (items.length === 0) {
    navigate({ to: '/cart' })
    return null
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    toast.success('Order placed successfully! 🎉')
    clearCart()
    navigate({ to: '/orders' })
  }

  const deliveryFee = total() >= 500 ? 0 : 40
  const grandTotal = total() + deliveryFee

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cart" className="text-chocolate">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </Button>

        <h1 className="font-serif text-3xl md:text-4xl text-chocolate mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <Card className="shadow-soft rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-serif text-chocolate">Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1">Full Name</label>
                      <input
                        {...register('fullName')}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                      />
                      {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1">Phone Number</label>
                      <input
                        {...register('phone')}
                        placeholder="9876543210"
                        className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-1">Delivery Address</label>
                    <textarea
                      {...register('address')}
                      rows={3}
                      placeholder="House / Flat No., Street, Landmark"
                      className="w-full px-4 py-2.5 rounded-2xl border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C] resize-none"
                    />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1">City</label>
                      <input
                        {...register('city')}
                        placeholder="New Delhi"
                        className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-chocolate mb-1">Pincode</label>
                      <input
                        {...register('pincode')}
                        placeholder="110001"
                        maxLength={6}
                        className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                      />
                      {errors.pincode && <p className="text-sm text-destructive mt-1">{errors.pincode.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-1">Delivery Time</label>
                    <select
                      {...register('deliveryTime')}
                      className="w-full px-4 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
                    >
                      <option value="asap">ASAP (30-45 mins)</option>
                      <option value="1hour">In 1 Hour</option>
                      <option value="2hours">In 2 Hours</option>
                      <option value="schedule">Schedule for Later</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-serif text-chocolate">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label
                    onClick={() => setValue('paymentMethod', 'upi')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      watchPayment === 'upi' ? 'border-[#E8927C] bg-[#E8927C]/5' : 'border-caramel bg-white hover:bg-vanilla'
                    }`}
                  >
                    <input type="radio" {...register('paymentMethod')} value="upi" className="sr-only" />
                    <Smartphone className="w-6 h-6 text-strawberry" />
                    <div className="flex-1">
                      <p className="font-medium text-chocolate">UPI Payment</p>
                      <p className="text-sm text-muted-foreground">Pay via Google Pay, PhonePe, Paytm</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      watchPayment === 'upi' ? 'bg-[#E8927C] text-white' : 'bg-vanilla text-caramel'
                    }`}>
                      {watchPayment === 'upi' ? 'Selected' : 'Select'}
                    </span>
                  </label>

                  {watchPayment === 'upi' && (
                    <div className="bg-white rounded-2xl p-6 text-center border border-caramel">
                      <div className="w-40 h-40 mx-auto bg-white rounded-xl border border-dusty-rose flex items-center justify-center mb-3 shadow-sm">
                        <div className="text-center">
                          <Smartphone className="w-12 h-12 text-strawberry mx-auto mb-2" />
                          <p className="text-xs font-mono text-caramel">{upiId}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Pay to UPI ID: <strong className="text-chocolate">{upiId}</strong></p>
                    </div>
                  )}

                  <label
                    onClick={() => setValue('paymentMethod', 'cod')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      watchPayment === 'cod' ? 'border-[#E8927C] bg-[#E8927C]/5' : 'border-caramel bg-white hover:bg-vanilla'
                    }`}
                  >
                    <input type="radio" {...register('paymentMethod')} value="cod" className="sr-only" />
                    <CreditCard className="w-6 h-6 text-strawberry" />
                    <div className="flex-1">
                      <p className="font-medium text-chocolate">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      watchPayment === 'cod' ? 'bg-[#E8927C] text-white' : 'bg-vanilla text-caramel'
                    }`}>
                      {watchPayment === 'cod' ? 'Selected' : 'Select'}
                    </span>
                  </label>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="shadow-soft rounded-2xl sticky top-24">
                <CardHeader>
                  <CardTitle className="font-serif text-chocolate">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vanilla to-caramel shrink-0 flex items-center justify-center text-lg shadow-sm">
                          🧁
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-chocolate truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-chocolate">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dusty-rose pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount()} items)</span>
                      <span className="text-chocolate">₹{total()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-mint font-medium' : 'text-chocolate'}>
                        {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <p className="text-xs text-caramel">Free delivery on orders above ₹500</p>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Delivery</span>
                      <span className="text-chocolate">30-45 mins</span>
                    </div>
                  </div>

                  <div className="border-t border-dusty-rose pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-chocolate">Total</span>
                      <span className="text-strawberry">₹{grandTotal}</span>
                    </div>
                  </div>

                  <Button type="submit" variant="gradient" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Placing Order...'
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Place Order - ₹{grandTotal}
                      </>
                    )}
                  </Button>

                  <div className="bg-vanilla rounded-xl p-3 flex items-start gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-caramel" />
                    Your order will be delivered fresh from our kitchen. We prepare all items after receiving your order.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
