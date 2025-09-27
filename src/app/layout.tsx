import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nhung Nguyen - Senior M&E & Gender Inclusion Consultant',
  description: 'Advancing measurable impact for international development organizations. 15+ years experience with UNOPS, IFC, ADB.',
  keywords: 'M&E, monitoring evaluation, gender inclusion, international development, UNOPS, IFC, ADB',
  authors: [{ name: 'Nhung Nguyen' }],
  openGraph: {
    title: 'Nhung Nguyen - Senior M&E & Gender Inclusion Consultant',
    description: 'Advancing measurable impact for international development organizations',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}