'use client'
import React, { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export function LeaderboardShowcase() {
  const [posts, setPosts] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const [topUser, setTopUser] = useState<any>(null);
  useEffect(() => {
    async function fetchTopPosts() {
      // Get top user from profiles
      const { data: leaderboard } = await supabase
        .from('profiles')
        .select('id, username, profile_image_url, kolam_karma')
        .not('kolam_karma', 'is', null)
        .order('kolam_karma', { ascending: false })
        .limit(1);
      if (!leaderboard || leaderboard.length === 0) return setLoading(false);
      setTopUser(leaderboard[0]);
      // Get their posts
      const { data: userPosts } = await supabase
        .from('community_posts')
        .select('image_url, description')
        .eq('user_id', leaderboard[0].id)
        .order('created_at', { ascending: false });
      setPosts(userPosts || []);
      setLoading(false);
    }
    fetchTopPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % posts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [posts]);

  if (loading) return (
    <div className="outer flex items-center justify-center">
      <div className="dot"></div>
      <div className="card flex items-center justify-center">
        <div className="ray"></div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-muted-foreground font-medium">Loading top Kolam creator…</span>
        </div>
      </div>
    </div>
  );
  if (!posts.length) return (
    <div className="outer flex items-center justify-center">
      <div className="dot"></div>
      <div className="card flex items-center justify-center">
        <div className="ray"></div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="text-muted-foreground font-medium">Beautiful Kolam patterns, reimagined with AI</span>
        </div>
      </div>
    </div>
  );
  const post = posts[current];
  return (
    <div className="outer flex items-center justify-center"
      style={{
        width: '100%',
        maxWidth: 640,
        minWidth: 320,
        height: 480,
        minHeight: 400,
        maxHeight: 480,
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
      <div className="dot"></div>
      <div className="card flex items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          minWidth: 320,
          minHeight: 400,
          maxWidth: 640,
          maxHeight: 480,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2rem 1.5rem'
        }}>
        <div className="ray"></div>
        <div className="w-full flex flex-col items-center justify-start" style={{ zIndex: 2 }}>
          <div className="mb-2 text-left w-full flex items-center gap-2">
            <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight font-serif md:font-display" style={{ letterSpacing: '0.03em', lineHeight: 1.1 }}>Kolam Topper Spotlight</span>
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow" style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>
              <defs>
                <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
              <ellipse cx="32" cy="60" rx="16" ry="4" fill="#d4af37" opacity="0.3" />
              <path d="M16 8v12c0 8.837 7.163 16 16 16s16-7.163 16-16V8H16z" fill="url(#trophyGold)" stroke="#bfa335" strokeWidth="2" />
              <rect x="24" y="36" width="16" height="8" rx="4" fill="#bfa335" />
              <rect x="28" y="44" width="8" height="10" rx="4" fill="#FFD700" />
              <circle cx="32" cy="8" r="6" fill="#fff8dc" stroke="#bfa335" strokeWidth="2" />
              <path d="M16 8c-6 0-8 6-8 10s2 10 8 10" stroke="#bfa335" strokeWidth="2" fill="none" />
              <path d="M48 8c6 0 8 6 8 10s-2 10-8 10" stroke="#bfa335" strokeWidth="2" fill="none" />
            </svg>
          </div>
          {topUser && (
            <div className="flex flex-row items-center gap-2 mb-2 w-full justify-start px-2 py-2 bg-black/40 rounded-xl shadow">
              <Image src={topUser.profile_image_url} alt="Profile" width={40} height={40} className="h-10 w-10 rounded-full border border-teal-300 shadow object-cover" />
              <div className="flex flex-col items-start justify-center ml-2">
                <span className="font-semibold text-base text-white drop-shadow-sm mb-0.5 whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">{topUser.username}</span>
                <span className="text-yellow-300 font-bold text-xs px-2 py-0.5 rounded bg-gray-900/60 border border-yellow-300 shadow">{topUser.kolam_karma} Karma</span>
              </div>
              <span className="ml-4 text-xs md:text-sm text-teal-200 font-medium whitespace-nowrap">Celebrating creativity &amp; skill</span>
            </div>
          )}
          <div className="w-full flex justify-center items-center overflow-x-hidden" style={{ margin: '0 auto', marginTop: 8, maxWidth: 400, minHeight: 120, maxHeight: 220 }}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ width: '100%', maxWidth: 320, minWidth: 200, transform: `translateX(-${current * 100}%)` }}
            >
              {posts.map((p, idx) => (
                <div key={idx} className="flex-shrink-0 w-full max-w-[320px] flex justify-center items-center">
                  {p.image_url ? (
                    <Image src={p.image_url} alt="Kolam" width={320} height={160} className="rounded-xl border object-contain max-h-40 bg-black" style={{ background: '#222', width: '100%', height: 'auto', maxWidth: 320, maxHeight: 160 }} />
                  ) : (
                    <div className="rounded-xl border bg-black flex items-center justify-center" style={{ width: '100%', maxWidth: 320, height: 160, color: '#fff' }}>
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-center text-xs md:text-base w-full" style={{ color: '#e0e0e0', fontWeight: 500, wordBreak: 'break-word', whiteSpace: 'pre-line', maxWidth: 400 }}>{post.description}</div>
        </div>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
    </div>
  );
}
