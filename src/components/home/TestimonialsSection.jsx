'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-brand-gold text-brand-gold' : 'text-white/20'}`}
        />
      ))}
    </div>
  )
}

function AvatarCircle({ initials, index }) {
  const colors = [
    ['#1E6FFF', '#0A52CC'],
    ['#F5A623', '#D4891A'],
    ['#A78BFA', '#7C3AED'],
    ['#34D399', '#059669'],
    ['#FB923C', '#EA580C'],
  ]
  const [from, to] = colors[index % colors.length]
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials}
    </div>
  )
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(30,111,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag">Customer Stories</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What Our <span className="gradient-text">Members Say</span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div className="glass-card p-8 md:p-12 relative overflow-hidden mb-8">
          <div
            className="absolute inset-0 opacity-5"
            style={{ background: 'linear-gradient(135deg, #1E6FFF, transparent)' }}
          />

          <Quote
            className="absolute top-6 right-6 w-20 h-20 text-brand-blue/10"
          />

          <div className="relative">
            {/* Loan badge */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1 rounded-full text-xs font-medium text-brand-blue"
                style={{ background: 'rgba(30,111,255,0.15)', border: '1px solid rgba(30,111,255,0.25)' }}
              >
                {t.loan}
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium text-brand-gold"
                style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.25)' }}
              >
                {t.amount}
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-light italic">
              &ldquo;{t.comment}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <AvatarCircle initials={t.avatar} index={active} />
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-white/40 text-sm">{t.role}</p>
                <StarRating rating={t.rating} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? '32px' : '8px',
                  height: '8px',
                  background: i === active ? '#1E6FFF' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white hover:shadow-blue-glow transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #1E6FFF, #0A52CC)' }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
