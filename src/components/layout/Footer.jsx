'use client'

import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, Globe, X, ExternalLink, Share2, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t('nav.loans'), href: '/loans' },
    { label: t('nav.calculator'), href: '/calculator' },
  ]
  
  const support = [
    { label: t('nav.apply'), href: '/enquiry' },
    { label: t('nav.contact'), href: '/contact' },
    { label: 'FAQ', href: '/contact#faq' },
  ]

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
              <span className="text-xl font-bold text-white tracking-tight">
                Khushal <span className="text-brand-blue">Finance</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t('footer.subtitle')}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
              <Shield className="w-4 h-4 text-brand-gold" />
              <span>RBI Licensed | FDIC Insured | ISO 27001</span>
            </div>
            <div className="flex gap-3">
              {[Globe, X, ExternalLink, Share2].map((Icon, i) => (
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
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">{t('footer.loanProducts')}</h4>
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
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">{t('footer.quickAccess')}</h4>
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
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=42,+MG+Road,+Financial+District,+Kochi,+Kerala+-+682016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-sm hover:text-brand-blue transition-colors"
                >
                  42, MG Road, Financial District,<br />Kochi, Kerala - 682016
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+91 95795 70773" className="text-white/50 text-sm hover:text-white transition-colors">
                  +91 95795 70773
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:khushalsbi2019@gmail.com" className="text-white/50 text-sm hover:text-white transition-colors">
                  khushalsbi2019@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <a href="https://wa.me/919579570773" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#25D366] transition-colors">
                  {t('footer.whatsapp')}
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
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{t('footer.terms')}</a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{t('footer.grievance')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
