import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/components/site/auth-context'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Kolam Ai: Digitizing heritage with Ai & Ar',
  description: 'Kolam recognition and creative tools powered by AI and AR.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen flex flex-col">
        {/* Global video background */}
        <video
          id="global-video-bg"
          autoPlay
          loop
          muted
          playsInline
          src="/Bg.mp4"
        />
        <AuthProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
