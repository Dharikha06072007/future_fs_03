import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  Gem, Map, Heart, Flag, Store, Trophy, Rocket,
  ArrowDown, Compass, Star, ScrollText, MousePointerClick,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const discoveries = [
  {
    year: '2018',
    icon: Gem,
    iconBg: 'from-amber-300 to-yellow-500',
    quest: 'The First Discovery',
    title: 'Secret Recipes Unearthed',
    story: 'Deep in a home kitchen, ancient family recipes were rediscovered. The first batch of gulab jamun changed everything. Sugar, cardamom, rose water \u2014 and a pinch of destiny.',
    detail: 'Grandma\'s notebook, found in an old trunk, contained recipes written in faded ink. We recreated them with modern precision while keeping the soul intact.',
    emoji: '\uD83D\uDC8E',
  },
  {
    year: '2019',
    icon: Map,
    iconBg: 'from-emerald-400 to-teal-500',
    quest: 'The Neighbors\u2019 Quest',
    title: 'Word Spreads Like Wildfire',
    story: 'Neighbors caught the scent. Orders arrived like treasure hunters seeking gold. The kitchen became a hub of sweet secrets \u2014 and the counter could barely keep up.',
    detail: 'From 5 orders a week to 50. The dining table became a packing station. Every surface was dusted with flour, every shelf stacked with boxes.',
    emoji: '\uD83D\uDDFA\uFE0F',
  },
  {
    year: '2020',
    icon: Heart,
    iconBg: 'from-rose-400 to-red-500',
    quest: 'Surviving the Storm',
    title: 'The Pandemic Challenge',
    story: 'When the world shut down, we baked on. Online orders became our lifeline. The community saved us, and we vowed to repay them tenfold with every sweet bite.',
    detail: 'We donated 1000+ meals to frontline workers. The neighborhood rallied behind us. In the darkest times, baking became our beacon.',
    emoji: '\u26C8\uFE0F',
  },
  {
    year: '2021',
    icon: Flag,
    iconBg: 'from-sky-400 to-blue-600',
    quest: 'The Official Expedition',
    title: 'Homemade Happiness Born',
    story: 'Registered, official, unstoppable. From hobby to mission. The name was chosen \u2014 happiness, because that is what we deliver with every order.',
    detail: 'FSSAI license obtained. A logo designed. Business cards printed. We were no longer a secret \u2014 we were a destination.',
    emoji: '\uD83C\uDFF4',
  },
  {
    year: '2022',
    icon: Store,
    iconBg: 'from-orange-400 to-amber-600',
    quest: 'The Base Camp',
    title: 'King Street, Uvari',
    story: '22/1, King Street \u2014 our first fortress. A real shop with a real sign. Tirunelveli district would never be the same once the aroma of fresh croissants filled the street.',
    detail: 'A 400 sq ft space became our kingdom. Display cases, a proper oven, a counter to greet customers face to face. The dream had an address.',
    emoji: '\uD83C\uDFEA',
  },
  {
    year: '2023',
    icon: Trophy,
    iconBg: 'from-yellow-400 to-amber-500',
    quest: 'The 5000th Victory',
    title: 'Army of Sweet Lovers',
    story: 'Five thousand happy customers. Two hundred dishes. From one kitchen to an empire of flavor. The adventure grew beyond what we ever imagined.',
    detail: 'Best Bakery in Tirunelveli \u2014 awarded by a local food magazine. Our gulab jamun was featured in a regional cooking show.',
    emoji: '\uD83C\uDFC6',
  },
  {
    year: '2024',
    icon: Rocket,
    iconBg: 'from-violet-400 to-purple-600',
    quest: 'The Digital Frontier',
    title: 'Going Online',
    story: 'This website \u2014 our latest quest. Now anyone, anywhere can taste our adventure. The journey continues, one order at a time. Ready for the next chapter?',
    detail: 'A custom online ordering system. Contactless delivery. Nationwide shipping for packaged treats. The adventure has no borders.',
    emoji: '\uD83D\uDE80',
  },
]

function useInView(threshold = 0.12) {
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

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

function FadeInSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        setOffset((center - viewportCenter) * -0.04)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return [ref, offset] as const
}

