import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="container py-12 prose prose-stone max-w-3xl">
        <h1>About Kolam Ai</h1>
        <p>
          Kolam Ai: Digitizing heritage with Ai & Ar is a mission to preserve, understand and reimagine the living tradition of Kolam. We blend computer vision with cultural sensitivity to recognize patterns, reveal structures and inspire creativity.
        </p>
        <h2>Our goals</h2>
        <ul>
          <li>Assist learners and artists with intelligent recognition and guidance.</li>
          <li>Celebrate heritage through accessible, modern tools.</li>
          <li>Enable new forms of expression with AR and AI generation.</li>
        </ul>
        <p className="text-muted-foreground">We don’t store your data in this MVP. Everything runs statelessly.</p>
      </main>
      <Footer />
    </div>
  )
}
