import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Khushal Finance — Loan Enquiry Portal',
  description: 'Apply for home loans, car loans, personal loans and more at Khushal Finance. Fast approval, competitive interest rates, and hassle-free processing.',
  keywords: 'bank loan, home loan, car loan, personal loan, EMI calculator, loan enquiry',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-navy-900 text-white antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
