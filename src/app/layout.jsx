import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Jiju Bank — Loan Enquiry Portal',
  description: 'Apply for home loans, car loans, personal loans and more at Jiju Bank. Fast approval, competitive interest rates, and hassle-free processing.',
  keywords: 'bank loan, home loan, car loan, personal loan, EMI calculator, loan enquiry',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-900 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
