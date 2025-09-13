'use client'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { ComingSoonCard } from '@/components/site/coming-soon-card'
import { Button } from '@/components/ui/button'
import { FeedbackFloating } from '@/components/site/feedback'
import { ImagePlus, Boxes, BookOpen, Users, ShieldCheck, Sparkle } from 'lucide-react'
import { LeaderboardShowcase } from '@/components/home/LeaderboardShowcase';
import { KolamCard } from '@/components/ui/KolamCard';
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="container py-8 flex flex-col items-center justify-center min-h-screen">
        <section className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center text-center px-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 text-gradient bg-gradient-to-r from-pink-500 via-yellow-500 to-indigo-500 bg-clip-text text-transparent px-4 tracking-tight text-center">
              Kolam Ai: Digitizing heritage with Ai & Ar
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Upload a Kolam, and our AI reveals its dot grid, symmetry and style. Explore a creative future for this timeless art.
            </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                <a href="/recognition" style={{ textDecoration: 'none' }}>
                  <button className="button">
                    <div className="wrap">
                      <p>
                        <span>✧</span>
                        <span>✦</span>
                        Try Kolam Recognition
                      </p>
                    </div>
                  </button>
                </a>
                <a href="#roadmap" style={{ textDecoration: 'none' }}>
                  <button className="button">
                    <div className="wrap">
                      <p>
                        <span>✧</span>
                        <span>✦</span>
                        Roadmap
                      </p>
                    </div>
                  </button>
                </a>
              </div>
          </div>
          <div className="w-full flex items-center justify-center mt-8 lg:mt-0">
            <LeaderboardShowcase />
          </div>
        </section>

  <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full justify-center text-center">
          {/* KolamCard replacements for all cards */}
          <KolamCard
            title="Kolam Recognition"
            description="Working MVP – upload a Kolam image, get AI analysis."
            buttonText="Open"
            buttonHref="/recognition"
            icon={<Sparkle className="h-5 w-5 text-cyan-400" />}
            list={["AI dot grid detection", "Symmetry analysis", "Style recognition"]}
          />
          <KolamCard
            title="AI Kolam Generator"
            description="Create new Kolam patterns from a style prompt."
            buttonText="Open"
            buttonHref="/creation"
            icon={<Boxes className="h-5 w-5 text-cyan-400" />}
            list={["Prompt-based creation", "Unique patterns", "Download SVG/PNG"]}
          />
          <KolamCard
            title="Kolam Community Hub"
            description="Share designs, upvote, download SVG/PNG."
            buttonText="Open"
            buttonHref="/community"
            icon={<Users className="h-5 w-5 text-cyan-400" />}
            list={["Share & vote", "Download designs", "Community showcase"]}
          />
          <KolamCard
            title="Kolam Leaderboard"
            description="See top creators by Kolam Karma."
            buttonText="View Leaderboard"
            buttonHref="/leaderboard"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy w-6 h-6 text-yellow-400 drop-shadow"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>}
            list={["Top creators", "Kolam Karma points", "Leaderboard rewards"]}
          />
          <KolamCard
            title="AR Kolam Designer"
            description="Place Kolams in real-world AR using your phone camera."
            buttonText="Try AR Designer"
            buttonHref="/ar-designer"
            icon={<ImagePlus className="h-5 w-5 text-blue-400" />}
            list={["AR placement", "Mobile friendly", "Real-world preview"]}
          />
          <KolamCard
            title="Kolam Heritage Explorer"
            description="History and cultural significance of Kolams."
            buttonText="Explore"
            buttonHref="/heritage-explorer"
            icon={<BookOpen className="h-5 w-5 text-cyan-400" />}
            list={["History & culture", "Regional styles", "Interactive timeline"]}
          />
          <KolamCard
            title="Secure Kolam Auth"
            description="NFT/Blockchain proof of originality."
            buttonText="Coming Soon"
            icon={<ShieldCheck className="h-5 w-5 text-cyan-400" />}
            list={["NFT proof", "Blockchain security", "Originality verification"]}
          />
        </section>

        <section id="roadmap" className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Roadmap</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/15 grid place-items-center text-primary">1</div>
              <div>
                <h4 className="font-semibold">MVP: Kolam Recognition</h4>
                <p className="text-sm text-muted-foreground">Upload, analyze, visualize results. Done.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-80">
              <div className="h-8 w-8 rounded-full bg-accent grid place-items-center">2</div>
              <div>
                <h4 className="font-semibold">AR Designer & Generator</h4>
                <p className="text-sm text-muted-foreground">Create and place Kolams in AR; AI-generated patterns.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-80">
              <div className="h-8 w-8 rounded-full bg-accent grid place-items-center">3</div>
              <div>
                <h4 className="font-semibold">Community & Heritage</h4>
                <p className="text-sm text-muted-foreground">Share, vote, learn. Secure originality with blockchain.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FeedbackFloating />
    </div>
  )
}
