import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Search, MessageCircle, HelpCircle, ChevronRight, Store, ShoppingBag, CreditCard, RotateCcw, UserCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type FAQItem = {
  q: string
  a: string
  category: string
}

const faqs: FAQItem[] = [
  { q: 'How do I place an order?', a: 'Browse our menu, add items to your cart, proceed to checkout, choose UPI (Google Pay / PhonePe) or Cash on Delivery, and confirm your order. You will receive a confirmation message once your order is accepted.', category: 'Ordering & Delivery' },
  { q: 'What are your delivery hours?', a: 'We deliver from 8:00 AM to 8:00 PM, Monday through Sunday. Orders placed after 8 PM will be processed the next morning.', category: 'Ordering & Delivery' },
  { q: 'Do you deliver to my area?', a: 'We currently deliver across the Tirunelveli district. Enter your pincode at checkout to check if we serve your location. We are expanding our delivery zones regularly.', category: 'Ordering & Delivery' },
  { q: 'How long does delivery take?', a: 'Delivery takes 30\u201360 minutes within Uvari and 1\u20132 hours for nearby areas. During peak hours or festivals, delivery may take slightly longer.', category: 'Ordering & Delivery' },
  { q: 'Can I schedule a delivery?', a: 'Yes! At checkout, you can select your preferred delivery time slot. Choose from morning (8\u201312 PM), afternoon (12\u20134 PM), or evening (4\u20138 PM) windows.', category: 'Ordering & Delivery' },
  { q: 'Is same-day delivery available?', a: 'Yes, same-day delivery is available for orders placed before 6 PM. Orders after 6 PM will be delivered the next day during your chosen time slot.', category: 'Ordering & Delivery' },
  { q: 'Can I customize my cake?', a: 'Absolutely. On each product page, you can add a message with ingredients to remove or include. Want extra frosting or a specific flavor? Just let us know in the order notes.', category: 'Products & Customization' },
  { q: 'Do you have eggless options?', a: 'Yes, all our products have eggless variants available. Use the "Eggless" filter on the menu page to browse all eggless options. Our eggless cakes are just as soft and delicious.', category: 'Products & Customization' },
  { q: 'Are your products fresh?', a: 'Everything is baked fresh every single morning. We use no preservatives or artificial additives. What does not sell in a day is donated, never stored.', category: 'Products & Customization' },
  { q: 'What sizes are available?', a: 'We offer four sizes: Mini (individual portion), Regular (500g, serves 4\u20136), Large (1kg, serves 8\u201312), and Party (2kg+, serves 16\u201324). Custom sizes available on request.', category: 'Products & Customization' },
  { q: 'Can I order for a large event?', a: 'Yes! Contact us via WhatsApp at least 48 hours in advance for bulk orders. We cater weddings, birthdays, corporate events, and festivals with special pricing.', category: 'Products & Customization' },
  { q: 'Do you have sugar-free items?', a: 'We offer a limited sugar-free range including sugar-free cakes and cookies. Look for the "Dietary" filter on the menu page to see all sugar-free options.', category: 'Products & Customization' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (Google Pay, PhonePe, Paytm) and Cash on Delivery. UPI is recommended for faster processing and contactless delivery.', category: 'Payments & Pricing' },
  { q: 'Is there a delivery fee?', a: 'Delivery is free for orders above \u20B9300. Orders below \u20B9300 incur a \u20B930 delivery fee. No hidden charges \u2014 what you see at checkout is what you pay.', category: 'Payments & Pricing' },
  { q: 'Can I get a refund?', a: 'Full refund is provided if the order is cancelled before preparation begins (typically within 5 minutes of placing). Once preparation starts, cancellations cannot be refunded.', category: 'Returns & Refunds' },
  { q: 'Are prices inclusive of GST?', a: 'Yes, all prices displayed on the menu and at checkout include applicable taxes. There are no surprise charges at delivery.', category: 'Payments & Pricing' },
  { q: 'How do I track my order?', a: 'Go to "My Orders" in the navigation menu and click "Track" on your active order. You will see live status updates: Confirmed \u2192 Preparing \u2192 Out for Delivery \u2192 Delivered.', category: 'Account & Support' },
  { q: 'How do I contact you?', a: 'You can reach us on WhatsApp at +91 63853 95737, call the same number, or email hello@homemadehappiness.in. We typically respond within 30 minutes during business hours.', category: 'Account & Support' },
  { q: 'Do I need an account to order?', a: 'No, guest checkout is available. However, creating an account lets you track orders, save your address, access order history, and enjoy faster checkout on future orders.', category: 'Account & Support' },
  { q: 'What if my order is wrong or damaged?', a: 'We are sorry that happened! Contact us on WhatsApp immediately with a photo of the issue. We will refund or replace the order at no extra cost.', category: 'Returns & Refunds' },
]

const categories = ['All', 'Ordering & Delivery', 'Products & Customization', 'Payments & Pricing', 'Returns & Refunds', 'Account & Support']

export const Route = createFileRoute('/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return faqs.filter((f) => {
      const matchesSearch = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || f.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  const grouped = useMemo(() => {
    const map: Record<string, FAQItem[]> = {}
    for (const f of filtered) {
      if (!map[f.category]) map[f.category] = []
      map[f.category].push(f)
    }
    return map
  }, [filtered])

  return (
    <div>
      <HeroSection search={search} onSearchChange={setSearch} />

      <section className="py-12 md:py-20 bg-warm-cream">
        <div className="max-w-3xl mx-auto px-4">
          <Tabs defaultValue="All" value={category} onValueChange={setCategory}>
            <div className="overflow-x-auto pb-2 mb-8">
              <TabsList className="w-max md:w-full flex-nowrap gap-1 bg-vanilla/60 p-1.5 rounded-2xl">
                {categories.map((c) => (
                  <TabsTrigger
                    key={c}
                    value={c}
                    className="rounded-xl text-xs md:text-sm px-3 md:px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-strawberry data-[state=active]:shadow-soft whitespace-nowrap"
                  >
                    {c === 'All' ? (
                      <>
                        <HelpCircle className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        All
                      </>
                    ) : c === 'Ordering & Delivery' ? (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        {c}
                      </>
                    ) : c === 'Products & Customization' ? (
                      <>
                        <Store className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        {c}
                      </>
                    ) : c === 'Payments & Pricing' ? (
                      <>
                        <CreditCard className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        {c}
                      </>
                    ) : c === 'Returns & Refunds' ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        {c}
                      </>
                    ) : (
                      <>
                        <UserCircle className="w-3.5 h-3.5 mr-1.5 hidden md:inline" />
                        {c}
                      </>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              {search.trim() && filtered.length === 0 ? (
                <div className="text-center py-16">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 text-caramel/50" />
                  <p className="text-lg font-medium text-chocolate mb-2">No results found</p>
                  <p className="text-sm text-[#8D6E63]">Try a different keyword or browse a category</p>
                </div>
              ) : (
                Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat} className="mb-10 last:mb-0">
                    {category === 'All' && (
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs px-3 py-1">
                          {cat}
                        </Badge>
                      </div>
                    )}
                    <Accordion type="single" collapsible className="space-y-3">
                      {items.map((faq, i) => (
                        <AccordionItem
                          key={`${cat}-${i}`}
                          value={`${cat}-${i}`}
                          className="border border-caramel/20 rounded-2xl bg-white shadow-soft overflow-hidden data-[state=open]:border-l-[3px] data-[state=open]:border-l-strawberry data-[state=open]:bg-[#FFF8F0] transition-all duration-200"
                        >
                          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[#FFF8F0]/50 transition-colors">
                            <span className="text-sm md:text-base font-medium text-chocolate text-left pr-4">
                              {highlightMatch(faq.q, search)}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-5 pb-5">
                            <div className="pt-2 border-t border-caramel/10">
                              <p className="text-sm text-[#8D6E63] leading-relaxed">
                                {highlightMatch(faq.a, search)}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border border-caramel/20 shadow-soft overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 to-[#25D366]/10 pointer-events-none" />
              <CardContent className="relative p-8 md:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-chocolate mb-3">
                  Still Have Questions?
                </h2>
                <p className="text-[#8D6E63] mb-8 max-w-md mx-auto">
                  Cannot find your answer? Chat with us directly! We usually respond within 30 minutes.
                </p>
                <Button
                  className="h-12 px-8 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#25D366]/90 hover:scale-105 transition-all shadow-lg"
                  asChild
                >
                  <a
                    href={`https://wa.me/916385395737?text=${encodeURIComponent('Hi! I have a question about Homemade Happiness.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Or call us: <a href="tel:+916385395737" className="text-strawberry hover:underline">+91 63853 95737</a> &middot; 8 AM &ndash; 8 PM
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

function HeroSection({ search, onSearchChange }: { search: string; onSearchChange: (v: string) => void }) {
  return (
    <section className="relative overflow-hidden gradient-hero min-h-[45vh] md:min-h-[50vh] flex items-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-12 left-[10%] text-6xl animate-float">{'\u2753'}</div>
        <div className="absolute top-20 right-[15%] text-5xl animate-float" style={{ animationDelay: '1s' }}>{'\u2754'}</div>
        <div className="absolute bottom-16 left-[20%] text-5xl animate-float" style={{ animationDelay: '2s' }}>{'\uD83E\uDD50'}</div>
        <div className="absolute bottom-24 right-[10%] text-5xl animate-float" style={{ animationDelay: '0.5s' }}>{'\uD83C\uDF6A'}</div>
      </div>
      <div className="relative max-w-3xl mx-auto px-4 py-16 md:py-20 text-center w-full">
        <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5">
          <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
          Help Center
        </Badge>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl text-chocolate leading-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[#8D6E63] text-base md:text-lg max-w-xl mx-auto mb-8">
          Everything you need to know about our sweet offerings
        </p>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-caramel" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 md:h-14 pl-12 pr-4 rounded-full border-2 border-caramel/30 bg-white/90 text-sm md:text-base text-chocolate placeholder:text-caramel/50 focus:outline-none focus:border-strawberry focus:ring-2 focus:ring-strawberry/20 transition-all shadow-soft"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-warm-cream to-transparent" />
    </section>
  )
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[#F4D03F]/30 text-chocolate rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}
