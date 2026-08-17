import Link from 'next/link'
import { ArrowRight, Home, Car, User, Briefcase, Coins, GraduationCap } from 'lucide-react'

const iconMap = { Home, Car, User, Briefcase, Coins, GraduationCap }

const loans = [
  { icon: 'Home', type: 'Home Loan', rate: '8.50%', max: '₹5 Cr', color: '#1E6FFF', bg: 'rgba(30,111,255,0.12)', border: 'rgba(30,111,255,0.25)' },
  { icon: 'Car', type: 'Car Loan', rate: '7.99%', max: '₹75 L', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
  { icon: 'User', type: 'Personal Loan', rate: '10.99%', max: '₹40 L', color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.25)' },
  { icon: 'Briefcase', type: 'Business Loan', rate: '11.50%', max: '₹2 Cr', color: '#FB923C', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.25)' },
  { icon: 'GraduationCap', type: 'Education Loan', rate: '9.50%', max: '₹1.5 Cr', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.25)' },
]

export default function LoanTypesPreview() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="section-tag">Loan Products</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Find the <span className="gradient-text">Right Loan</span>
              <br />for You
            </h2>
          </div>
          <Link
            href="/loans"
            className="flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all duration-200"
          >
            View All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => {
            const Icon = iconMap[loan.icon]
            return (
              <Link
                key={loan.type}
                href={`/loans?type=${loan.icon.toLowerCase()}`}
                className="glass-card-hover p-6 group cursor-pointer block"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: loan.bg, border: `1px solid ${loan.border}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: loan.color }} />
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: loan.bg, color: loan.color, border: `1px solid ${loan.border}` }}
                  >
                    From {loan.rate}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-blue-light transition-colors duration-200">
                  {loan.type}
                </h3>
                <p className="text-white/40 text-sm mb-4">
                  Up to <span className="text-white/70 font-semibold">{loan.max}</span>
                </p>

                <div className="flex items-center gap-2 text-brand-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-0.5 rounded-full mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: `linear-gradient(90deg, ${loan.color}, transparent)` }}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
