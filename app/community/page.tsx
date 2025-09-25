import { Navbar } from '@/components/site/navbar';
import { Button } from '@/components/ui/button';
import { CommunityFeed } from '@/components/community/CommunityFeed';

export default function CommunityHubPage() {
  return (
    <div className="min-h-screen font-display relative">
      <Navbar />
      <main className="container py-6 md:py-10 flex flex-col items-start justify-start">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-2 md:px-6 lg:px-8 xl:px-12">
          <div className="mb-8 text-left">
            <h1
              className="text-4xl sm:text-4xl md:text-6xl font-extrabold font-serif mb-2 text-center tracking-widest uppercase border-b-4 border-yellow-400 pb-2 drop-shadow-[0_2px_12px_rgba(255,215,0,0.7)] max-w-full break-words mx-auto"
              style={{
                background: 'linear-gradient(90deg, #FFD700 0%, #FFB300 50%, #fffde7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.12em'
              }}
            >
              <span className="block sm:inline">Kolam</span>
              <span className="block sm:inline">Community</span>
              <span className="block sm:inline">Hub <span style={{WebkitTextFillColor: '#FFD700'}}>🪔</span></span>
            </h1>
            <p className="text-lg md:text-2xl font-bold font-serif mb-2 text-center text-[#FFD700] drop-shadow-[0_2px_8px_rgba(255,215,0,0.7)] tracking-wide">Share your Kolam designs, upvote, comment, and download SVG/PNG. Celebrate tradition and creativity!</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 border-2 border-yellow-500 text-yellow-800 p-4 md:p-5 rounded-3xl mb-6 shadow-xl flex flex-col items-start">
            <span className="text-sm md:text-base font-bold font-serif tracking-tight mb-1">Join the community and showcase your creativity in the spirit of Kolam heritage!</span>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 dark:bg-yellow-900 rounded-3xl shadow-xl p-4 md:p-6 mb-6 border-2 border-yellow-500">
            <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 dark:bg-yellow-900 rounded-2xl shadow-xl p-4 md:p-6 border-2 border-yellow-500">
              {/* TODO: Feed, post modal, leaderboard, profile links, etc. */}
              <CommunityFeed />
            </div>
          </div>
        </div>
      </main>
      {/* Footer is now handled globally in layout.tsx */}
    </div>
  );
}
