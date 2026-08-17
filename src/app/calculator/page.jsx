'use client'

import { useState, useMemo } from 'react'
import { calculateEMI, generateAmortization, formatCurrency } from '@/lib/utils'
import { TrendingDown, Calendar, IndianRupee, BarChart3, Info } from 'lucide-react'

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Format number to Indian comma style: 25,00,000 */
function toIndianFormat(num) {
  if (!num && num !== 0) return ''
  const n = Math.abs(Math.round(num))
  const str = n.toString()
  if (str.length <= 3) return str
  // Last 3 digits, then groups of 2
  const last3 = str.slice(-3)
  const rest = str.slice(0, -3)
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
}

/** Human label: 5000 → "5 Thousand", 500000 → "5 Lakh", 10000000 → "1 Crore" */
function toWordLabel(num) {
  if (!num) return ''
  if (num >= 10000000) return `${(num / 10000000).toFixed(2).replace(/\.?0+$/, '')} Crore`
  if (num >= 100000)   return `${(num / 100000).toFixed(2).replace(/\.?0+$/, '')} Lakh`
  if (num >= 1000)     return `${(num / 1000).toFixed(1).replace(/\.?0+$/, '')} Thousand`
  return `${num}`
}

/** Strip all non-digit characters for parsing */
function stripCommas(str) {
  return str.replace(/[^0-9]/g, '')
}

/* ── AmountInput ─────────────────────────────────────────────────────────── */
/**
 * Special slider+input for Loan Amount.
 * Shows formatted Indian number in the text box (₹ 25,00,000)
 * and a word label (25 Lakh) below.
 */
function AmountSlider({ value, onChange }) {
  const [rawText, setRawText] = useState(toIndianFormat(value))
  const [focused, setFocused] = useState(false)

  const pct = ((value - 100000) / (50000000 - 100000)) * 100

  const handleFocus = () => {
    // Show plain number when focused for easy editing
    setRawText(stripCommas(rawText))
    setFocused(true)
  }

  const handleChange = (e) => {
    // Allow only digits while typing
    const digits = e.target.value.replace(/[^0-9]/g, '')
    setRawText(digits)
  }

  const handleBlur = () => {
    setFocused(false)
    const num = parseInt(rawText, 10)
    if (!isNaN(num) && num > 0) {
      const clamped = Math.min(Math.max(num, 100000), 50000000)
      const snapped = Math.round(clamped / 50000) * 50000
      onChange(snapped)
      setRawText(toIndianFormat(snapped))
    } else {
      setRawText(toIndianFormat(value))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur()
  }

  // Keep rawText in sync when slider moves
  const handleSlider = (e) => {
    const v = Number(e.target.value)
    onChange(v)
    if (!focused) setRawText(toIndianFormat(v))
  }

  return (
    <div className="mb-8">
      {/* Label row */}
      <div className="flex items-start justify-between mb-3">
        <label className="text-white/60 text-sm font-medium">Loan Amount</label>
        {/* Editable formatted input */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: focused ? 'rgba(30,111,255,0.18)' : 'rgba(30,111,255,0.10)',
            border: focused ? '1px solid rgba(30,111,255,0.60)' : '1px solid rgba(30,111,255,0.30)',
            boxShadow: focused ? '0 0 12px rgba(30,111,255,0.20)' : 'none',
          }}
        >
          <span className="text-brand-blue font-bold text-base">₹</span>
          <input
            type="text"
            inputMode="numeric"
            value={rawText}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-white font-bold text-base text-right outline-none"
            style={{ width: '130px' }}
          />
        </div>
      </div>

      {/* Word label */}
      <div className="flex justify-end mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.25)' }}
        >
          {toWordLabel(value)}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={100000}
        max={50000000}
        step={50000}
        value={value}
        onChange={handleSlider}
        className="w-full h-2 rounded-full outline-none appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, #1E6FFF ${pct}%, rgba(255,255,255,0.10) ${pct}%)`,
        }}
      />

      {/* Min / Max */}
      <div className="flex justify-between text-white/30 text-xs mt-1.5">
        <span>₹1 Lakh</span>
        <span>₹5 Crore</span>
      </div>
    </div>
  )
}

