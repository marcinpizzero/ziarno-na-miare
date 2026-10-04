"use client";

import { useState } from "react";
import { FLOURS } from "@/lib/flourData";

export default function FlourAtlas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrain, setSelectedGrain] = useState<string>("Wszystkie");

  // Pobranie unikalnych rodzajów zbóż
  const grainTypes = ["Wszystkie", ...Array.from(new Set(FLOURS.map((f) => f.grainType)))];

  // Filtrowanie z normalizacją tekstu
  const filteredFlours = FLOURS.filter((flour) => {
    const q = searchQuery.trim().toLowerCase();
    
    const matchesSearch =
      q === "" ||
      flour.name.toLowerCase().includes(q) ||
      flour.type.toLowerCase().includes(q) ||
      flour.grainType.toLowerCase().includes(q) ||
      flour.purpose.some((p) => p.toLowerCase().includes(q));

    const matchesGrain =
      selectedGrain === "Wszystkie" || flour.grainType === selectedGrain;

    return matchesSearch && matchesGrain;
  });

  return (
    <section id="atlas-mak" className="pt-8 pb-12">
      {/* Tytuł sekcji */}
      <div className="mb-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#E8DFD1] px-2.5 py-1 rounded-full mb-2">
          Atlas Mąk & Surowców
        </span>
        <h2 className="text-2xl font-bold text-[#2C221E]">
          Wybierz mąkę pod swój wypiek
        </h2>
        <p className="text-sm text-[#2C221E]/80 mt-1">
          Poznaj parametry ziaren i mąk rzemieślniczych, które testujemy i rekomendujemy w domowej kuchni.
        </p>
      </div>

      {/* Wyszukiwarka */}
      <div className="mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Szukaj: pizza, orkisz, typ 00..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8DFD1] text-[#2C221E] placeholder:text-[#2C221E]/40 text-sm focus:outline-none focus:border-[#C86443]"
        />
      </div>

      {/* Poziome tagi do wyboru zbóż pod kciuk */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {grainTypes.map((grain) => {
          const isActive = selectedGrain === grain;
          return (
            <button
              key={grain}
              type="button"
              onClick={() => setSelectedGrain(grain)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#2C221E] text-[#F7F4EE]"
                  : "bg-[#E8DFD1] text-[#2C221E] hover:bg-[#ded1c0]"
              }`}
            >
              {grain}
            </button>
          );
        })}
      </div>

      {/* Lista Kart Produktów */}
      <div className="flex flex-col gap-4">
        {filteredFlours.map((flour) => (
          <article
            key={flour.id}
            className="p-5 rounded-2xl bg-[#E8DFD1]/50 border border-[#E8DFD1] space-y-4"
          >
            {/* Belka górna: Typ + Logo Partnera */}
            <div className="flex items-center justify-between gap-2 border-b border-[#E8DFD1] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#F7F4EE] text-[#C86443] px-2.5 py-1 rounded-md">
                {flour.type} &bull; {flour.grainType}
              </span>

              {flour.partner && (
                <div className="flex items-center bg-white px-2 py-1 rounded-md border border-[#E8DFD1] h-8">
                  {flour.partner.logoUrl ? (
                    <img
                      src={flour.partner.logoUrl}
                      alt={flour.partner.name}
                      className="h-5 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs font-bold text-[#6B705C]">
                      {flour.partner.name}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Nazwa i opis */}
            <div>
              <h3 className="text-lg font-bold text-[#2C221E]">
                {flour.name}
              </h3>
              <p className="text-xs text-[#2C221E]/80 mt-1 leading-relaxed">
                {flour.shortDescription}
              </p>
            </div>

            {/* Zastosowania */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B705C] block mb-1">
                Polecana do:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {flour.purpose.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-[#F7F4EE] text-[#2C221E] px-2.5 py-0.5 rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Wartości odżywcze w pigułce */}
            <div className="grid grid-cols-3 gap-2 bg-[#F7F4EE] p-3 rounded-xl text-center">
              <div>
                <span className="block text-[10px] text-[#2C221E]/60 uppercase">Białko</span>
                <span className="text-xs font-bold text-[#2C221E]">{flour.nutrition.protein} g</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#2C221E]/60 uppercase">Energia</span>
                <span className="text-xs font-bold text-[#2C221E]">{flour.nutrition.energyKcal} kcal</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#2C221E]/60 uppercase">Węglowodany</span>
                <span className="text-xs font-bold text-[#2C221E]">{flour.nutrition.carbs} g</span>
              </div>
            </div>

            {/* Link bezpośredni do sklepu partnera */}
            {flour.partner && (
              <a
                href={flour.partner.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C86443] hover:bg-[#b55839] text-[#F7F4EE] font-bold text-sm transition-colors active:scale-[0.99]"
              >
                <span>Sprawdź w sklepie {flour.partner.name}</span>
                <span>&rarr;</span>
              </a>
            )}
          </article>
        ))}

        {filteredFlours.length === 0 && (
          <div className="text-center py-8 text-sm text-[#2C221E]/70 bg-[#E8DFD1]/30 rounded-xl p-4">
            Brak wyników dla zapytania: <strong>&bdquo;{searchQuery}&rdquo;</strong>.
          </div>
        )}
      </div>
    </section>
  );
}