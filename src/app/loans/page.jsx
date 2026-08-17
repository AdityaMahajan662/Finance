'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Home, Car, User, Briefcase, Coins, GraduationCap } from 'lucide-react'
import { loanTypes, loanFilters } from '@/data/loans'

const iconMap = { Home, Car, User, Briefcase, Coins, GraduationCap }

const colorMap = {
  blue: { bg: 'rgba(30,111,255,0.15)', border: 'rgba(30,111,255,0.3)', color: '#1E6FFF' },
  purple: { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)', color: '#A78BFA' },
  emerald: { bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)', color: '#34D399' },
  orange: { bg: 'rgba(251,146,60,0.15)', border: 'rgba(251,146,60,0.3)', color: '#FB923C' },
  yellow: { bg: 'rgba(245,166,35,0.15)', border: 'rgba(245,166,35,0.3)', color: '#F5A623' },
  cyan: { bg: 'rgba(56,189,248,0.15)', border: 'rgba(56,189,248,0.3)', color: '#38BDF8' },
}

function LoanCard({ loan }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = iconMap[loan.icon]
  const c = colorMap[loan.color]

  return (
    <div className="glass-card overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Gradient top bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              <Icon className="w-6 h-6" style={{ color: c.color }} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{loan.type}</h3>
              <p className="text-white/40 text-xs mt-0.5">{loan.tagline}</p>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
            style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
          >
            {loan.interestRate}% p.a.
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Max Amount', value: loan.maxAmountLabel },
            { label: 'Tenure', value: loan.tenure },
            { label: 'Processing', value: loan.processingFee },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-white font-semibold text-sm">{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-5">
          {(expanded ? loan.features : loan.features.slice(0, 3)).map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: c.color }} />
              {f}
            </div>
          ))}
          {loan.features.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: c.color }}
            >
              {expanded ? 'Show less ↑' : `+${loan.features.length - 3} more features ↓`}
            </button>
          )}
        </div>

        {/* Eligibility */}
        <div
          className="p-3 rounded-xl mb-5 text-xs text-white/50 leading-relaxed"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-white/30 font-medium">Eligibility: </span>
          {loan.eligibility}
        </div>

        {/* CTA */}
        <Link
          href={`/enquiry?type=${loan.id}`}
          className="btn-primary w-full py-3 gap-2 group/btn text-sm"
        >
          Apply for {loan.type}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
        <Link href="/contact" className="btn-secondary w-full py-3 mt-3 text-sm border-white/10 hover:border-brand-blue/30 text-white/70 hover:text-white flex items-center justify-center">
          Quick Enquiry
        </Link>
      </div>
    </div>
  )
}

export default function LoansPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? loanTypes
    : loanTypes.filter((l) => l.type.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div
        className="py-16 px-4 md:px-8 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,111,255,0.15) 0%, transparent 60%)' }}
      >
        <div className="section-tag mx-auto">All Loan Products</div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
          Our <span className="gradient-text">Loan Products</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Competitive rates, flexible tenures, and hassle-free processing — find the loan that fits your life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {loanFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeFilter === f ? 'linear-gradient(135deg, #1E6FFF, #0A52CC)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f ? 'white' : 'rgba(255,255,255,0.6)',
                border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.10)',
                boxShadow: activeFilter === f ? '0 0 20px rgba(30,111,255,0.3)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </div>
    </div>
  )
}
