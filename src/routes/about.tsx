import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  Heart, Star, MapPin, Phone, Mail, Clock, ShoppingBag,
  Sun, Users,
  Quote, ChevronRight, MessageCircle, PhoneCall
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const values = [
  { icon: Sun, title: 'Fresh Daily', desc: 'Everything baked fresh every morning. No preservatives, no shortcuts. Just pure, honest baking.' },
  { icon: Heart, title: 'Homemade Love', desc: 'Recipes passed down through generations. Made with hands, not machines. Every bite carries a memory.' },
  { icon: Users, title: 'Community First', desc: 'We source local ingredients and give back to the Uvari community. Your order supports local families.' },
]

const testimonials = [
  { text: 'Best chocolate cake in Tirunelveli! Tastes exactly like my mothers recipe. Every birthday order from here since 2021.', name: 'Priya', location: 'Palayamkottai', rating: 5, initials: 'PK' },
  { text: 'Ordered 50 cupcakes for my daughters birthday. Fresh, beautiful, gone in minutes! The vanilla frosting is divine.', name: 'Rajesh', location: 'Uvari', rating: 5, initials: 'RV' },
  { text: 'The gulab jamun reminds me of home. Authentic, sweet, perfect. My go-to bakery for all festive orders.', name: 'Lakshmi', location: 'Chennai', rating: 5, initials: 'LN' },
  { text: 'Their sourdough bread is the best I have had outside of Europe. Crunchy crust, soft inside, perfect tang.', name: 'Arun', location: 'Tirunelveli', rating: 5, initials: 'AK' },
]

const exactAddress = '22/1, King Street, Uvari, Tirunelveli District, Tamil Nadu, India - 627202'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <HeroSection />
      <DecorativeDivider />
      <ValuesSection />
      <TestimonialsSection />
      <DecorativeDivider />
      <VisitSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero min-h-[70vh] flex items-center">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-12 left-[10%] text-7xl animate-float">🥐</div>
        <div className="absolute top-24 right-[15%] text-6xl animate-float" style={{ animationDelay: '1s' }}>🧁</div>
        <div className="absolute bottom-20 left-[20%] text-5xl animate-float" style={{ animationDelay: '2s' }}>🍪</div>
        <div className="absolute bottom-32 right-[10%] text-6xl animate-float" style={{ animationDelay: '0.5s' }}>🎂</div>
        <div className="absolute top-1/2 left-[5%] text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🥖</div>
        <div className="absolute top-1/3 right-[25%] text-5xl animate-float" style={{ animationDelay: '2.5s' }}>🍫</div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
        <Badge variant="bestseller" className="mb-6 text-sm px-5 py-1.5">
          Since 2018
        </Badge>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate leading-tight mb-6">
          Our Story, Baked with Love
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#8D6E63] max-w-2xl mx-auto mb-10">
          From a small home kitchen to your favorite bakery — every bite carries a whisper of tradition,
          a pinch of passion, and a whole lot of love.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="gradient" size="lg" asChild>
            <Link to="/menu">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explore Our Menu
            </Link>
          </Button>
          <Button variant="outline-chocolate" size="lg" asChild>
            <a href="#values">
              <ChevronRight className="w-5 h-5 mr-1" />
              Our Values
            </a>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-cream to-transparent" />
    </section>
  )
}

function DecorativeDivider() {
  return (
    <div className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FadeInSection>
          <div className="flex items-center justify-center gap-6 mb-6">
            <span className="text-5xl animate-float">🥐</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🧁</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '1s' }}>🍪</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🥧</span>
            <span className="text-5xl animate-float" style={{ animationDelay: '2s' }}>🍰</span>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-caramel to-transparent max-w-xs" />
            <Heart className="w-5 h-5 text-strawberry fill-strawberry" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-caramel to-transparent max-w-xs" />
          </div>
          <p className="text-caramel font-medium text-sm mt-4 italic">
            Every recipe carries a memory, every bite tells a story
          </p>
        </FadeInSection>
      </div>
    </div>
  )
}

function ValuesSection() {
  return (
    <section id="values" className="py-20 md:py-28 bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">What We Stand For</Badge>
          <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-4">Our Values</h2>
          <p className="text-[#8D6E63] max-w-2xl mx-auto">
            Three simple promises that guide everything we do — from the ingredients we choose to the smiles we deliver.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <FadeInSection key={v.title} delay={i * 150}>
              <Card className="h-full border border-caramel/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-warm-cream flex items-center justify-center mx-auto mb-6 group-hover:bg-strawberry/10 transition-colors">
                    <v.icon className="w-8 h-8 text-strawberry" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-chocolate mb-3">{v.title}</h3>
                  <p className="text-[#8D6E63] text-sm leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">What They Say</Badge>
          <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-4">Love from Our Community</h2>
          <p className="text-[#8D6E63] max-w-2xl mx-auto">
            The sweetest reviews come straight from the heart. Here is what our customers have to say.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <FadeInSection key={i} delay={i * 120}>
              <Card className="h-full border border-caramel/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-caramel/40 mb-3" />
                  <p className="text-sm text-[#8D6E63] leading-relaxed mb-4 flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-butter text-butter" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-strawberry/20 flex items-center justify-center text-xs font-bold text-strawberry shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-chocolate text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitSection() {
  const mapsQuery = '22/1 King Street Uvari Tirunelveli Tamil Nadu'

  return (
    <section className="py-20 md:py-28 bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Come Say Hello</Badge>
          <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-4">Visit Us</h2>
          <p className="text-[#8D6E63] max-w-2xl mx-auto">
            We are always happy to welcome you. Drop by for a fresh croissant or a warm chat.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection className="rounded-2xl overflow-hidden shadow-soft border border-caramel/20 h-[400px]">
            <iframe
              title="Bakery Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeInSection>

          <FadeInSection delay={150}>
            <Card className="h-full border border-caramel/20 shadow-soft">
              <CardContent className="p-8 space-y-6">
                <div>
                  <Badge variant="bestseller" className="mb-3">Tamil Nadu</Badge>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-strawberry/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-strawberry" />
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate">Address</p>
                    <p className="text-sm text-[#8D6E63] leading-relaxed">
                      22/1, King Street, Uvari<br />
                      Tirunelveli District<br />
                      Tamil Nadu, India - 627202
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-strawberry/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-strawberry" />
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate">Phone / WhatsApp</p>
                    <a href="tel:+916385395737" className="text-sm text-strawberry hover:underline">+91 63853 95737</a>
                    <p className="text-xs text-muted-foreground mt-0.5">Available 8 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-strawberry/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-strawberry" />
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate">Hours</p>
                    <p className="text-sm text-[#8D6E63]">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-strawberry/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-strawberry" />
                  </div>
                  <div>
                    <p className="font-semibold text-chocolate">Email</p>
                    <a href="mailto:hello@homemadehappiness.in" className="text-sm text-strawberry hover:underline">hello@homemadehappiness.in</a>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button variant="gradient" className="flex-1" asChild>
                    <Link to="/menu">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Order Now
                    </Link>
                  </Button>
                  <Button variant="outline-chocolate" className="flex-1" asChild>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="tel:+916385395737">
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}


