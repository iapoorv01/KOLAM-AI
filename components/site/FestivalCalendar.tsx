'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";

interface FestivalEvent {
  summary: string;
  start: { date: string };
}

export default function FestivalCalendar() {
  const [festivals, setFestivals] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFestivals() {
      setLoading(true);
      try {
        const res = await fetch('/api/festivals');
        const data = await res.json();
        setFestivals(data.festivals || []);
      } catch {
        setFestivals([]);
      }
      setLoading(false);
    }
    fetchFestivals();
  }, []);

  // Find today's festival
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayFestival = festivals.find(f => f.start.date === todayStr);

  // State for generated Kolam
  const [generatedKolam, setGeneratedKolam] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // Use exhaustive Kolam parameters from creation page
  const kolamTypes = [
    "Pulli Kolam (Dot-Based Kolam)", "Sikku Kolam (Chikku or Knot Kolam)", "Kambi Kolam (Line or Wire-Like Kolam)", "Neli Kolam (Curvy or Slithering Kolam)", "Kodu Kolam (Tessellated Kolam)", "Padi Kolam (Manai Kolam or Step Kolam)", "Idukku Pulli Kolam (Oodu Pulli or Idai Pulli)", "Kanya Kolam", "Freehand Kolam", "Maa Kolam (Wet Flour Kolam)", "Kavi/Semman Kolam", "Poo Kolam (Pookolam or Flower Kolam)", "Nalvaravu Kolam (Welcoming Kolam)", "Thottil Kolam (Cradle Kolam)", "Ratha Kolam (Chariot Kolam)", "Navagraha Kolam (Nine Planets Kolam)", "Swastika Kolam", "Star Kolam (Nakshatra Kolam)", "Kottu Kolam (Box or Compartment Kolam)", "Vinayagar Kolam (Ganesha Kolam)", "Pavitra Kolam (Sacred Thread Kolam)", "Muggu (Andhra Pradesh/Telangana Kolam)", "Alpona (Bengali Floor Art)", "Chowkpurana (Maharashtrian Rangoli)", "Aripana (Bihari Floor Art)", "Mandana (Rajasthan Variant)", "Aipan (Uttarakhand Ritual Art)", "Jhoti or Chita (Odisha Floor Art)", "Sathiya (Gujarat Swastika-Based)", "Murja (Odisha Tulsi Art)", "Hase (Karnataka Rangoli)", "Mandala Kolam", "Celtic Knot Kolam", "Musical Kolam", "3D Kolam", "Kolam with Numbers or Letters", "Eco-Friendly Kolam", "Digital Kolam", "Other"
  ];
  const gridSizes = ["Small (3x3)", "Medium (5x5)", "Large (7x7)", "Extra Large (9x9 or bigger)"];
  const symmetryTypes = [
    "None", "Vertical", "Horizontal", "Diagonal", "Reflective", "90° Rotational Symmetry", "180° Rotational Symmetry", "360° Rotational Symmetry", "Radial", "Point", "Cyclic", "Translational", "Glide Reflection", "Fractal", "Tessellation", "Bilateral"
  ];
  const pathStyles = [
    "Continuous", "Broken", "Looped", "Freehand", "Branched", "Concentric", "Interlaced", "Geometric", "Spiral", "Tiled", "Radial", "Symmetric Path"
  ];
  const dotGridTypes = [
    "Square Grid", "Diamond Grid", "Triangular Grid", "Hexagonal Grid", "Circular Grid", "Random Dots", "No Dots (Freehand)"
  ];
  const culturalContexts = [
    "Daily Ritual", "Festival Kolam", "Wedding / Auspicious", "Spiritual / Sacred", "Competitions / Exhibitions", "Educational / Teaching", "Recreational / Meditative", "Modern / Contemporary", "Other"
  ];

  function randomValue(arr: string[]): string {
    return arr.filter(v => v && v !== "").sort(() => 0.5 - Math.random())[0];
  }

  async function handleGenerateKolam() {
    if (!todayFestival) return;
    setGenerating(true);
    setGeneratedKolam(null);
    // Random Kolam parameters (same logic as creation page)
    const kolamType = randomValue(kolamTypes);
    const gridSize = randomValue(gridSizes);
    const symmetryType = randomValue(symmetryTypes);
    const pathStyle = randomValue(pathStyles);
    const dotGridType = randomValue(dotGridTypes);
    const culturalContext = randomValue(culturalContexts);
    // Build prompt with festival context
    const prompt = `Generate a Kolam for ${todayFestival.summary} in ${kolamType} style, grid size ${gridSize}, symmetry ${symmetryType}, path style ${pathStyle}, dot grid ${dotGridType}, context ${culturalContext}. IMPORTANT: The generated Kolam should be on a plain white or black background (no shadows, no textures, no gradients) so the background can be easily removed for AR functionality.`;
    try {
      const res = await fetch('/api/generate-kolam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kolamType,
          gridSize,
          symmetryType,
          pathStyle,
          dotGridType,
          culturalContext,
          prompt
        })
      });
      const data = await res.json();
      setGeneratedKolam(data.imageUrl || null);
    } catch {
      setGeneratedKolam(null);
    }
    setGenerating(false);
  }

  return (
    <div className="p-8 rounded-3xl shadow-2xl border-4 border-yellow-500 bg-gradient-to-br from-[#fffde7] via-[#ffe082] to-[#ffd700]">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-3 shadow">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
        </span>
        <h3 className="text-3xl font-extrabold font-serif text-yellow-700 drop-shadow-xl tracking-wide" style={{fontFamily: 'Georgia, serif'}}>Festival Kolams Calendar</h3>
      </div>
      {loading ? (
        <div className="text-yellow-700 font-bold animate-pulse">Loading festivals…</div>
      ) : festivals.length === 0 ? (
        <div className="text-yellow-700 font-bold">No upcoming festivals found.</div>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {festivals.map((event, idx) => {
              const isToday = event.start.date === todayStr;
              return (
                <li key={idx} className={`flex items-center gap-4 px-4 py-3 rounded-2xl border-2 ${isToday ? 'bg-yellow-100 border-yellow-500 shadow-xl' : 'bg-[#fffde7] border-yellow-200'} transition-all duration-200`}> 
                  <span className={`font-extrabold font-serif text-yellow-800 ${isToday ? 'text-xl' : 'text-lg'}`}>{event.summary}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${isToday ? 'bg-yellow-500 text-white' : 'bg-yellow-200 text-yellow-800'}`}>{event.start.date}</span>
                  {isToday && <span className="ml-2 text-pink-500 font-bold animate-bounce">🎉 Today!</span>}
                </li>
              );
            })}
          </ul>
          {todayFestival && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 border-2 border-yellow-400 shadow-xl">
              <h4 className="text-xl font-extrabold text-yellow-700 mb-4 flex items-center gap-2 font-serif"><span>✨</span> Generate a Kolam for <span className="text-pink-600">{todayFestival.summary}</span></h4>
              <button
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-white font-extrabold rounded-2xl shadow-xl hover:from-yellow-600 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 font-serif"
                onClick={handleGenerateKolam}
                disabled={generating}
              >
                {generating ? 'Generating…' : 'Generate Festival Kolam'}
              </button>
              {generatedKolam && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Image src={generatedKolam} alt="Generated Kolam" width={176} height={176} className="w-44 h-44 object-contain border-4 border-yellow-400 rounded-2xl bg-yellow-50 shadow-xl" />
                  <span className="text-base font-bold text-yellow-700 font-serif">Your Festival Kolam</span>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="px-5 py-2 bg-yellow-500 text-white rounded-2xl shadow-xl hover:bg-yellow-600 font-extrabold font-serif"
                      onClick={() => {
                        // Download image
                        const link = document.createElement('a');
                        link.href = generatedKolam;
                        link.download = `festival-kolam.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Download
                    </button>
                    <button
                      className="px-5 py-2 bg-yellow-400 text-white rounded-2xl shadow-xl hover:bg-yellow-500 font-extrabold font-serif"
                      onClick={async () => {
                        // Prepare AR visualization (store in session and redirect)
                        sessionStorage.setItem('kolam_ar_image', generatedKolam);
                        window.location.href = '/ar-designer?from=festival';
                      }}
                    >
                      Visualize in AR
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
