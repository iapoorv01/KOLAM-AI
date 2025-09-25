
import { Navbar } from '@/components/site/navbar'

export default function AboutPage() {
  return (
  <div className="min-h-screen flex flex-col font-serif">
    <Navbar />
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 font-serif text-[1.15rem] sm:text-[1.22rem] leading-relaxed">
      <div className="w-full max-w-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-900/80 dark:via-orange-900/80 dark:to-pink-900/80 rounded-3xl shadow-2xl p-10 mb-10 border-2 border-yellow-300 dark:border-yellow-800 font-serif text-gray-900 dark:text-yellow-100">
        <div className="flex flex-col items-center text-center font-serif">
          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-yellow-700 dark:text-yellow-300 mb-3 font-display drop-shadow-lg">Kolam AI</span>
          <span className="text-xl font-bold text-orange-700 dark:text-orange-300 mb-4 font-display uppercase tracking-wide">Cultural Heritage, Reimagined</span>
          <span className="inline-block text-lg text-pink-700 dark:text-pink-300 mb-5 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 font-display font-bold border border-pink-300 dark:border-pink-700">Tradition, Art & Science</span>
          <p className="text-xl sm:text-2xl text-gray-800 dark:text-yellow-100 mb-8 font-serif font-semibold">Kolam Ai is a celebration of India&apos;s living tradition&mdash;where every pattern tells a story. We blend computer vision, mathematics, and cultural wisdom to recognize, preserve, and inspire Kolam art for generations.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 mt-6 font-serif">
          <div className="flex flex-col items-center font-serif">
            <span className="text-3xl font-extrabold text-yellow-800 dark:text-yellow-200 mb-3 font-display drop-shadow">Our Vision</span>
            <ul className="list-disc list-inside text-left text-gray-900 dark:text-yellow-100 text-[1.15rem] sm:text-[1.22rem] leading-relaxed font-serif font-bold">
              <li>Empower artists and learners with intelligent recognition and stepwise guidance.</li>
              <li>Celebrate heritage through accessible, beautiful tools for all ages.</li>
              <li>Enable new forms of expression with AR and AI-powered Kolam creation.</li>
              <li>Foster community, creativity, and cultural pride worldwide.</li>
            </ul>
          </div>
          <div className="flex flex-col items-center font-serif">
            <span className="text-3xl font-extrabold text-pink-700 dark:text-pink-200 mb-3 font-display drop-shadow">Why Kolam?</span>
            <ul className="list-disc list-inside text-left text-gray-900 dark:text-yellow-100 text-[1.15rem] sm:text-[1.22rem] leading-relaxed font-serif font-bold">
              <li>Kolam is a daily ritual, a mathematical art, and a symbol of welcome and prosperity.</li>
              <li>Patterns encode symmetry, fractals, and mindfulness—drawn anew each morning.</li>
              <li>Traditions span Tamil Nadu, Andhra, Karnataka, Maharashtra, and beyond.</li>
              <li>Kolam nourishes: rice flour feeds birds and ants, art sustains spirit.</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center font-serif">
          <span className="inline-block text-sm text-yellow-900 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded font-serif font-bold border border-yellow-300 dark:border-yellow-700">We respect your privacy: No personal data is stored in this MVP. All recognition runs statelessly in your browser.</span>
        </div>
      </div>
      <div className="w-full max-w-2xl flex flex-col items-center gap-6 font-serif">
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center font-serif">
          <a href="/community" className="px-7 py-4 rounded-xl bg-yellow-700 text-white font-extrabold shadow-lg hover:bg-yellow-800 transition font-serif border-2 border-yellow-300">Join the Community</a>
          <a href="/creation" className="px-7 py-4 rounded-xl bg-pink-700 text-white font-extrabold shadow-lg hover:bg-pink-800 transition font-serif border-2 border-pink-300">Create a Kolam</a>
          <a href="/heritage-explorer" className="px-7 py-4 rounded-xl bg-orange-700 text-white font-extrabold shadow-lg hover:bg-orange-800 transition font-serif border-2 border-orange-300">Explore Heritage</a>
        </div>
      </div>
    </main>
    {/* Footer is now handled globally in layout.tsx */}
  </div>
  )
}
