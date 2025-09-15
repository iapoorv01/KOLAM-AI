'use client'
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface LeaderboardUser {
  id: string;
  username: string;
  profile_image_url: string;
  kolam_karma: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, username, profile_image_url, kolam_karma')
      .not('kolam_karma', 'is', null)
      .order('kolam_karma', { ascending: false })
      .then(({ data }) => setLeaderboard((data as LeaderboardUser[]) || []));
  }, []);

  // Responsive top 3 order
  const [topOrder, setTopOrder] = useState([1,0,2]);
  useEffect(() => {
    function handleResize() {
      setTopOrder(window.innerWidth < 768 ? [0,1,2] : [1,0,2]);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-center text-white drop-shadow-lg tracking-wide">Kolam Leaderboard</h1>
        <div className="rounded-2xl border border-blue-400/40 bg-card p-4 md:p-8 shadow-2xl">
          {leaderboard.length === 0 && <div className="text-blue-200 text-lg">No leaderboard data.</div>}
          {/* Top 3 users row */}
          {leaderboard.length > 0 && (
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-8 mb-8 md:mb-10">
              {topOrder.map((pos, i) => {
                const user = leaderboard[pos];
                if (!user) return null;
                const rankColors = [
                  'from-yellow-300 to-yellow-500',
                  'from-gray-300 to-gray-500',
                  'from-orange-300 to-orange-500'
                ];
                const icon = pos === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-yellow-400 drop-shadow"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.44 4.73L5.8 21z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-yellow-300"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">{pos+1}</text></svg>
                );
                // Top 1 gets bigger avatar
                const avatarSize = pos === 0 ? 96 : 72;
                return (
                  <div key={user.id} className={`flex flex-col items-center ${pos === 0 ? 'scale-110 z-10' : 'scale-95'} transition-all duration-300 w-full md:w-auto`}>
                    <div className={`relative mb-2`} style={{ width: avatarSize, height: avatarSize }}>
                      <div className={`w-full h-full rounded-full border-4 border-yellow-400 shadow-xl bg-gradient-to-br ${rankColors[i]} flex items-center justify-center`}>
                        <Image
                          src={user.profile_image_url ? user.profile_image_url : '/default-profile.png'}
                          alt="Profile"
                          width={avatarSize}
                          height={avatarSize}
                          className={`rounded-full object-cover w-full h-full`} 
                        />
                      </div>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2">{icon}</span>
                    </div>
                    <a
                      href={`/profile/${user.id}`}
                      className="font-bold text-base md:text-lg text-white drop-shadow transition-transform duration-200 hover:scale-110 hover:drop-shadow-lg hover:text-yellow-200 cursor-pointer"
                    >
                      {user.username}
                    </a>
                    <span className="text-yellow-200 font-bold text-sm md:text-base flex items-center gap-1">{user.kolam_karma} Karma</span>
                  </div>
                );
              })}
            </div>
          )}
          {/* Rest of leaderboard in two columns */}
          {leaderboard.length > 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {leaderboard.slice(3).map((user, idx) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 md:gap-4 px-2 py-2 md:px-4 md:py-3 rounded-xl shadow-lg bg-card border border-blue-100/20"
                >
                  <span className="font-extrabold text-base md:text-xl text-white">#{idx + 4}</span>
                  <Image
                    src={user.profile_image_url ? user.profile_image_url : '/default-profile.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-blue-200 shadow-md object-cover bg-blue-50"
                  />
                  <a
                    href={`/profile/${user.id}`}
                    className="font-semibold text-base md:text-lg text-white drop-shadow transition-transform duration-200 hover:scale-110 hover:drop-shadow-lg hover:text-yellow-200 cursor-pointer"
                  >
                    {user.username}
                  </a>
                  <span className="ml-auto text-yellow-600 font-bold text-sm md:text-lg flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="inline-block text-yellow-400"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.44 4.73L5.8 21z"/></svg>
                    {user.kolam_karma} Karma
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
