'use client';
import * as React from 'react';
import { SignInForm } from '@/components/site/auth-modal';
import Link from 'next/link';

export default function SignInPage() {
  // Remove global background immediately for video background
  React.useEffect(() => {
    const original = document.body.style.background;
    document.body.style.background = 'none';
    return () => { document.body.style.background = original; };
  }, []);
  return (
  <div style={{position: 'relative', minHeight: '100vh', width: '100%'}} className="font-display bg-gradient-to-br from-[#7b1f1f] via-[#f9e7c2] to-[#a67c52]">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/Bg.mp4"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
  <div style={{position: 'relative', zIndex: 2, width: '100%'}}>
        <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
          <div className="w-full max-w-lg mx-auto sm:p-0 p-2">
            <div className="mb-8 text-left md:text-center">
              <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#7b1f1f] drop-shadow-xl mb-2 tracking-tight leading-tight text-center sm:text-center" style={{fontFamily: 'Georgia, Times, serif', textShadow: '0 2px 8px #f9e7c2, 0 0px 1px #a67c52', wordBreak: 'break-word'}}>
                <span className="block">Welcome Back to Kolam&nbsp;AI!</span>
              </h1>
              <p className="text-base sm:text-lg text-white font-display mb-2 drop-shadow" style={{fontFamily: 'Georgia, Times, serif', textShadow: '0 2px 8px #a67c52, 0 1px 4px #7b1f1f'}}>
                Sign in to explore, create, and share beautiful Kolam patterns.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f9e7c2]/90 via-[#fff]/80 to-[#a67c52]/80 border-4 border-[#a67c52] p-4 sm:p-8 rounded-3xl shadow-2xl" style={{boxShadow: '0 4px 32px #7b1f1f55, 0 0 0 8px #f9e7c2aa'}}>
              <SignInForm />
            </div>
            <div className="mt-6 text-center text-sm sm:text-base">
              <span className="text-[#a67c52] font-semibold" style={{textShadow: '0 1px 4px #7b1f1f'}}>Don&#39;t have an account?</span>
              <Link href="/signup" className="ml-2 text-white font-bold underline hover:text-[#a67c52] transition" style={{textShadow: '0 2px 8px #a67c52, 0 1px 4px #7b1f1f'}}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}