export const Route = createFileRoute('/our-journey')({
  component: RouteComponent,
})

function RouteComponent() {
  const scrollProgress = useScrollProgress()
  const [easterEgg, setEasterEgg] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="relative">
      <div
        className="fixed top-20 left-0 right-0 h-1.5 z-50"
        style={{ backgroundColor: '#2C1810' }}
      >
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, #DAA520, #E8927C, #DAA520)',
          }}
        />
      </div>

      <HeroSection
        onEggClick={() => setEasterEgg((p) => !p)}
        showEgg={easterEgg}
      />

      <section
        id="journey-start"
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: '#2C1810' }}
      >
        <ParticleField />
        <FloatingBakeryItems />

        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              backgroundColor: '#2C1810',
              border: '2px solid rgba(218, 165, 32, 0.4)',
              transform: `rotate(${scrollProgress * 360}deg)`,
            }}
          >
            <Compass className="w-6 h-6" style={{ color: '#DAA520' }} />
          </div>
          <span
            className="text-[10px] uppercase tracking-widest font-semibold"
            style={{ color: 'rgba(218, 165, 32, 0.4)' }}
          >
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 z-10">
          <FadeInSection className="text-center mb-16 md:mb-20">
            <Badge
              className="mb-4 px-4 py-1.5 text-sm"
              style={{
                backgroundColor: 'rgba(218, 165, 32, 0.15)',
                color: '#DAA520',
                borderColor: 'rgba(218, 165, 32, 0.3)',
              }}
            >
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              Quest Log
            </Badge>
            <h2
              className="text-3xl md:text-5xl mb-4 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#F4E4C1',
              }}
            >
              The Adventure Unfolds
            </h2>
            <p
              className="max-w-2xl mx-auto font-light text-base md:text-lg"
              style={{ color: 'rgba(218, 165, 32, 0.65)' }}
            >
              Seven chapters. Seven discoveries. One extraordinary journey from a
              home kitchen to the heart of Tamil Nadu.
            </p>
          </FadeInSection>

          <div className="relative">
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(180deg, rgba(218, 165, 32, 0.6), rgba(218, 165, 32, 0.3), rgba(218, 165, 32, 0.6))',
              }}
            />

            {discoveries.map((d, i) => (
              <div key={d.year} className="relative mb-16 md:mb-24 last:mb-0">
                <FadeInSection delay={i * 120}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`hidden md:flex md:w-[calc(50%-2rem)] ${
                        i % 2 === 0 ? 'justify-end md:pr-12' : 'md:pl-12'
                      }`}
                    >
                      <MilestoneCard
                        discovery={d}
                        index={i}
                        expanded={expanded === i}
                        onToggle={() =>
                          setExpanded(expanded === i ? null : i)
                        }
                        side={i % 2 === 0 ? 'left' : 'right'}
                      />
                    </div>

                    <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                        style={{
                          backgroundColor: '#2C1810',
                          border: '2px solid #DAA520',
                          boxShadow: '0 0 20px rgba(218, 165, 32, 0.2)',
                        }}
                      >
                        <d.icon
                          className="w-6 h-6 md:w-7 md:h-7"
                          style={{ color: '#DAA520' }}
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span
                          className="text-xs font-bold tracking-widest"
                          style={{ color: 'rgba(218, 165, 32, 0.55)' }}
                        >
                          {d.year}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 md:hidden ml-2">
                      <MilestoneCard
                        discovery={d}
                        index={i}
                        expanded={expanded === i}
                        onToggle={() =>
                          setExpanded(expanded === i ? null : i)
                        }
                        side="left"
                      />
                    </div>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 md:py-28 text-center relative overflow-hidden"
        style={{ backgroundColor: '#1A0F0A' }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-10 left-[10%] text-5xl animate-float">{'\uD83E\uDD50'}</div>
          <div className="absolute top-20 right-[15%] text-4xl animate-float" style={{ animationDelay: '1s' }}>{'\uD83E\uDDC1'}</div>
          <div className="absolute bottom-20 left-[20%] text-5xl animate-float" style={{ animationDelay: '2s' }}>{'\uD83C\uDF6A'}</div>
          <div className="absolute bottom-32 right-[10%] text-4xl animate-float" style={{ animationDelay: '0.5s' }}>{'\uD83C\uDF82'}</div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <FadeInSection>
            <Compass
              className="w-12 h-12 mx-auto mb-6"
              style={{ color: '#DAA520' }}
            />
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#F4E4C1',
              }}
            >
              The Adventure Continues...
            </h2>
            <p className="mb-10 max-w-lg mx-auto" style={{ color: 'rgba(218, 165, 32, 0.55)' }}>
              Every order is a new quest. Every customer is a fellow explorer.
              Ready to be part of the story?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="h-12 px-8 rounded-full font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: '#DAA520',
                  color: '#2C1810',
                }}
                asChild
              >
                <Link to="/menu">
                  <Star className="w-4 h-4 mr-2" />
                  Explore the Menu
                </Link>
              </Button>
              <Button
                className="h-12 px-8 rounded-full transition-all"
                variant="outline"
                style={{
                  border: '2px solid rgba(218, 165, 32, 0.4)',
                  color: '#DAA520',
                }}
                asChild
              >
                <Link to="/about">
                  <ScrollText className="w-4 h-4 mr-2" />
                  Read Our Story
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #FFF8F0, transparent)',
          }}
        />
      </section>
    </div>
  )
}

