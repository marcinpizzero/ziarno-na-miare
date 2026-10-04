"use client";

import { useState } from "react";

interface DoughPreset {
  id: string;
  name: string;
  portionName: string;
  baseFlour: number;   // gramy na 1 porcję
  waterRatio: number;  // procent hydratacji (np. 0.65 = 65%)
  saltRatio: number;   // procent soli (np. 0.028 = 2.8%)
  yeastRatio: number;  // procent drożdży świeżych (np. 0.003 = 0.3%)
  oilRatio: number;    // procent oliwy (np. 0.025 = 2.5%)
  recommendedFlour: string;
}

const PRESETS: DoughPreset[] = [
  {
    id: "pizza",
    name: "Pizza Domowa (kulka ok. 260 g)",
    portionName: "pizz",
    baseFlour: 160,
    waterRatio: 0.65,    // 65% hydratacji
    saltRatio: 0.028,    // 2.8% soli
    yeastRatio: 0.003,   // 0.3% drożdży (długa fermentacja)
    oilRatio: 0.025,     // 2.5% oliwy
    recommendedFlour: "Bio Mąka Orkiszowa Typ 00 (NIRO BIO)",
  },
  {
    id: "focaccia",
    name: "Focaccia Rzemieślnicza (porcja ok. 200 g)",
    portionName: "porcji",
    baseFlour: 120,
    waterRatio: 0.75,    // 75% hydratacji
    saltRatio: 0.025,    // 2.5% soli
    yeastRatio: 0.008,   // 0.8% drożdży
    oilRatio: 0.08,      // 8% oliwy
    recommendedFlour: "Bio Mąka Orkiszowa Typ 00 / Chlebowa",
  },
];

export default function DoughCalculator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("pizza");
  const [portions, setPortions] = useState<number>(3);

  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  // Obliczenia na bazie ilości mąki
  const totalFlour = Math.round(preset.baseFlour * portions);
  const totalWater = Math.round(totalFlour * preset.waterRatio);
  const totalSalt = Math.round(totalFlour * preset.saltRatio * 10) / 10;
  const totalYeast = Math.max(0.5, Math.round(totalFlour * preset.yeastRatio * 10) / 10);
  const totalOil = Math.round(totalFlour * preset.oilRatio * 10) / 10;
  const totalDough = Math.round(totalFlour + totalWater + totalSalt + totalYeast + totalOil);

  return (
    <section id="kalkulator" className="pt-6 pb-12">
      {/* Nagłówek sekcji */}
      <div className="mb-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#E8DFD1] px-2.5 py-1 rounded-full mb-2">
          Narzędzie kuchenne
        </span>
        <h2 className="text-2xl font-bold text-[#2C221E]">
          Szybki Kalkulator Ciasta
        </h2>
        <p className="text-sm text-[#2C221E]/80 mt-1">
          Wybierz wypiek, wskaż ile porcji potrzebujesz, a kalkulator od razu poda gramatury na wagę.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#E8DFD1]/50 border border-[#E8DFD1] space-y-5">
        {/* Wybór rodzaju wypieku */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B705C]">
            Wybierz wypiek:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => {
              const isSelected = p.id === selectedPresetId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPresetId(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                    isSelected
                      ? "bg-[#2C221E] text-[#F7F4EE] border-[#2C221E] shadow-sm"
                      : "bg-white text-[#2C221E] border-[#E8DFD1] hover:bg-[#F7F4EE]"
                  }`}
                >
                  <span className="block">{p.id === "pizza" ? "🍕 Pizza" : "🍞 Focaccia"}</span>
                  <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                    {p.id === "pizza" ? "Kulki 260g" : "Na blachę"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Licznik porcji pod kciuk */}
        <div className="bg-[#F7F4EE] p-4 rounded-xl border border-[#E8DFD1] flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-semibold text-[#2C221E]/70 uppercase">
              Planowana ilość:
            </span>
            <span className="text-base font-bold text-[#2C221E]">
              {portions} {preset.portionName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPortions((prev) => Math.max(1, prev - 1))}
              disabled={portions <= 1}
              className="w-10 h-10 rounded-xl bg-[#E8DFD1] text-[#2C221E] font-bold text-xl flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
              aria-label="Odejmij"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-lg text-[#2C221E]">
              {portions}
            </span>
            <button
              type="button"
              onClick={() => setPortions((prev) => Math.min(25, prev + 1))}
              disabled={portions >= 25}
              className="w-10 h-10 rounded-xl bg-[#2C221E] text-[#F7F4EE] font-bold text-xl flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
              aria-label="Dodaj"
            >
              +
            </button>
          </div>
        </div>

        {/* Wyniki wagowe na stół kuchenny */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
              Składniki na wagę:
            </span>
            <span className="text-xs font-semibold text-[#2C221E]/70">
              Łącznie: <strong>{totalDough} g</strong> ciasta
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E8DFD1] divide-y divide-[#E8DFD1]/50 overflow-hidden text-sm">
            <div className="p-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#2C221E] block">Mąka</span>
                <span className="text-[11px] text-[#6B705C]">{preset.recommendedFlour}</span>
              </div>
              <span className="font-extrabold text-base text-[#C86443]">{totalFlour} g</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="font-medium text-[#2C221E]">Woda (zimna)</span>
              <span className="font-bold text-[#C86443]">{totalWater} g (ml)</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="font-medium text-[#2C221E]">Sól morska / kamienna</span>
              <span className="font-bold text-[#C86443]">{totalSalt} g</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-[#2C221E] block">Drożdże świeże</span>
                <span className="text-[10px] text-[#2C221E]/60">Dla długiej fermentacji 24h</span>
              </div>
              <span className="font-bold text-[#C86443]">{totalYeast} g</span>
            </div>

            <div className="p-3 flex items-center justify-between">
              <span className="font-medium text-[#2C221E]">Oliwa z oliwek extra virgin</span>
              <span className="font-bold text-[#C86443]">{totalOil} g (ml)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}