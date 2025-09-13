"use client";
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Button } from '@/components/ui/button';
import { BookOpen, MapPin, Sparkle, Info, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const kolamFacts = [
  "Kolams are drawn fresh every morning at the entrance of homes.",
  "Rice flour Kolams feed birds and ants, symbolizing harmony with nature.",
  "Dots in Kolam represent cosmic energy and order.",
  "Kolams are eco-friendly and foster community bonds."
];

const quizQuestions = [
  {
    question: "Which state is famous for Pulli Kolam?",
    options: ["Karnataka", "Tamil Nadu", "Punjab", "Kerala"],
    answer: 1
  },
  {
    question: "What is the eco-friendly material used for Kolam?",
    options: ["Plastic", "Rice Flour", "Paint", "Sand"],
    answer: 1
  },
  {
    question: "Which festival is most associated with Kolam?",
    options: ["Pongal", "Holi", "Eid", "Christmas"],
    answer: 0
  }
];

function TimelineSVG() {
  return (
    <svg width="100%" height="80" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-4">
      <circle cx="40" cy="40" r="18" fill="#fbbf24" />
      <text x="40" y="40" textAnchor="middle" dy=".3em" fontSize="14" fill="#fff">Dots</text>
      <rect x="80" y="30" width="60" height="20" rx="10" fill="#fde68a" />
      <text x="110" y="45" textAnchor="middle" fontSize="13" fill="#92400e">Lines</text>
      <ellipse cx="180" cy="40" rx="25" ry="18" fill="#f59e42" />
      <text x="180" y="40" textAnchor="middle" dy=".3em" fontSize="14" fill="#fff">Patterns</text>
      <rect x="230" y="30" width="60" height="20" rx="10" fill="#a7f3d0" />
      <text x="260" y="45" textAnchor="middle" fontSize="13" fill="#065f46">Festival</text>
      <ellipse cx="340" cy="40" rx="25" ry="18" fill="#818cf8" />
      <text x="340" y="40" textAnchor="middle" dy=".3em" fontSize="14" fill="#fff">Digital</text>
    </svg>
  );
}

function IndiaMap({ onRegionClick }: { onRegionClick: (region: string) => void }) {
  return (
    <svg viewBox="0 0 300 300" width="100%" height="180" className="my-4">
      <g>
        <rect x="40" y="120" width="40" height="40" fill="#fbbf24" onClick={() => onRegionClick('Tamil Nadu')} />
        <rect x="90" y="100" width="40" height="40" fill="#34d399" onClick={() => onRegionClick('Karnataka')} />
        <rect x="140" y="80" width="40" height="40" fill="#818cf8" onClick={() => onRegionClick('Andhra/Telangana')} />
        <rect x="190" y="60" width="40" height="40" fill="#f472b6" onClick={() => onRegionClick('North India')} />
      </g>
      <text x="60" y="115" fontSize="12" textAnchor="middle">Tamil Nadu</text>
      <text x="110" y="95" fontSize="12" textAnchor="middle">Karnataka</text>
      <text x="160" y="75" fontSize="12" textAnchor="middle">Andhra/Telangana</text>
      <text x="210" y="55" fontSize="12" textAnchor="middle">North India</text>
    </svg>
  );
}

export default function HeritageExplorerPage() {
  const [factIdx, setFactIdx] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleNextFact = () => {
    setFactIdx((prev) => (prev + 1) % kolamFacts.length);
    setShowFact(true);
    setTimeout(() => setShowFact(false), 1800);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  const handleQuizAnswer = (idx: number) => {
    if (idx === quizQuestions[quizIdx].answer) setScore(score + 1);
    if (quizIdx + 1 < quizQuestions.length) {
      setQuizIdx(quizIdx + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container py-8 max-w-3xl mx-auto">
        <section className="mb-10 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 border shadow-lg mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </span>
          <h1 className="text-4xl font-extrabold mb-2">Kolam Heritage Explorer</h1>
          <p className="text-lg text-muted-foreground">Discover the history, culture, and evolution of Kolams across India.</p>
        </section>

        {/* Timeline Visual */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Evolution Timeline</h2>
          <TimelineSVG />
          <div className="text-center text-sm text-muted-foreground">From dots to digital: Kolam’s journey through time.</div>
        </section>

        {/* Interactive Map */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Regional Kolam Styles</h2>
          <IndiaMap onRegionClick={handleRegionClick} />
          {selectedRegion && (
            <div className="mt-2 text-center text-base font-semibold text-primary">{selectedRegion} style selected!</div>
          )}
        </section>

        {/* Animated Fact Popup */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Did You Know?</h2>
          <div className="flex flex-col items-center">
            <Button variant="outline" onClick={handleNextFact}>Show Fact</Button>
            {showFact && (
              <div className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary animate-bounce shadow">
                {kolamFacts[factIdx]}
              </div>
            )}
          </div>
        </section>

        {/* Gamified Quiz */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Kolam Quiz</h2>
          {!showQuizResult ? (
            <div className="p-4 rounded-lg border bg-card">
              <div className="font-semibold mb-2">{quizQuestions[quizIdx].question}</div>
              <div className="grid grid-cols-2 gap-2">
                {quizQuestions[quizIdx].options.map((opt, idx) => (
                  <Button key={opt} variant="secondary" onClick={() => handleQuizAnswer(idx)}>{opt}</Button>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Score: {score}</div>
            </div>
          ) : (
            <div className="p-4 rounded-lg border bg-card text-center">
              <div className="font-bold text-lg mb-2">Quiz Complete!</div>
              <div className="text-base">Your Score: <span className="text-primary font-semibold">{score} / {quizQuestions.length}</span></div>
              <Button className="mt-4" onClick={() => {setQuizIdx(0); setScore(0); setShowQuizResult(false);}}>Try Again</Button>
            </div>
          )}
        </section>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