function HeroSection({
  onEggClick,
  showEgg,
}: {
  onEggClick: () => void
  showEgg: boolean
}) {
  const [parallaxRef, parallaxOffset] = useParallax()

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div className="absolute inset-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-soft"
          style={{ backgroundColor: 'rgba(218, 165, 32, 0.06)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-soft"
          style={{
            backgroundColor: 'rgba(232, 146, 124, 0.06)',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-spin-slow"
          style={{ border: '1px solid rgba(218, 165, 32, 0.1)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full animate-spin-slow"
          style={{
            border: '1px solid rgba(218, 165, 32, 0.18)',
            animationDirection: 'reverse',
            animationDuration: '20s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full animate-spin-slow"
          style={{
            border: '1px solid rgba(218, 165, 32, 0.25)',
            animationDuration: '12s',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[15, 25, 35, 50, 65, 75, 85].map((pct, i) => (
          <span
            key={i}
            className="absolute text-lg md:text-xl animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${pct}%`,
              opacity: 0.2 + Math.random() * 0.15,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {'\u2726'}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <FadeInSection>
          <div className="mb-8">
            <span
              className="text-6xl md:text-7xl block mb-6 animate-bounce-gentle"
              role="img"
              aria-label="map"
            >
              {'\uD83D\uDDFA\uFE0F'}
            </span>
          </div>
          <Badge
            className="mb-6 px-5 py-1.5 text-sm"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.15)',
              color: '#DAA520',
              borderColor: 'rgba(218, 165, 32, 0.3)',
            }}
          >
            <Compass className="w-4 h-4 mr-1.5" />
            Est. 2018
          </Badge>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#F4E4C1',
            }}
          >
            The Sweet
            <br />
            <span
              className="text-[#DAA520]"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Adventure
            </span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
            style={{ color: 'rgba(218, 165, 32, 0.6)' }}
          >
            Every great bakery has an epic origin story. Ours begins with a
            whisk, a dream, and a kitchen that smelled like heaven.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="h-12 px-8 rounded-full font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: '#DAA520',
                color: '#2C1810',
              }}
              onClick={() => {
                document
                  .getElementById('journey-start')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Star className="w-4 h-4 mr-2" />
              Start the Journey
            </Button>
            <Button
              className="h-12 px-8 rounded-full transition-all"
              variant="outline"
              style={{
                border: '2px solid rgba(218, 165, 32, 0.4)',
                color: '#DAA520',
              }}
              asChild
            >
              <Link to="/menu">
                <Compass className="w-4 h-4 mr-2" />
                Explore Menu
              </Link>
            </Button>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown
              className="w-6 h-6 mx-auto"
              style={{ color: 'rgba(218, 165, 32, 0.35)' }}
            />
          </div>
        </FadeInSection>
      </div>

      <button
        onClick={onEggClick}
        className="absolute bottom-8 right-8 text-2xl opacity-20 hover:opacity-60 transition-opacity cursor-pointer z-20"
        title="Click for a secret"
        aria-label="Easter egg"
      >
        {'\uD83E\uDD50'}
      </button>
      {showEgg && (
        <div
          className="absolute bottom-20 right-8 left-8 md:left-auto md:w-80 p-4 rounded-2xl shadow-xl animate-fadeIn z-30"
          style={{ backgroundColor: '#F4E4C1', color: '#2C1810' }}
        >
          <MousePointerClick className="w-4 h-4 inline mr-1" />
          &ldquo;You found the secret croissant! {'\uD83E\uDD50'} \u2014 The
          adventure is sweeter with friends. Share our story with someone you
          love.&rdquo;
          <button
            onClick={onEggClick}
            className="block mt-2 text-xs underline cursor-pointer"
            style={{ color: '#DAA520' }}
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  )
}

function MilestoneCard({
  discovery,
  index,
  expanded,
  onToggle,
  side,
}: {
  discovery: (typeof discoveries)[0]
  index: number
  expanded: boolean
  onToggle: () => void
  side: 'left' | 'right'
}) {
  return (
    <div
      className="group relative rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer hover:scale-[1.02]"
      style={{
        backgroundColor: '#F4E4C1',
        boxShadow:
          '0 4px 24px rgba(218, 165, 32, 0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
        transform: expanded ? 'rotateX(0deg)' : 'rotateX(0deg)',
      }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="flex items-center gap-2 mb-3">
        <Badge
          className="text-xs"
          style={{
            backgroundColor: 'rgba(218, 165, 32, 0.15)',
            color: '#8B6914',
            borderColor: 'rgba(218, 165, 32, 0.3)',
          }}
        >
          {discovery.emoji} Quest {index + 1} of 7
        </Badge>
      </div>

      <div className="mb-1">
        <span
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: 'rgba(218, 165, 32, 0.55)' }}
        >
          {discovery.quest}
        </span>
      </div>
      <h3
        className="text-xl md:text-2xl font-bold mb-3"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#2C1810',
        }}
      >
        {discovery.title}
      </h3>

      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: '#5D4037' }}
      >
        {discovery.story}
      </p>

      {expanded && (
        <div
          className="border-t pt-4 mt-4 animate-fadeIn"
          style={{ borderColor: 'rgba(218, 165, 32, 0.2)' }}
        >
          <div className="flex items-start gap-3">
            <ScrollText
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: '#DAA520' }}
            />
            <p className="text-sm italic leading-relaxed" style={{ color: '#5D4037' }}>
              {discovery.detail}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: '#DAA520' }}
        >
          {discovery.year}
        </span>
        <span
          className="text-xs transition-transform duration-300"
          style={{ color: '#DAA520' }}
        >
          {expanded ? '\u25B2 Less' : '\u25BC More'}
        </span>
      </div>
    </div>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${4 + Math.random() * 5}s`,
    size: `${3 + Math.random() * 7}px`,
    opacity: 0.08 + Math.random() * 0.18,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: '#DAA520',
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

function FloatingBakeryItems() {
  const items = [
    { emoji: '\uD83E\uDD50', top: 8, left: 5, delay: 0 },
    { emoji: '\uD83E\uDDC1', top: 15, right: 8, delay: 1.2 },
    { emoji: '\uD83C\uDF6A', bottom: 12, left: 10, delay: 2.5 },
    { emoji: '\uD83C\uDF82', bottom: 8, right: 5, delay: 0.8 },
    { emoji: '\uD83C\uDF6E', top: 40, left: 3, delay: 1.8 },
    { emoji: '\uD83E\uDD5E', top: 45, right: 4, delay: 3 },
    { emoji: '\u2615', bottom: 35, left: 6, delay: 0.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
      {items.map((item, i) => (
        <span
          key={i}
          className="absolute text-3xl md:text-4xl animate-float"
          style={{
            top: item.top !== undefined ? `${item.top}%` : undefined,
            bottom: item.bottom !== undefined ? `${item.bottom}%` : undefined,
            left: item.left !== undefined ? `${item.left}%` : undefined,
            right: item.right !== undefined ? `${item.right}%` : undefined,
            animationDelay: `${item.delay}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  )
}
