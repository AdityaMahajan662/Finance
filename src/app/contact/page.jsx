'use client'

import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Clock, ChevronDown, Send } from 'lucide-react'

const branches = [
  { city: 'Kochi (HQ)', address: '42, MG Road, Financial District, Kochi, Kerala - 682016', phone: '0484-123-4567', hours: 'Mon–Sat: 9AM–5PM', type: 'Head Office', mapLink: 'https://maps.google.com/?q=42,+MG+Road,+Financial+District,+Kochi,+Kerala+-+682016' },
  { city: 'Thiruvananthapuram', address: '18, Statue Junction, Thiruvananthapuram, Kerala - 695001', phone: '0471-234-5678', hours: 'Mon–Sat: 9AM–5PM', type: 'Regional Branch', mapLink: 'https://maps.google.com/?q=18,+Statue+Junction,+Thiruvananthapuram,+Kerala+-+695001' },
  { city: 'Kozhikode', address: '7, SM Street, Kozhikode, Kerala - 673001', phone: '0495-345-6789', hours: 'Mon–Sat: 9AM–5PM', type: 'Branch', mapLink: 'https://maps.google.com/?q=7,+SM+Street,+Kozhikode,+Kerala+-+673001' },
  { city: 'Chennai', address: '105, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017', phone: '044-456-7890', hours: 'Mon–Sat: 9AM–5PM', type: 'Branch', mapLink: 'https://maps.google.com/?q=105,+Anna+Salai,+T.+Nagar,+Chennai,+Tamil+Nadu+-+600017' },
]

const faqs = [
  { q: 'What is the minimum income required for a personal loan?', a: 'For a personal loan, the minimum monthly income required is ₹25,000 for salaried individuals. Self-employed applicants must have a minimum annual turnover of ₹3 lakhs.' },
  { q: 'How long does loan approval take?', a: 'Our AI-powered system provides in-principle approval within minutes of application. Full disbursement typically happens within 24–48 working hours after document verification.' },
  { q: 'What documents are required?', a: 'Basic KYC documents include Aadhaar card, PAN card, and latest 3 months salary slips. Additional documents may vary by loan type (e.g., property papers for home loan).' },
  { q: 'Can I repay my loan early?', a: 'Yes! We have zero prepayment penalties on most loan products. You can make partial or full prepayment at any time after 6 months of loan disbursement.' },
  { q: 'What is the minimum CIBIL score needed?', a: 'We recommend a minimum CIBIL score of 700 for easy approval. However, we also have products for those with lower scores or no credit history — subject to additional verification.' },
  { q: 'Is the application process completely online?', a: 'Yes! Our entire application — from form filling to document upload to approval — is 100% digital. You can apply from anywhere, anytime, using your smartphone or computer.' },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-white font-medium pr-4 text-sm">{faq.q}</span>
        <ChevronDown
          className="w-5 h-5 text-brand-blue flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-white/50 text-sm leading-relaxed pt-4">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div
        className="py-12 px-4 md:px-8 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,111,255,0.12) 0%, transparent 60%)' }}
      >
        <div className="section-tag mx-auto">Get in Touch</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="text-white/50">We&apos;re here to help. Reach out through any channel.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 mb-16">
          {[
            { icon: Phone, title: 'Call us on', value: '+91 95795 70773', sub: 'Mon–Sat, 8AM–8PM', color: '#1E6FFF', link: 'tel:+91 95795 70773' },
            { icon: MessageCircle, title: 'WhatsApp Us', value: '+91 95795 70773', sub: 'Response within 4 hours', color: '#25D366', link: 'https://wa.me/919579570773' },
          ].map(({ icon: Icon, title, value, sub, color, link }) => (
            <a key={title} href={link} target={link.startsWith('http') ? '_blank' : undefined} rel={link.startsWith('http') ? 'noopener noreferrer' : undefined} className="glass-card-hover p-6 text-center block transition-transform hover:-translate-y-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="font-bold" style={{ color }}>{value}</p>
              <p className="text-white/40 text-xs mt-1">{sub}</p>
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          {/* Enquiry Form */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Enquiry Form</h2>
            {sent ? (
              <div className="glass-card p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.3)' }}
                >
                  <Send className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">Our team will get back to you within 4 business hours.</p>
              </div>
            ) : (
              <div className="glass-card p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-sm block mb-1.5">Full Name</label>
                    <input type="text" className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-white/50 text-sm block mb-1.5">Mobile Number</label>
                    <input type="tel" className="input-field" placeholder="9876543210" />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-sm block mb-1.5">Email</label>
                  <input type="email" className="input-field" placeholder="you@email.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-white/50 text-sm block mb-1.5">Loan Type</label>
                    <select className="input-field">
                      <option value="" style={{ background: '#0A1628' }}>Select loan</option>
                      <option style={{ background: '#0A1628' }}>Home Loan</option>
                      <option style={{ background: '#0A1628' }}>Car Loan</option>
                      <option style={{ background: '#0A1628' }}>Personal Loan</option>
                      <option style={{ background: '#0A1628' }}>Business Loan</option>
                      <option style={{ background: '#0A1628' }}>Education Loan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-sm block mb-1.5">Loan Amount (₹)</label>
                    <input type="number" className="input-field" placeholder="500000" />
                  </div>
                  <div>
                    <label className="text-white/50 text-sm block mb-1.5">Tenure (Years)</label>
                    <input type="number" className="input-field" placeholder="5" />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-sm block mb-1.5">Address</label>
                  <textarea className="input-field resize-none" rows={3} placeholder="Enter your full address" />
                </div>
                <button onClick={() => setSent(true)} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                  Submit Enquiry <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq">
          <div className="text-center mb-10">
            <div className="section-tag mx-auto">FAQ</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
