import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Kolam Ai: Digitizing heritage with Ai & Ar',
  description: 'Kolam recognition and creative tools powered by AI and AR.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
