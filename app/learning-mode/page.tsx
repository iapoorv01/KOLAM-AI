"use client";
import { useState } from "react";
import Image from "next/image";


type Dot = { x: number; y: number };
type KolamPattern = {
  dots: Dot[];
  connections: [number, number][];
};
type KolamPatternName = "Square" | "Star" | "Spiral";

// Kolam gallery setup (first 10 patterns/images)
// Images must be served from /public for Next.js static assets
const KOLAM_GALLERY = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  image: `/Kolam19 Images/Kolam19 Images/kolam19-${i}.jpg`,
}));

// Parse dots for first 10 patterns from CSV (manually for demo)
// Unique pattern for first image, demo grid for others
// Dots for first image from first row of CSV

// Example: Use first 4 x and next 4 y from second row of CSV
const kolam1Dots: Dot[] = [
  { x: 1, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 0 },
];
const kolam1Connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

const KOLAM_PATTERNS: { dots: Dot[]; connections: [number, number][] }[] = [
  // Pattern 0: Actual CSV dots and sequential connections
  {
    dots: kolam1Dots,
    connections: kolam1Connections,
  },
  // Patterns 1-9: Demo grid
  ...Array.from({ length: 9 }, () => ({
    dots: [
      { x: 60, y: 60 }, { x: 80, y: 60 }, { x: 100, y: 60 }, { x: 120, y: 60 }, { x: 140, y: 60 },
      { x: 60, y: 80 }, { x: 80, y: 80 }, { x: 100, y: 80 }, { x: 120, y: 80 }, { x: 140, y: 80 },
      { x: 60, y: 100 }, { x: 80, y: 100 }, { x: 100, y: 100 }, { x: 120, y: 100 }, { x: 140, y: 100 },
      { x: 60, y: 120 }, { x: 80, y: 120 }, { x: 100, y: 120 }, { x: 120, y: 120 }, { x: 140, y: 120 },
      { x: 60, y: 140 }, { x: 80, y: 140 }, { x: 100, y: 140 }, { x: 120, y: 140 }, { x: 140, y: 140 }
    ],
    connections: Array.from({ length: 24 }, (_, i) => [i, i + 1] as [number, number]),
  })),
];

export default function LearningModePage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [step, setStep] = useState(0);
  const { dots, connections } = KOLAM_PATTERNS[selectedIdx];

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-cyan-200">
        <h1 className="text-3xl font-bold mb-4 text-cyan-700 drop-shadow">Step-by-Step Kolam Tutorial</h1>
        <div className="mb-4 w-full flex flex-col items-center">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 text-yellow-800 font-semibold text-center shadow">
            Real Kolam patterns and step-by-step tutorials will be available soon! Please check back for updates.
          </div>
        </div>
        {/* Kolam gallery for selection */}
        <div className="mb-4 w-full flex flex-col items-center">
          <div className="grid grid-cols-5 gap-2 mb-2">
            {KOLAM_GALLERY.map((item, idx) => (
              <Image
                key={item.id}
                src={item.image}
                alt={`Kolam ${item.id}`}
                width={64}
                height={64}
                className={`rounded border-2 cursor-pointer w-16 h-16 object-contain transition-all ${selectedIdx === idx ? 'border-cyan-500 shadow-lg' : 'border-cyan-200 opacity-70 hover:opacity-100'}`}
                onClick={() => { setSelectedIdx(idx); setStep(0); }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-profile.png";
                  target.alt = "Image not found";
                }}
              />
            ))}
          </div>
          <span className="text-cyan-600 text-sm mt-2">Click an image to start its tutorial</span>
        </div>
        <div className="bg-gradient-to-br from-cyan-200 via-blue-100 to-cyan-100 rounded-xl p-4 mb-6 flex items-center justify-center shadow">
          <svg width={220} height={220} className="">
            {/* Draw dots */}
            {dots.map((dot: Dot, i: number) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r={12}
                fill="#fff"
                stroke="#06b6d4"
                strokeWidth={4}
                filter="drop-shadow(0 0 4px #38bdf8)"
              />
            ))}
            {/* Draw connections up to current step */}
            {connections.slice(0, step + 1).map(([from, to]: [number, number], i: number) => (
              (dots[from] && dots[to]) ? (
                <line
                  key={i}
                  x1={dots[from].x}
                  y1={dots[from].y}
                  x2={dots[to].x}
                  y2={dots[to].y}
                  stroke="#0ea5e9"
                  strokeWidth={6}
                  strokeLinecap="round"
                  opacity={i === step ? 1 : 0.7}
                />
              ) : null
            ))}
          </svg>
        </div>
        <div className="flex gap-4 mb-4">
          <button
            className="px-4 py-2 bg-cyan-400 text-white font-semibold rounded-lg shadow hover:bg-cyan-500 transition disabled:opacity-50"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50"
            onClick={() => setStep((s) => Math.min(connections.length - 1, s + 1))}
            disabled={step === connections.length - 1}
          >
            Next
          </button>
        </div>
        <p className="text-lg text-cyan-700 font-semibold">Step {step + 1} of {connections.length}</p>
        <p className="mt-2 text-blue-600">Follow the highlighted line to connect the dots and draw your Kolam!</p>
      </div>
    </div>
  );
}
