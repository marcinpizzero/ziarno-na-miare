import Link from "next/link";
import FlourAtlas from "@/components/FlourAtlas";
import RecipeList from "@/components/RecipeList";
import DoughCalculator from "@/components/DoughCalculator";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Nagłówek marki 42NAP / Ziarno na miarę */}
      <header className="text-center space-y-2 pt-2 pb-4 border-b border-[#E8DFD1]">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#6B705C]">
          Projekt 42NAP
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-[#2C221E]">
          Ziarno na miarę
        </h1>
        <p className="text-sm text-[#2C221E]/80 max-w-xs mx-auto leading-relaxed">
          Świadome pieczenie domowe. Prosta wiedza o mąkach, fermentacji i narzędzia, które ułatwiają działanie w kuchni.
        </p>
      </header>

      {/* 3 Główne Kafelki Nawigacji */}
      <nav aria-label="Główne ścieżki" className="flex flex-col gap-4">
        {/* Kafelek 1: Atlas Mąk */}
        <Link
          href="#atlas-mak"
          className="group block p-5 rounded-2xl bg-[#E8DFD1] hover:bg-[#ded1c0] transition-all duration-200 border border-[#E8DFD1] active:scale-[0.99] shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🌾</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] bg-[#F7F4EE] px-2.5 py-1 rounded-full">
              Baza wiedzy
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#2C221E] mt-3 group-hover:text-[#C86443] transition-colors">
            Atlas Mąk
          </h2>
          <p className="text-sm text-[#2C221E]/80 mt-1 leading-snug">
            Poznaj typy mąk, ich siłę i zastosowanie. Sprawdź certyfikowane mąki rzemieślnicze NIRO BIO.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#C86443]">
            <span>Przeglądaj mąki</span>
            <span>&rarr;</span>
          </div>
        </Link>

        {/* Kafelek 2: Baza Przepisów */}
        <Link
          href="#baza-przepisow"
          className="group block p-5 rounded-2xl bg-[#E8DFD1] hover:bg-[#ded1c0] transition-all duration-200 border border-[#E8DFD1] active:scale-[0.99] shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🍕</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] bg-[#F7F4EE] px-2.5 py-1 rounded-full">
              Praktyka
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#2C221E] mt-3 group-hover:text-[#C86443] transition-colors">
            Baza Przepisów
          </h2>
          <p className="text-sm text-[#2C221E]/80 mt-1 leading-snug">
            Pizza, focaccia i pieczywo. Filtruj według wykluczeń: Low FODMAP, Bez Nabiału, Niski IG, Bezgluten.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#C86443]">
            <span>Zobacz przepisy</span>
            <span>&rarr;</span>
          </div>
        </Link>

        {/* Kafelek 3: Szybki Kalkulator */}
        <Link
          href="#kalkulator"
          className="group block p-5 rounded-2xl bg-[#E8DFD1] hover:bg-[#ded1c0] transition-all duration-200 border border-[#E8DFD1] active:scale-[0.99] shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">⚖</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] bg-[#F7F4EE] px-2.5 py-1 rounded-full">
              Narzędzie
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#2C221E] mt-3 group-hover:text-[#C86443] transition-colors">
            Szybki Kalkulator
          </h2>
          <p className="text-sm text-[#2C221E]/80 mt-1 leading-snug">
            Matematyczne przeliczanie składników w ułamku sekundy pod żądaną liczbę porcji ciasta.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#C86443]">
            <span>Przelicz składniki</span>
            <span>&rarr;</span>
          </div>
        </Link>
      </nav>

      {/* SEKCJA 1: ATLAS MĄK */}
      <FlourAtlas />

      {/* SEKCJA 2: BAZA PRZEPISÓW */}
      <RecipeList />

      {/* SEKCJA 3: SZYBKI KALKULATOR */}
      <DoughCalculator />

      {/* Stopka */}
      <footer className="text-center pt-6 pb-4 border-t border-[#E8DFD1] text-xs text-[#2C221E]/60 space-y-1">
        <p>Ziarno na miarę &bull; Ekosystem świadomego pieczenia</p>
        <p>Wiarygodność &bull; Prostota &bull; Praktyka</p>
      </footer>
    </div>
  );
}