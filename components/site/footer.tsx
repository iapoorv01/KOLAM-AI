export function Footer() {
  return (
    <footer
      className="border-t mt-16 bg-gradient-to-r from-[#800000] via-[#FFD700]/30 to-[#4B1E13] text-[#FFD700] shadow-2xl w-full font-serif"
      style={{ position: 'relative', zIndex: 10, fontFamily: 'Cinzel Decorative, serif' }}
    >
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-black tracking-wide" style={{color: '#FFD700', fontFamily: 'Cinzel Decorative, serif', textShadow: '0 1px 8px #800000'}}>Kolam AI</span>
            <span className="text-[#FFD700] animate-pulse" style={{fontSize: '1.5rem'}}>✦</span>
          </div>
          <div className="mb-2">
            <span style={{fontFamily: 'Cinzel Decorative, serif', color: '#FFD700', fontSize: '1.1rem', letterSpacing: '0.05em', textShadow: '0 1px 8px #800000', background: 'linear-gradient(90deg, #FFD700 60%, #800000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              मङ्गलं कल्याणम् (Mangalam Kalyāṇam)
            </span>
          </div>
          <p className="text-sm opacity-90 text-[#FFF8E1]" style={{fontFamily: 'Merriweather, serif'}}>Crafted with devotion and creativity, inspired by the timeless art of Kolam.</p>
          <p className="text-xs mt-2 italic text-[#FFD700]/80">SciDivine – Where Science Meets the Divine.</p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm opacity-80 text-[#FFD700]">&copy; {new Date().getFullYear()} Kolam AI. All rights reserved.</p>
          <div className="flex gap-3 mt-2">
            <a href="https://github.com/iapoorv01/KOLAM-AI" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors" aria-label="GitHub">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg>
            </a>
            <a href="mailto:scidivine.team@gmail.com" className="hover:text-[#FFD700] transition-colors" aria-label="Email">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