/* ── Simple Slider (rate & tenure) ───────────────────────────────────────── */
function SimpleSlider({ label, value, min, max, step, onChange, unit, displayValue }) {
  const [rawText, setRawText] = useState(String(value))
  const [focused, setFocused] = useState(false)
  const pct = ((value - min) / (max - min)) * 100

  const handleFocus = () => { setRawText(String(value)); setFocused(true) }

  const handleBlur = () => {
    setFocused(false)
    const parsed = parseFloat(rawText)
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max)
      const snapped = Math.round(clamped / step) * step
      onChange(parseFloat(snapped.toFixed(2)))
      setRawText(String(parseFloat(snapped.toFixed(2))))
    } else {
      setRawText(String(value))
    }
  }

  const handleSlider = (e) => {
    const v = Number(e.target.value)
    onChange(v)
    if (!focused) setRawText(String(v))
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <label className="text-white/60 text-sm font-medium">{label}</label>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: focused ? 'rgba(30,111,255,0.18)' : 'rgba(30,111,255,0.10)',
            border: focused ? '1px solid rgba(30,111,255,0.60)' : '1px solid rgba(30,111,255,0.30)',
            boxShadow: focused ? '0 0 12px rgba(30,111,255,0.20)' : 'none',
          }}
        >
          <input
            type="text"
            inputMode="decimal"
            value={rawText}
            onFocus={handleFocus}
            onChange={(e) => setRawText(e.target.value.replace(/[^0-9.]/g, ''))}
            onBlur={handleBlur}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur() }}
            className="bg-transparent text-white font-bold text-base text-right outline-none"
            style={{ width: '50px' }}
          />
          <span className="text-brand-blue font-bold text-sm">{unit}</span>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        className="w-full h-2 rounded-full outline-none appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(90deg, #1E6FFF ${pct}%, rgba(255,255,255,0.10) ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-white/30 text-xs mt-1.5">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function CalculatorPage() {
  const [principal, setPrincipal] = useState(2500000)
  const [rate, setRate]           = useState(8.5)
  const [tenureYears, setTenure]  = useState(20)

  const tenureMonths  = tenureYears * 12
  const emi           = useMemo(() => calculateEMI(principal, rate, tenureMonths), [principal, rate, tenureMonths])
  const schedule      = useMemo(() => generateAmortization(principal, rate, tenureMonths), [principal, rate, tenureMonths])
  const totalInterest = useMemo(() => schedule.reduce((sum, s) => sum + s.interest, 0), [schedule])
  const totalPayable  = principal + totalInterest
  const interestPct   = Math.round((totalInterest / totalPayable) * 100)
  const principalPct  = 100 - interestPct

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div
        className="py-12 px-4 md:px-8 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,111,255,0.12) 0%, transparent 60%)' }}
      >
        <div className="section-tag mx-auto">Financial Tool</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
          EMI <span className="gradient-text">Calculator</span>
        </h1>
        <p className="text-white/50">Type or slide — your EMI updates instantly</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Left: Controls ── */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-8">Loan Parameters</h2>

            <AmountSlider value={principal} onChange={setPrincipal} />
            <SimpleSlider
              label="Interest Rate (per annum)"
              value={rate} min={7} max={24} step={0.1}
              onChange={setRate} unit="%"
            />
            <SimpleSlider
              label="Loan Tenure"
              value={tenureYears} min={1} max={30} step={1}
              onChange={setTenure} unit=" Yr"
            />

            {/* Tip */}
            <div
              className="flex items-start gap-2 p-3 rounded-xl text-xs text-white/40 mt-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-brand-blue/60" />
              <span>Click any value box and type your amount directly, or drag the slider. Press Enter or click away to confirm.</span>
            </div>

            {/* Pie chart + stats */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>

              {/* Donut + legend row */}
              <div className="flex items-center gap-6 mb-5">
                {/* Donut */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-36 h-36 rounded-full"
                    style={{
                      background: `conic-gradient(#1E6FFF 0% ${principalPct}%, #F5A623 ${principalPct}% 100%)`,
                      padding: '10px',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex flex-col items-center justify-center"
                      style={{ background: '#0D1F3C' }}
                    >
                      <span className="text-white/40 text-[9px] uppercase tracking-wider">Monthly</span>
                      <span className="text-brand-blue text-sm font-black leading-tight">
                        ₹{toIndianFormat(emi)}
                      </span>
                      <span className="text-white/30 text-[9px] mt-0.5">{toWordLabel(emi)}</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#1E6FFF' }} />
                    <div className="flex-1">
                      <p className="text-white/40 text-xs">Principal ({principalPct}%)</p>
                      <p className="text-white font-bold text-sm">₹{toIndianFormat(principal)}</p>
                      <p className="text-white/30 text-[10px]">{toWordLabel(principal)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#F5A623' }} />
                    <div className="flex-1">
                      <p className="text-white/40 text-xs">Total Interest ({interestPct}%)</p>
                      <p className="text-white font-bold text-sm">₹{toIndianFormat(totalInterest)}</p>
                      <p className="text-white/30 text-[10px]">{toWordLabel(totalInterest)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick-stat chips — fills the empty space */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    label: 'Total EMIs',
                    value: `${tenureMonths}`,
                    sub: `${tenureYears} yr × 12`,
                    color: '#4D8FFF',
                    bg: 'rgba(30,111,255,0.10)',
                  },
                  {
                    label: 'Interest / Year',
                    value: `₹${toIndianFormat(Math.round(totalInterest / tenureYears))}`,
                    sub: `${toWordLabel(Math.round(totalInterest / tenureYears))} avg`,
                    color: '#F5A623',
                    bg: 'rgba(245,166,35,0.10)',
                  },
                  {
                    label: 'Interest / Day',
                    value: `₹${toIndianFormat(Math.round(totalInterest / (tenureYears * 365)))}`,
                    sub: 'average daily cost',
                    color: '#FB923C',
                    bg: 'rgba(251,146,60,0.10)',
                  },
                  {
                    label: 'Total Payable',
                    value: `₹${toIndianFormat(totalPayable)}`,
                    sub: toWordLabel(totalPayable),
                    color: '#34D399',
                    bg: 'rgba(52,211,153,0.10)',
                  },
                ].map(({ label, value, sub, color, bg }) => (
                  <div
                    key={label}
                    className="rounded-xl px-3 py-2.5"
                    style={{ background: bg, border: `1px solid ${color}20` }}
                  >
                    <p className="text-[10px] font-medium mb-1" style={{ color: `${color}cc` }}>{label}</p>
                    <p className="text-white font-bold text-sm leading-tight">{value}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: `${color}80` }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Results ── */}
          <div className="space-y-5">

            {/* Monthly EMI card */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E6FFF 100%)' }}
            >
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 60%)' }} />
              <div className="relative">
                <p className="text-white/60 text-sm mb-1">Monthly EMI</p>
                <p className="text-5xl font-black text-white tracking-tight mb-1">
                  ₹{toIndianFormat(emi)}
                </p>
                <p className="text-white/50 text-sm font-medium">{toWordLabel(emi)} per month</p>
                <p className="text-white/30 text-xs mt-1">for {tenureYears} year{tenureYears > 1 ? 's' : ''} ({tenureMonths} EMIs)</p>
              </div>
            </div>

            {/* Summary breakdown */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">Amount Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Principal Amount',   value: principal,     word: toWordLabel(principal),     color: '#1E6FFF', icon: IndianRupee },
                  { label: 'Total Interest',      value: totalInterest, word: toWordLabel(totalInterest), color: '#F5A623', icon: TrendingDown },
                  { label: 'Total Payable',       value: totalPayable,  word: toWordLabel(totalPayable),  color: '#34D399', icon: BarChart3 },
                ].map(({ label, value, word, color, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-white/50 text-sm">{label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">₹{toIndianFormat(value)}</p>
                      <p className="text-xs" style={{ color }}>{word}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar showing principal vs interest */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/30 mb-1.5">
                  <span>Principal {principalPct}%</span>
                  <span>Interest {interestPct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${principalPct}%`, background: 'linear-gradient(90deg, #1E6FFF, #F5A623)' }}
                  />
                </div>
              </div>
            </div>

            {/* Amortization Schedule */}
            <div className="glass-card overflow-hidden">

              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-brand-blue" />
                  <span className="text-white font-bold text-base">Yearly Repayment Schedule</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#1E6FFF' }} />
                    Principal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#F5A623' }} />
                    Interest
                  </span>
                </div>
              </div>

              {/* Column headers */}
              <div
                className="grid text-xs text-white/35 font-semibold px-5 py-2"
                style={{
                  gridTemplateColumns: '56px 1fr 1.4fr',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  letterSpacing: '0.03em',
                }}
              >
                <span>Year</span>
                <span>Principal / Interest / Balance</span>
                <span className="pl-3">Split</span>
              </div>

              {/* Rows */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {Array.from({ length: tenureYears }, (_, i) => {
                  const yr    = schedule.slice(i * 12, (i + 1) * 12)
                  const p     = Math.round(yr.reduce((a, r) => a + r.principal, 0))
                  const int   = Math.round(yr.reduce((a, r) => a + r.interest, 0))
                  const bal   = yr[yr.length - 1]?.balance ?? 0
                  const total = p + int
                  const pPct  = Math.round((p / total) * 100)
                  const iPct  = 100 - pPct
                  const isLast = i === tenureYears - 1

                  return (
                    <div
                      key={i}
                      className="grid items-center px-5 py-3 hover:bg-white/[0.03] transition-colors"
                      style={{
                        gridTemplateColumns: '56px 1fr 1.4fr',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {/* Year badge */}
                      <span
                        className="text-xs font-extrabold px-2 py-1 rounded-lg w-fit"
                        style={{
                          background: isLast ? 'rgba(52,211,153,0.15)' : 'rgba(30,111,255,0.13)',
                          color: isLast ? '#34D399' : '#5B9BFF',
                          border: `1px solid ${isLast ? 'rgba(52,211,153,0.3)' : 'rgba(30,111,255,0.25)'}`,
                        }}
                      >
                        Y{i + 1}
                      </span>

                      {/* Amounts */}
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/30 w-10 flex-shrink-0">Princ.</span>
                          <span className="text-sm font-bold text-emerald-400">₹{toIndianFormat(p)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/30 w-10 flex-shrink-0">Int.</span>
                          <span className="text-sm font-bold" style={{ color: '#F5A623' }}>₹{toIndianFormat(int)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/30 w-10 flex-shrink-0">Bal.</span>
                          <span className="text-xs text-white/40">₹{toIndianFormat(bal)}</span>
                        </div>
                      </div>

                      {/* Stacked bar + % */}
                      <div className="pl-3 space-y-1.5">
                        <div className="flex h-4 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <div
                            className="h-full flex items-center justify-center"
                            style={{ width: `${pPct}%`, background: 'linear-gradient(90deg,#1E6FFF,#4D8FFF)' }}
                          >
                            {pPct > 20 && <span className="text-[10px] text-white font-bold">{pPct}%</span>}
                          </div>
                          <div
                            className="h-full flex-1 flex items-center justify-center"
                            style={{ background: 'linear-gradient(90deg,#C97B1A,#F5A623)' }}
                          >
                            {iPct > 12 && <span className="text-[10px] text-white font-bold">{iPct}%</span>}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span style={{ color: '#5B9BFF' }}>{pPct}% principal</span>
                          <span style={{ color: '#F5A623' }}>{iPct}% interest</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer totals */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-center"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}
              >
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Total Principal</p>
                  <p className="text-emerald-400 font-bold text-sm">₹{toIndianFormat(principal)}</p>
                  <p className="text-white/25 text-[10px]">{toWordLabel(principal)}</p>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-white/40 text-xs mb-0.5">Total Interest</p>
                  <p className="font-bold text-sm" style={{ color: '#F5A623' }}>₹{toIndianFormat(totalInterest)}</p>
                  <p className="text-white/25 text-[10px]">{toWordLabel(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Total Payable</p>
                  <p className="text-white font-bold text-sm">₹{toIndianFormat(totalPayable)}</p>
                  <p className="text-white/25 text-[10px]">{toWordLabel(totalPayable)}</p>
                </div>
              </div>

            </div>

            {/* Apply CTA */}
            <a href="/enquiry" className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
              Apply for This Loan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
