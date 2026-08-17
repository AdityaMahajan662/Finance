'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, IndianRupee, Building, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const stats = [
  {
    icon: IndianRupee,
    value: 5000,
    suffix: 'Cr+',
    label: 'Loans Disbursed',
    description: 'Total amount sanctioned',
    color: '#1E6FFF',
  },
  {
    icon: Users,
    value: 2,
    suffix: 'L+ Customers',
    label: 'Happy Members',
    description: 'Across 15 states in India',
    color: '#F5A623',
  },
  {
    icon: Building,
    value: 120,
    suffix: '+',
    label: 'Branch Network',
    description: 'Pan India presence',
    color: '#A78BFA',
  },
  {
    icon: Star,
    value: 4.8,
    suffix: '/5',
    label: 'Customer Rating',
    description: 'Based on 50,000+ reviews',
    color: '#34D399',
  },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const isDecimal = target % 1 !== 0
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target, duration, start])

  return count
}

function StatCard({ stat, animate, t }) {
  const count = useCountUp(stat.value, 2000, animate)
  const Icon = stat.icon

  return (
    <div className="glass-card-hover p-8 text-center group">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
      >
        <Icon className="w-7 h-7" style={{ color: stat.color }} />
      </div>
      <div className="text-4xl font-black text-white mb-1">
        {count}
        <span style={{ color: stat.color }}>{t(`stats.${stat.id}.suffix`)}</span>
      </div>
      <div className="text-white font-semibold mb-1">{t(`stats.${stat.id}.label`)}</div>
      <div className="text-white/40 text-sm">{t(`stats.${stat.id}.desc`)}</div>
    </div>
  )
}

export default function StatsSection() {
  const { t } = useLanguage()
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #04091A 0%, #0A1628 50%, #04091A 100%)' }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-tag">{t('stats.tag')}</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('stats.title1')} <span className="gradient-text">{t('stats.title2')}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t('stats.desc')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={{...stat, id: i}} animate={animate} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
