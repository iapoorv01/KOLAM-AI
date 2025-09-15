import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export default function AboutPage() {
  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <Navbar />
  <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 font-serif text-[1.08rem] sm:text-[1.15rem] leading-relaxed">
  <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 mb-8 border border-cyan-100 dark:border-gray-800 font-serif text-gray-800 dark:text-gray-100">
          <div className="flex flex-col items-center text-center font-serif">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-cyan-700 dark:text-cyan-300 mb-2 font-display">Kolam Ai</span>
            <span className="text-lg font-semibold text-pink-600 dark:text-pink-300 mb-4 font-display">Digitizing Heritage with AI & AR</span>
            <span className="inline-block text-base text-yellow-700 dark:text-yellow-300 mb-4 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30 font-display">Where Science Meets the Divine</span>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-6 font-serif">Kolam Ai is a mission to preserve, understand, and reimagine the living tradition of Kolam. We blend computer vision, mathematics, and cultural sensitivity to recognize patterns, reveal structures, and inspire creativity for all.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 mt-4 font-serif">
            <div className="flex flex-col items-center font-serif">
              <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-200 mb-2 font-display">Our Vision</span>
              <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-200 text-[1.08rem] sm:text-[1.15rem] leading-relaxed font-serif">
                <li>Empower learners and artists with intelligent recognition and step-by-step guidance.</li>
                <li>Celebrate heritage through accessible, modern tools for all ages.</li>
                <li>Enable new forms of expression with AR and AI-powered Kolam generation.</li>
                <li>Foster community, creativity, and cultural pride worldwide.</li>
              </ul>
            </div>
            <div className="flex flex-col items-center font-serif">
              <span className="text-2xl font-bold text-pink-600 dark:text-pink-200 mb-2 font-display">Why Kolam?</span>
              <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-200 text-[1.08rem] sm:text-[1.15rem] leading-relaxed font-serif">
                <li>Kolam is a daily ritual, a mathematical art, and a symbol of welcome and prosperity.</li>
                <li>Patterns encode symmetry, fractals, and mindfulness—drawn anew each morning.</li>
                <li>Traditions span Tamil Nadu, Andhra, Karnataka, Maharashtra, and beyond.</li>
                <li>Kolam nourishes: rice flour feeds birds and ants, art sustains spirit.</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center font-serif">
            <span className="inline-block text-xs text-muted-foreground bg-cyan-50 dark:bg-gray-800 px-3 py-1 rounded font-serif">We respect your privacy: No personal data is stored in this MVP. All recognition runs statelessly in your browser.</span>
          </div>
        </div>
  <div className="w-full max-w-2xl flex flex-col items-center gap-4 font-serif">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center font-serif">
            <a href="/community" className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 transition font-serif">Join the Community</a>
            <a href="/creation" className="px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition font-serif">Create a Kolam</a>
            <a href="/heritage-explorer" className="px-6 py-3 rounded-lg bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition font-serif">Explore Heritage</a>
          </div>
        </div>
      </main>
      {/* Footer is now handled globally in layout.tsx */}
    </div>
  )
}
