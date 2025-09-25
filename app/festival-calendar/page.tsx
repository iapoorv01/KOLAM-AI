import FestivalCalendar from '@/components/site/FestivalCalendar';
import { Navbar } from '@/components/site/navbar';

export default function FestivalCalendarPage() {
  return (
    <>
      <Navbar />
      <main className="container py-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-8 text-center tracking-widest uppercase border-b-4 border-yellow-500 pb-2 drop-shadow-[0_2px_12px_rgba(255,215,0,0.7)]" style={{fontFamily: 'Georgia, serif', color: '#FFD700', letterSpacing: '0.12em'}}>Festival Special Kolams Calendar 🪔</h1>
        <FestivalCalendar />
      </main>
    </>
  );
}
