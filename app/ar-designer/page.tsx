"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { startKolamAR } from "@/lib/ar-kolam-webxr";
import { startKolamARjs } from "@/lib/ar-kolam-arjs";
// import { removeBackground } from "@/lib/bodypix-loader";
;

export default function ARKolamDesigner() {
  const [kolamImg, setKolamImg] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load AR image from sessionStorage if redirected from creation page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const arImg = sessionStorage.getItem('kolam_ar_image');
      if (arImg) {
        setKolamImg(arImg);
        sessionStorage.removeItem('kolam_ar_image');
      }
    }
  }, []);

  // Check for WebXR support
  useEffect(() => {
    if (typeof window !== "undefined" && (navigator as any).xr) {
      (navigator as any).xr.isSessionSupported("immersive-ar").then((supported: boolean) => {
        setArSupported(supported);
      });
    } else {
      setArSupported(false);
    }
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImgError(null);
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setImgError('No file selected.');
      setKolamImg(null);
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/removebackground', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const error = await res.json();
        setImgError(error.error || 'Background removal failed.');
        setKolamImg(null);
        setLoading(false);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setKolamImg(url);
      setImgError(null);
    } catch (err) {
      setImgError('Background removal failed, showing original image.');
      setKolamImg(null);
    }
    setLoading(false);
  }

  // Detect desktop/laptop
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua));
    }
  }, []);

  if (isMobile === null) {
    // Render nothing or a loading spinner until device type is known
    return null;
  }

  if (!isMobile) {
    return (
      <div>
        <Navbar />
        <main className="container py-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-extrabold font-serif mb-2 text-center tracking-widest uppercase border-b-4 border-yellow-400 pb-2 drop-shadow-[0_2px_12px_rgba(255,215,0,0.7)] max-w-full break-words mx-auto"
                style={{
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFB300 50%, #fffde7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.12em'
                }}
              >
                <span className="inline-block align-middle mr-2">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="inline-block">
                    <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="3" fill="#FFF8E1" />
                    <path d="M20 8 L24 20 L20 32 L16 20 Z" fill="#FFD700" />
                  </svg>
                </span>
                AR Kolam Visualizer
              </h1>
              <p className="text-xl md:text-2xl font-bold font-serif mb-2 text-center text-[#FFD700] drop-shadow-[0_2px_8px_rgba(255,215,0,0.7)] tracking-wide">Kolam AR is only available on mobile devices.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 border-4 border-yellow-400 text-yellow-800 p-5 rounded-[2.5rem] mb-6 shadow-lg flex flex-col items-center">
              <span className="text-base font-bold font-display tracking-tight mb-1">Please use your phone or tablet to place Kolam designs in Augmented Reality.</span>
            </div>
          </div>
        </main>
        {/* Footer is now handled globally in layout.tsx */}
      </div>
    );
  }

  // Mobile UI
  return (
    <div className="min-h-screen font-display relative">
      <Navbar />
      <main className="container py-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold font-serif text-[#4B2E05] drop-shadow-2xl mb-2 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#F9D276] to-[#FFF8E1] bg-clip-text text-transparent">AR Kolam Visualizer</span>
            </h1>
            <p className="text-xl font-serif mb-2 italic text-white" style={{textShadow: '0 2px 8px #FFD700'}}>Experience the vibrant tradition of Kolam art in Augmented Reality.<br />Upload your Kolam/Rangoli design and place it in your space!</p>
          </div>
          <div className="bg-[#FFF8E1]/90 border-4 border-[#FFD700] text-[#4B2E05] p-6 rounded-[2.5rem] mb-6 shadow-2xl flex flex-col items-center backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-7 h-7 text-[#FFD700]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="none"/><path d="M12 8v4l3 2" stroke="#4B2E05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-base font-semibold font-display tracking-tight">Best Experience</span>
            </div>
            <div className="text-sm font-medium mb-1">Use <span className="text-[#4B2E05] font-bold">Android Chrome</span> or <span className="text-[#4B2E05] font-bold">iOS Safari</span></div>
            <div className="text-sm mb-1"><span className="font-bold text-[#4B2E05]">Floor placement</span> requires ARCore/ARKit/WebXR support.</div>
            <div className="text-sm"><span className="font-bold text-[#4B2E05]">Marker AR</span> works everywhere: Point your camera at the <a href="https://ar-js-org.github.io/AR.js-Docs/marker-training/examples/hiro-marker.png" target="_blank" rel="noopener noreferrer" className="underline text-[#FFD700]">Hiro marker</a> to see your Kolam appear.</div>
            <div className="mt-3 text-xs italic text-[#4B2E05]">Kolam is a daily ritual in South Indian homes, symbolizing prosperity, positivity, and tradition.</div>
          </div>
          <div className="bg-[#FFF8E1] dark:bg-[#B34700] rounded-[2rem] shadow-xl p-6 mb-6 border-4 border-[#FFD700]">
            <div className="bg-gradient-to-br from-[#FFF8E1]/60 via-[#FFE0B2]/60 to-[#FFD180]/60 dark:from-[#B34700]/60 dark:via-[#FFD700]/60 dark:to-[#FFD180]/60 rounded-[2rem] shadow-xl p-6 border-2 border-[#FFD700] backdrop-blur-md">
              <label htmlFor="kolam-upload" className="flex items-center gap-2 text-lg font-bold text-[#B34700] mb-4 font-display tracking-tight">
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 8l-4-4m4 4l4-4" stroke="#B34700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Upload Kolam Image
              </label>
              <input
                id="kolam-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full border-2 border-[#FFD700] rounded-lg px-3 py-2 mb-3 focus-visible:ring-2 focus-visible:ring-[#FFD700] transition bg-[#FFE0B2] dark:bg-[#B34700] text-[#B34700] dark:text-[#FFF8E1]"
                disabled={loading}
              />
              {loading && (
                <div className="flex items-center gap-2 text-[#B34700] text-sm mb-2 animate-pulse font-semibold">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="none"/></svg>
                  Removing background, please wait…
                </div>
              )}
              {imgError && (
                <div className="flex items-center gap-2 text-red-700 text-sm mb-2 animate-pulse font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="none"/><path d="M12 8v4l3 2" stroke="#B34700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {imgError}
                </div>
              )}
              {kolamImg && (
                <div className="mb-4 flex flex-col items-center max-w-full overflow-hidden">
                  <Image src={kolamImg} alt="Kolam preview" width={300} height={300} className="w-full max-w-xs rounded-xl shadow-lg border-4 border-[#FFD700] object-contain bg-[#FFE0B2]" />
                </div>
              )}
              {kolamImg && (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#B34700] text-white font-bold text-lg shadow-lg hover:from-[#FFD180] hover:to-[#B34700] transition-all duration-200 transform hover:scale-105 mt-2 border-2 border-[#FFD700]"
                  onClick={async () => {
                    // Detect iOS (Safari/Chrome)
                    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
                    if (isIOS) {
                      // Always use AR.js for iOS
                      startKolamARjs(kolamImg);
                      return;
                    }
                    // Try WebXR AR first for non-iOS
                    let usedWebXR = false;
                    try {
                      if ((navigator as any).xr && await (navigator as any).xr.isSessionSupported('immersive-ar')) {
                        await import('three');
                        startKolamAR(kolamImg);
                        usedWebXR = true;
                      }
                    } catch (err) {
                      // WebXR not available or failed
                    }
                    if (!usedWebXR) {
                      // Fallback to AR.js marker AR
                      startKolamARjs(kolamImg);
                    }
                  }}
                  disabled={false}
                >
                  <span className="inline-block mr-2">🪔</span> <span className="tracking-wide">Start AR Placement</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Footer is now handled globally in layout.tsx */}
    </div>
  );
}
