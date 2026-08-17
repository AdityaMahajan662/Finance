'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, TrendingDown, Clock, Award, CheckCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success'
  const [formData, setFormData] = useState({
    loanType: 'Home',
    amount: '',
    name: '',
    mobile: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  const trustBadges = [
    { icon: Shield, label: t('hero.badge1') },
    { icon: TrendingDown, label: t('hero.badge2') },
    { icon: Clock, label: t('hero.badge3') },
    { icon: Award, label: t('hero.badge4') },
  ]
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 mesh-bg" />

      {/* Animated orbs */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1E6FFF, transparent)', animation: 'float 6s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5A623, transparent)', animation: 'float 8s ease-in-out infinite reverse' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div style={{ animation: 'fade-up 0.8s ease-out forwards' }}>
            <div className="section-tag mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-blue" style={{ animation: 'pulse-blue 2s ease-in-out infinite' }} />
              {t('hero.tag')}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tight">
              {t('hero.title1')}{' '}
              <span className="gradient-text block">{t('hero.title2')}</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed mb-8 max-w-lg">
              {t('hero.desc1')}{' '}
              <span className="text-brand-gold font-semibold">{t('hero.rate')}</span> {t('hero.desc2')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/enquiry" className="btn-primary text-base px-8 py-4 gap-2 group">
                {t('nav.apply')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/calculator" className="btn-secondary text-base px-8 py-4">
                {t('nav.calculator')}
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <Icon className="w-4 h-4 text-brand-blue" />
                  <span className="text-white/70 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content — Loan Card Widget */}
          <div className="relative" style={{ animation: 'fade-up 0.8s ease-out 0.2s both' }}>
            {/* Main card */}
            <div className="glass-card p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: 'linear-gradient(135deg, #1E6FFF 0%, transparent 60%)' }}
              />
              <div className="relative">
                {status === 'loading' ? (
                  <div className="text-center py-12 space-y-6">
                    <Loader2 className="w-12 h-12 text-brand-blue animate-spin mx-auto" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Analyzing Profile...</h3>
                      <p className="text-white/60 text-sm">Please wait while we check your eligibility.</p>
                    </div>
                  </div>
                ) : status === 'success' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Congratulations, {formData.name.split(' ')[0] || 'User'}!</h3>
                    <p className="text-white/80">
                      You are eligible for a <span className="font-semibold text-emerald-400">{formData.loanType} Loan</span>.
                    </p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4 mb-6">
                      <p className="text-sm text-white/50 mb-1">Pre-approved Amount up to</p>
                      <p className="text-3xl font-black text-brand-gold">
                        ₹ {formData.amount ? (parseInt(formData.amount) * 1.2).toLocaleString('en-IN') : '5,00,000'}
                      </p>
                    </div>
                    <Link href={`/enquiry?type=${formData.loanType}&amount=${formData.amount}`} className="btn-primary w-full py-4 text-base flex items-center justify-center">
                      Complete Application <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <button type="button" onClick={() => setStatus('idle')} className="mt-4 block w-full text-center text-white/40 hover:text-white transition-colors text-sm">
                      Start Over
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-white/50 text-sm mb-1">{t('hero.form.subtitle')}</p>
                        <h3 className="text-2xl font-bold">{t('hero.form.title')}</h3>
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium text-emerald-400" style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
                        {t('hero.form.badge')}
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-white/50 text-sm block mb-1.5">{t('hero.form.selectType')}</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[t('loans.home'), t('loans.car'), t('loans.personal')].map((tLabel, i) => {
                            const rawTypes = ['Home', 'Car', 'Personal']
                            const isSelected = formData.loanType === rawTypes[i]
                            return (
                              <div
                                key={i}
                                onClick={() => setFormData({...formData, loanType: rawTypes[i]})}
                                className="px-3 py-2 rounded-lg text-center text-sm cursor-pointer transition-all duration-200"
                                style={{
                                  background: isSelected ? 'rgba(30,111,255,0.2)' : 'rgba(255,255,255,0.05)',
                                  border: isSelected ? '1px solid rgba(30,111,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
                                  color: isSelected ? '#4D8FFF' : 'rgba(255,255,255,0.6)',
                                }}
                              >
                                {tLabel}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-white/50 text-sm block mb-1.5">{t('hero.form.amount')}</label>
                          <input 
                            type="number" 
                            required
                            placeholder="₹ 5,00,000"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            className="input-field w-full text-white bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" 
                          />
                        </div>
                        <div>
                          <label className="text-white/50 text-sm block mb-1.5">Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="input-field w-full text-white bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-white/50 text-sm block mb-1.5">{t('hero.form.mobile')}</label>
                          <input 
                            type="tel" 
                            required
                            placeholder={`+91 ${t('hero.form.mobilePlace')}`}
                            value={formData.mobile}
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                            className="input-field w-full text-white bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" 
                          />
                        </div>
                        <div>
                          <label className="text-white/50 text-sm block mb-1.5">Email</label>
                          <input 
                            type="email" 
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="input-field w-full text-white bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" 
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-base">
                      {t('hero.form.btn')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>

                    <Link href="/contact" className="btn-secondary w-full py-3 mt-3 text-sm border-white/10 hover:border-brand-blue/30 text-white/70 hover:text-white flex items-center justify-center">
                      Quick Enquiry
                    </Link>

                    <p className="text-white/30 text-xs text-center mt-3">
                      {t('hero.form.note')}
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 glass-card px-4 py-3 flex items-center gap-2"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-white/80">{t('hero.float1')}</span>
            </div>

            {/* Bottom floating stat */}
            <div
              className="absolute -bottom-4 -left-4 glass-card px-4 py-3"
              style={{ animation: 'float 5s ease-in-out 1s infinite' }}
            >
              <p className="text-xs text-white/50">{t('hero.float2')}</p>
              <p className="text-lg font-bold text-brand-gold">{t('hero.float3')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
