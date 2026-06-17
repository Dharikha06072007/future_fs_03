import { useState, useEffect } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Cake, Search, ShoppingCart, Menu as MenuIcon, User, LogOut, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/api/cart-store"
import { useAuth } from "@/lib/api/use-auth"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Our Journey", href: "/our-journey" },
  { name: "Cart", href: "/cart" },
  { name: "Orders", href: "/orders" },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bounce, setBounce] = useState(false)
  const navigate = useNavigate()
  const itemCount = useCartStore((s) => s.itemCount())
  const { user, isAdmin, signOut, loading } = useAuth()

  const prevCount = useCartStore((s) => s.items.length)

  useEffect(() => {
    if (prevCount > 0) {
      setBounce(true)
      const timer = setTimeout(() => setBounce(false), 500)
      return () => clearTimeout(timer)
    }
  }, [prevCount])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate({ to: "/menu", search: { q: searchQuery.trim() } })
      setSearchQuery("")
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const userInitial = user?.user_metadata?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-2 border-dashed border-[#D4A574]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2" style={{ fontFamily: "'Pacifico', cursive" }}>
            <Cake className="h-7 w-7" style={{ color: "#E8927C" }} />
            <span className="hidden sm:inline text-2xl" style={{ color: "#5D4037" }}>
              Homemade Happiness
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-3 py-2 text-sm font-medium transition-colors group"
                style={{ color: "#5D4037" }}
              >
                {link.name}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E8927C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4" style={{ color: "#D4A574" }} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-48 lg:w-64 rounded-full border pl-9 pr-3 text-sm placeholder:text-[#D4A574]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C] focus-visible:ring-offset-2"
              style={{ backgroundColor: "#FFF8F0", borderColor: "#D4A574", color: "#5D4037" }}
            />
          </form>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className={`relative ${bounce ? "animate-bounce" : ""}`} style={{ color: "#5D4037" }}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: "#E8927C" }}>
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>
          </Link>

          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md" style={{ backgroundColor: "#F5E6D3" }} />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-xs" style={{ backgroundColor: "#D4A574", color: "#FFF8F0" }}>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-[#D4A574]" style={{ backgroundColor: "#FFF8F0" }}>
                <DropdownMenuLabel style={{ color: "#5D4037" }}>
                  {user.user_metadata?.name || user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ backgroundColor: "#D4A574" }} />
                <DropdownMenuItem asChild style={{ color: "#5D4037" }}>
                  <Link to="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild style={{ color: "#5D4037" }}>
                    <Link to="/admin" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator style={{ backgroundColor: "#D4A574" }} />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer" style={{ color: "#E8927C" }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="rounded-full border-0 text-white" style={{ backgroundColor: "#E8927C" }}>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" style={{ color: "#5D4037" }}>
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-2 border-dashed border-[#D4A574]" style={{ backgroundColor: "#FFFFFF" }}>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2" style={{ fontFamily: "'Pacifico', cursive", color: "#5D4037" }}>
                  <Cake className="h-5 w-5" style={{ color: "#E8927C" }} />
                  Homemade Happiness
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                <form onSubmit={handleSearch} className="flex sm:hidden items-center relative mb-4">
                  <Search className="absolute left-3 h-4 w-4" style={{ color: "#D4A574" }} />
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full border pl-9 pr-3 text-sm placeholder:text-[#D4A574]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C] focus-visible:ring-offset-2"
                    style={{ backgroundColor: "#FFF8F0", borderColor: "#D4A574", color: "#5D4037" }}
                  />
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="relative px-3 py-2.5 text-sm font-medium transition-colors group"
                    style={{ color: "#5D4037" }}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#E8927C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
