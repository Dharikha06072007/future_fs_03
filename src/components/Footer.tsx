import { Link } from "@tanstack/react-router"
import { Cake, ExternalLink, Camera, Play, MapPin, Phone, Mail, MessageCircle } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

const categories = ["Cakes", "Cookies", "Pastries", "Breads", "Muffins"]

export default function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-[#D4A574]" style={{ backgroundColor: "#3E2723" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg mb-4" style={{ fontFamily: "'Pacifico', cursive", color: "#F5E6D3" }}>
              <Cake className="h-6 w-6" style={{ color: "#E8927C" }} />
              Homemade Happiness
            </Link>
            <p className="text-sm mb-4" style={{ color: "#F5E6D3" }}>
              Fresh from our home to your heart
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#F5E6D3" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8927C"; e.currentTarget.style.color = "#FFFFFF" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F5E6D3" }}
                aria-label="Facebook"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#F5E6D3" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8927C"; e.currentTarget.style.color = "#FFFFFF" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F5E6D3" }}
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#F5E6D3" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8927C"; e.currentTarget.style.color = "#FFFFFF" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F5E6D3" }}
                aria-label="YouTube"
              >
                <Play className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#F5E6D3" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "#F5E6D3" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#E8927C" }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E6D3" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#F5E6D3" }}>
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/menu"
                    search={{ category: cat.toLowerCase() }}
                    className="text-sm transition-colors"
                    style={{ color: "#F5E6D3" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#E8927C" }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E6D3" }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#F5E6D3" }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm" style={{ color: "#F5E6D3" }}>
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#D4A574" }} />
                <span>{import.meta.env.VITE_BAKERY_ADDRESS || "22/1, King Street, Uvari, Tirunelveli"}</span>
              </li>
              <li>
                <a href="tel:+916385395737" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#F5E6D3" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E8927C" }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E6D3" }}
                >
                  <Phone className="h-4 w-4 shrink-0" style={{ color: "#D4A574" }} />
                  +91 63853 95737
                </a>
              </li>
              <li>
                <a href="mailto:hello@homemadehappiness.com" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#F5E6D3" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E8927C" }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E6D3" }}
                >
                  <Mail className="h-4 w-4 shrink-0" style={{ color: "#D4A574" }} />
                  hello@homemadehappiness.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/916385395737"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#F5E6D3" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E8927C" }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E6D3" }}
                >
                  <MessageCircle className="h-4 w-4 shrink-0" style={{ color: "#D4A574" }} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(245, 230, 211, 0.2)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: "#C9A9A6" }}>
              &copy; 2024 Homemade Happiness. All rights reserved.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const email = new FormData(form).get("email") as string
                if (email) {
                  window.open(`https://wa.me/916385395737?text=${encodeURIComponent(`Subscribe me to newsletter: ${email}`)}`, "_blank")
                  form.reset()
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Subscribe to newsletter"
                required
                className="h-9 rounded-full border px-4 text-sm placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C] w-48 lg:w-56"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
              />
              <button
                type="submit"
                className="h-9 rounded-full px-4 text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: "#E8927C" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D4816E" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E8927C" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
