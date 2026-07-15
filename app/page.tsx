// app/page.tsx
import CategoryTabs from '@/components/CategoryTabs';
import FlourAtlas from '@/components/FlourAtlas';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <header className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🌾</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ziarno na Miarę</h1>
              <p className="text-amber-100 text-sm md:text-base italic">„Twój przepis bez kompromisów”</p>
            </div>
          </div>
          <p className="text-lg md:text-xl text-amber-50 max-w-2xl">
            Sprawdzone przepisy, które szanują Twoje potrzeby. 
            Uwzględniają celiakię, FODMAP, insulinooporność i alergie – 
            bo każdy zasługuje na dobry chleb.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Kafelki kategorii */}
        <CategoryTabs />

        {/* Link do kalkulatora */}
        <div className="text-center">
          <Link
            href="/kalkulator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-medium shadow-md"
          >
            <span>🧮</span> Otwórz Kalkulator Piekarniczy
          </Link>
        </div>

        {/* Atlas Ziaren */}
        <FlourAtlas />
      </div>

      <footer className="bg-stone-800 text-stone-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-amber-300 text-base mb-1">🌾 Ziarno na Miarę</p>
          <p>Wszystkie przepisy przetestowane i sprawdzone. Bez polepszaczy, bez chemii.</p>
          <p className="mt-1">© {new Date().getFullYear()} Ziarno na Miarę</p>
        </div>
      </footer>
    </main>
  );
}