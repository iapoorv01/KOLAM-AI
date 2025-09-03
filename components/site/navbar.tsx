import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-accent" /> Kolam Ai
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/recognition">Recognition</Link>
          <Link href="/about">About</Link>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hidden sm:inline">Deploy</a>
        </nav>
      </div>
    </header>
  )
}
