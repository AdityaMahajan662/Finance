'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Building2, ChevronDown } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.loans', href: '/loans' },
  { key: 'nav.apply', href: '/enquiry' },
  { key: 'nav.calculator', href: '/calculator' },
  { key: 'nav.contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { locale, setLocale, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-glass border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-cta-gradient flex items-center justify-center shadow-blue-glow group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">
                Khushal <span className="text-brand-blue">Finance</span>
              </span>
              <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase -mt-0.5">
                Financial Services
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const isApply = link.href === '/enquiry'
              if (isApply) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-4 btn-primary text-sm px-5 py-2.5"
                  >
                    {t(link.key)}
                  </Link>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-blue bg-brand-blue/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(link.key)}
                </Link>
              )
            })}
            
            {/* Language Switcher */}
            <div className="ml-4 relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all">
                {locale.toUpperCase()}
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-navy-900 border border-white/10 rounded-xl shadow-glass overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right transform scale-95 group-hover:scale-100 z-50">
                <div className="py-1">
                  {['en', 'hi', 'mr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLocale(lang)}
                      className={`w-full text-left px-4 py-2 text-sm ${locale === lang ? 'text-brand-blue bg-brand-blue/10' : 'text-white/70 hover:text-white hover:bg-white/5'} transition-colors`}
                    >
                      {t(`nav.lang.${lang}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hamburger & Lang */}
          <div className="md:hidden flex items-center gap-2">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="bg-transparent border border-white/10 text-white text-xs rounded px-2 py-1 outline-none"
            >
              <option value="en" className="bg-navy-900">EN</option>
              <option value="hi" className="bg-navy-900">HI</option>
              <option value="mr" className="bg-navy-900">MR</option>
            </select>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 bg-navy-900/98 backdrop-blur-md border-b border-white/10 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const isApply = link.href === '/enquiry'
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isApply
                    ? 'btn-primary text-center mt-2'
                    : isActive
                    ? 'text-brand-blue bg-brand-blue/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(link.key)}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
