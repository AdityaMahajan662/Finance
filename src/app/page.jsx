import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import LoanTypesPreview from '@/components/home/LoanTypesPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const processSteps = [
  { step: '01', title: 'Apply Online', desc: 'Fill in your details and choose your loan type. Takes just 5 minutes.' },
  { step: '02', title: 'Document Upload', desc: 'Upload your KYC and income documents securely from your phone or laptop.' },
  { step: '03', title: 'Quick Approval', desc: 'Our AI-powered system reviews your application and gives you a decision in 24 hours.' },
  { step: '04', title: 'Money in Account', desc: 'Once approved, funds are transferred directly to your bank account.' },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <LoanTypesPreview />

      {/* How it works */}
      <section className="py-20 px-4 md:px-8 relative">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0A1628 0%, #04091A 50%, #0A1628 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-tag">Simple Process</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Get a Loan in <span className="gradient-text">4 Easy Steps</span>
            </h2>
            <p className="text-white/50 text-lg mt-4 max-w-xl mx-auto">
              Our streamlined digital process means you spend less time on paperwork and more time on what matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <div key={s.step} className="glass-card p-6 relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="text-6xl font-black text-brand-blue/10 absolute top-4 right-4 leading-none">
                  {s.step}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-brand-blue font-bold text-lg mb-4"
                  style={{ background: 'rgba(30,111,255,0.15)', border: '1px solid rgba(30,111,255,0.25)' }}
                >
                  {s.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5" style={{ background: 'linear-gradient(90deg, rgba(30,111,255,0.5), transparent)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-16 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E6FFF 50%, #1E3A8A 100%)' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%)' }}
            />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Join over 2 lakh customers who trust Khushal Finance for their financial needs. Apply today and get a response within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Zero hidden charges', 'No prepayment penalty', 'Doorstep service'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-brand-gold" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/enquiry" className="btn-gold text-base px-10 py-4 gap-2 group inline-flex">
                Apply for Loan Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
