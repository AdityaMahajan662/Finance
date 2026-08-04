import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Shield } from 'lucide-react'

const quickLinks = [
  { label: 'Home Loan', href: '/loans?type=home' },
  { label: 'Car Loan', href: '/loans?type=car' },
  { label: 'Personal Loan', href: '/loans?type=personal' },
  { label: 'Business Loan', href: '/loans?type=business' },
  { label: 'Gold Loan', href: '/loans?type=gold' },
  { label: 'EMI Calculator', href: '/calculator' },
]

const support = [
  { label: 'Apply for Loan', href: '/enquiry' },
  { label: 'Loan Products', href: '/loans' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/contact#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cta-gradient flex items-center justify-center shadow-blue-glow">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Jiju <span className="text-brand-blue">Bank</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted financial partner since 1998. RBI Licensed & regulated, serving over 2 lakh customers across India.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
              <Shield className="w-4 h-4 text-brand-gold" />
              <span>RBI Licensed | FDIC Insured | ISO 27001</span>
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-blue hover:border-brand-blue/30 hover:bg-brand-blue/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Loan Products */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Loan Products</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-brand-blue transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Quick Access</h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-brand-blue transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  42, MG Road, Financial District,<br />Kochi, Kerala - 682016
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+918001234567" className="text-white/50 text-sm hover:text-white transition-colors">
                  1800-123-4567 (Toll Free)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:loans@jijubank.com" className="text-white/50 text-sm hover:text-white transition-colors">
                  loans@jijubank.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2024 Jiju Bank. All rights reserved. | CIN: U65191KL1998PLC012345
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Grievance'].map((item) => (
              <a key={item} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
