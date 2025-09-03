import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { ComingSoonCard } from '@/components/site/coming-soon-card'
import { Button } from '@/components/ui/button'
import { FeedbackFloating } from '@/components/site/feedback'
import { ImagePlus, Boxes, BookOpen, Users, ShieldCheck, Sparkle } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="container py-12">
        <section className="grid gap-6 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Kolam Ai: Digitizing heritage with Ai & Ar
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Upload a Kolam, and our AI reveals its dot grid, symmetry and style. Explore a creative future for this timeless art.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/recognition">Try Kolam Recognition</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#roadmap">Roadmap</a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-rose-100 to-emerald-100 grid place-items-center text-muted-foreground font-medium">
              Beautiful Kolam patterns, reimagined with AI
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Kolam Recognition</h3>
            <p className="text-sm text-muted-foreground">Working MVP – upload a Kolam image, get AI analysis.</p>
            <div className="mt-4"><Button asChild><Link href="/recognition">Open</Link></Button></div>
          </div>

          <ComingSoonCard title="AR Kolam Designer" description="Place Kolams in real-world AR." icon={<ImagePlus className="h-5 w-5" />} />
          <ComingSoonCard title="AI Kolam Generator" description="Create new Kolam patterns from a style prompt." icon={<Sparkle className="h-5 w-5" />} />
          <ComingSoonCard title="Kolam Heritage Explorer" description="History and cultural significance of Kolams." icon={<BookOpen className="h-5 w-5" />} />
          <ComingSoonCard title="Kolam Community Hub" description="Share designs, upvote, download SVG/PNG." icon={<Users className="h-5 w-5" />} />
          <ComingSoonCard title="Secure Kolam Auth" description="NFT/Blockchain proof of originality." icon={<ShieldCheck className="h-5 w-5" />} />
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
