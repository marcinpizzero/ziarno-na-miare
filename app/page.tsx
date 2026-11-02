"use client";

import React, { useState } from "react";
import { RECIPES, DIETARY_TAG_LABELS, DietaryTag } from "@/lib/recipeData";
import { FLOURS } from "@/lib/flourData";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"recipes" | "flours" | "calculator">("recipes");

  // Stan filtrów wykluczeń i porcji
  const [activeTag, setActiveTag] = useState<DietaryTag | "all">("all");
  const [recipePortions, setRecipePortions] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    RECIPES.forEach((r) => {
      initial[r.id] = r.defaultPortions;
    });
    return initial;
  });

  // Stan Atlasu Mąk
  const [searchFlour, setSearchFlour] = useState("");
  const [selectedGrain, setSelectedGrain] = useState<string>("all");

  // Stan Kalkulatora
  const [calcStyle, setCalcStyle] = useState<"pizza" | "focaccia">("pizza");
  const [calcPortions, setCalcPortions] = useState<number>(2);

  const handlePortionChange = (recipeId: string, delta: number) => {
    setRecipePortions((prev) => {
      const current = prev[recipeId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [recipeId]: updated };
    });
  };

  const filteredRecipes = RECIPES.filter((recipe) => {
    if (activeTag === "all") return true;
    return (recipe.tags as readonly string[]).includes(activeTag);
  });

  const grainTypes = ["all", ...Array.from(new Set(FLOURS.map((f) => f.grainType)))];

  const filteredFlours = FLOURS.filter((flour) => {
    const query = searchFlour.toLowerCase();
    const matchesSearch =
      flour.name.toLowerCase().includes(query) ||
      flour.shortDescription.toLowerCase().includes(query) ||
      flour.purpose.some((p) => p.toLowerCase().includes(query));
    const matchesGrain = selectedGrain === "all" || flour.grainType === selectedGrain;
    return matchesSearch && matchesGrain;
  });

  // Wartości bazowe kalkulatora
  const isPizza = calcStyle === "pizza";
  const baseFlour = isPizza ? 160 : 200;
  const baseWater = isPizza ? 104 : 150;
  const baseSalt = isPizza ? 4 : 5;
  const baseYeast = isPizza ? 0.5 : 1.5;
  const baseOil = isPizza ? 4 : 10;
  const unitLabel = isPizza ? "pizze (kulki 260g)" : "porcje focacci";

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#2C221E] px-4 py-6 max-w-lg mx-auto pb-24">
      {/* 1. NAGŁÓWEK MARKI */}
      <header className="text-center space-y-2 pt-2 pb-5 border-b border-[#E8DFD1]">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#2C221E]">
          Ziarno na miarę
        </h1>
        <p className="text-xs text-[#2C221E]/80 max-w-xs mx-auto leading-relaxed">
          Świadome pieczenie domowe. Prosta wiedza o mąkach, długiej fermentacji i narzędzia do działania w kuchni.
        </p>
      </header>

      {/* 2. KAFLOWE MENU WYBORU ŚCIEŻKI */}
      <nav className="grid grid-cols-3 gap-2 my-5">
        <button
          type="button"
          onClick={() => setActiveTab("recipes")}
          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 ${
            activeTab === "recipes"
              ? "bg-[#2C221E] text-[#F7F4EE] scale-[1.02]"
              : "bg-[#E8DFD1]/70 text-[#2C221E] hover:bg-[#E8DFD1]"
          }`}
        >
          <span className="text-base">📖</span>
          <span>Przepisy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("flours")}
          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 ${
            activeTab === "flours"
              ? "bg-[#2C221E] text-[#F7F4EE] scale-[1.02]"
              : "bg-[#E8DFD1]/70 text-[#2C221E] hover:bg-[#E8DFD1]"
          }`}
        >
          <span className="text-base">🌾</span>
          <span>Atlas Mąk</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calculator")}
          className={`py-3 px-2 rounded-xl text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 ${
            activeTab === "calculator"
              ? "bg-[#2C221E] text-[#F7F4EE] scale-[1.02]"
              : "bg-[#E8DFD1]/70 text-[#2C221E] hover:bg-[#E8DFD1]"
          }`}
        >
          <span className="text-base">⚖️</span>
          <span>Kalkulator</span>
        </button>
      </nav>

      {/* 3. MODUŁ: BAZA PRZEPISÓW */}
      {activeTab === "recipes" && (
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Sprawdzone Receptury</h2>
            <p className="text-xs text-[#2C221E]/70">Wybierz wykluczenie i dostosuj liczbę porcji pod kciukiem.</p>
          </div>

          {/* Filtry wykluczeń */}
          <div className="flex flex-wrap justify-center gap-1.5 py-1">
            <button
              type="button"
              onClick={() => setActiveTag("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTag === "all"
                  ? "bg-[#2C221E] text-[#F7F4EE]"
                  : "bg-[#E8DFD1] text-[#2C221E]"
              }`}
            >
              Wszystkie ({RECIPES.length})
            </button>
            {(Object.keys(DIETARY_TAG_LABELS) as DietaryTag[]).map((tagKey) => {
              const count = RECIPES.filter((r) => (r.tags as readonly string[]).includes(tagKey)).length;
              const isActive = activeTag === tagKey;
              return (
                <button
                  key={tagKey}
                  type="button"
                  onClick={() => setActiveTag(tagKey)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#C86443] text-[#F7F4EE]"
                      : "bg-[#E8DFD1] text-[#2C221E]"
                  }`}
                >
                  {DIETARY_TAG_LABELS[tagKey]} ({count})
                </button>
              );
            })}
          </div>

          {/* Lista przepisów */}
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => {
              const portions = recipePortions[recipe.id] || recipe.defaultPortions;
              const recommendedFlour = FLOURS.find((f) => f.id === recipe.recommendedFlourId);

              return (
                <article
                  key={recipe.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DFD1] space-y-3"
                >
                  <div>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {recipe.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#6B705C]/15 text-[#4e5341]"
                        >
                          {DIETARY_TAG_LABELS[t as DietaryTag]}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-bold text-[#2C221E] leading-snug">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-[#2C221E]/80 mt-1">{recipe.shortDescription}</p>

                    {/* Pozostawiono wyłącznie czas fermentacji */}
                    <div className="flex items-center text-[11px] text-[#2C221E]/70 mt-1.5 font-medium">
                      <span>⏱️ {recipe.timeMinutes}</span>
                    </div>
                  </div>

                  {/* Przelicznik porcji */}
                  <div className="bg-[#F7F4EE] rounded-xl p-3 flex items-center justify-between border border-[#E8DFD1]/60">
                    <div className="text-xs">
                      <span className="font-semibold block text-[#2C221E]">Liczba porcji:</span>
                      <span className="text-[11px] text-[#2C221E]/70">{recipe.portionUnitName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handlePortionChange(recipe.id, -1)}
                        className="w-8 h-8 rounded-full bg-[#E8DFD1] text-base font-bold flex items-center justify-center active:scale-95 text-[#2C221E]"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm min-w-[20px] text-center">{portions}</span>
                      <button
                        type="button"
                        onClick={() => handlePortionChange(recipe.id, 1)}
                        className="w-8 h-8 rounded-full bg-[#2C221E] text-white text-base font-bold flex items-center justify-center active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Składniki */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C221E]/70">
                      Składniki na {portions} {recipe.portionUnitName}:
                    </h4>
                    <ul className="text-xs space-y-1 divide-y divide-[#E8DFD1]/40">
                      {recipe.ingredients.map((ing, idx) => {
                        const calculated = Math.round(ing.amountPerPortion * portions * 10) / 10;
                        return (
                          <li key={idx} className="pt-1 flex justify-between items-center">
                            <span className="text-[#2C221E]/90">{ing.name}</span>
                            <span className="font-bold text-[#C86443]">
                              {calculated} {ing.unit}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Rekomendacja mąki */}
                  {recommendedFlour && (
                    <div className="p-2.5 bg-[#E8DFD1]/40 rounded-xl flex items-center justify-between gap-2 border border-[#E8DFD1]">
                      <div className="text-[11px]">
                        <span className="text-[#2C221E]/60 block">Rekomendowana mąka:</span>
                        <span className="font-bold text-[#2C221E]">{recommendedFlour.name}</span>
                      </div>
                      <a
                        href={recommendedFlour.partner?.shopUrl || "https://www.niro-bio.pl"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-[#2C221E] text-[#F7F4EE] whitespace-nowrap"
                      >
                        Kup w NIRO BIO ↗
                      </a>
                    </div>
                  )}

                  {/* Krok po kroku */}
                  <details className="text-xs text-[#2C221E]/80 pt-1 group">
                    <summary className="font-bold cursor-pointer text-[#C86443] hover:underline list-none flex items-center gap-1">
                      <span>▶ Instrukcja przygotowania krok po kroku</span>
                    </summary>
                    <ol className="list-decimal pl-4 space-y-1.5 mt-2 text-[11px] leading-relaxed">
                      {recipe.steps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. MODUŁ: ATLAS MĄK & SUROWCÓW (NIRO BIO) */}
      {activeTab === "flours" && (
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Atlas Mąk & Surowców</h2>
            <p className="text-xs text-[#2C221E]/70">
              Parametry, przeznaczenie kulinarne i certyfikowane zboża ekologiczne.
            </p>
          </div>

          <input
            type="text"
            value={searchFlour}
            onChange={(e) => setSearchFlour(e.target.value)}
            placeholder="Szukaj mąki (np. 00, orkisz, chleb, racuchy)..."
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DFD1] text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C86443]"
          />

          {/* Kafelki zbóż - zawijanie w wersy */}
          <div className="flex flex-wrap justify-center gap-1.5 py-1">
            {grainTypes.map((grain) => (
              <button
                key={grain}
                type="button"
                onClick={() => setSelectedGrain(grain)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedGrain === grain
                    ? "bg-[#2C221E] text-[#F7F4EE]"
                    : "bg-[#E8DFD1] text-[#2C221E] hover:bg-[#ded1c0]"
                }`}
              >
                {grain === "all" ? "Wszystkie zboża" : grain}
              </button>
            ))}
          </div>

          {/* Karty mąk */}
          <div className="space-y-3">
            {filteredFlours.map((flour) => (
              <article
                key={flour.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DFD1] space-y-2.5"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8DFD1] text-[#2C221E]">
                      {flour.type} • {flour.grainType}
                    </span>
                    <h3 className="text-base font-bold text-[#2C221E] mt-1">{flour.name}</h3>
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-end">
                    <img
                      src="/partners/niro-bio.png"
                      alt="NIRO BIO"
                      className="h-7 w-auto max-h-7 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".fallback-badge");
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                    <span className="fallback-badge hidden text-[10px] font-extrabold tracking-wider text-[#6B705C] border border-[#6B705C] px-1.5 py-0.5 rounded">
                      NIRO BIO
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#2C221E]/80 leading-relaxed">{flour.shortDescription}</p>

                <div className="flex flex-wrap gap-1">
                  {flour.purpose.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#F7F4EE] border border-[#E8DFD1] px-2 py-0.5 rounded text-[#2C221E]/80"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-1 p-2 bg-[#F7F4EE] rounded-xl text-center text-[10px] border border-[#E8DFD1]/60">
                  <div>
                    <span className="text-[#2C221E]/60 block">Białko</span>
                    <span className="font-bold text-[#2C221E]">{flour.nutrition.protein}g</span>
                  </div>
                  <div>
                    <span className="text-[#2C221E]/60 block">Błonnik</span>
                    <span className="font-bold text-[#2C221E]">{flour.nutrition.fiber}g</span>
                  </div>
                  <div>
                    <span className="text-[#2C221E]/60 block">Węglowodany</span>
                    <span className="font-bold text-[#2C221E]">{flour.nutrition.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-[#2C221E]/60 block">Kcal</span>
                    <span className="font-bold text-[#2C221E]">{flour.nutrition.energyKcal}</span>
                  </div>
                </div>

                {flour.partner && (
                  <div className="pt-1 flex justify-end">
                    <a
                      href={flour.partner.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2 rounded-xl text-xs font-bold bg-[#C86443] text-white hover:bg-[#b05537] transition-colors"
                    >
                      Zobacz produkt w sklepie NIRO BIO ↗
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 5. MODUŁ: SZYBKI KALKULATOR DOMOWY */}
      {activeTab === "calculator" && (
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8DFD1] space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Kalkulator Ciasta</h2>
            <p className="text-xs text-[#2C221E]/70">
              Przelicznik składników na wagę do pizzy i focacci.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-[#F7F4EE] rounded-xl border border-[#E8DFD1]">
            <button
              type="button"
              onClick={() => setCalcStyle("pizza")}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                calcStyle === "pizza"
                  ? "bg-[#2C221E] text-white shadow-sm"
                  : "text-[#2C221E]/70"
              }`}
            >
              🍕 Pizza Neapolitańska
            </button>
            <button
              type="button"
              onClick={() => setCalcStyle("focaccia")}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                calcStyle === "focaccia"
                  ? "bg-[#2C221E] text-white shadow-sm"
                  : "text-[#2C221E]/70"
              }`}
            >
              🍞 Focaccia na blasze
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F7F4EE] rounded-xl border border-[#E8DFD1]">
            <div>
              <span className="text-xs font-bold block">Ilość sztuk:</span>
              <span className="text-[11px] text-[#2C221E]/60">{unitLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCalcPortions((prev) => Math.max(1, prev - 1))}
                className="w-9 h-9 rounded-full bg-[#E8DFD1] text-lg font-bold flex items-center justify-center active:scale-95 text-[#2C221E]"
              >
                -
              </button>
              <span className="font-extrabold text-base min-w-[24px] text-center">{calcPortions}</span>
              <button
                type="button"
                onClick={() => setCalcPortions((prev) => prev + 1)}
                className="w-9 h-9 rounded-full bg-[#2C221E] text-white text-lg font-bold flex items-center justify-center active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C221E]/70">
              Gramatury składników:
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
                <span>Mąka (np. Bio Orkisz 00)</span>
                <span className="font-bold text-[#C86443]">{baseFlour * calcPortions} g</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
                <span>Woda (chłodna)</span>
                <span className="font-bold text-[#C86443]">{baseWater * calcPortions} ml</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
                <span>Sól drobna</span>
                <span className="font-bold text-[#C86443]">{baseSalt * calcPortions} g</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
                <span>Świeże drożdże</span>
                <span className="font-bold text-[#C86443]">
                  {Math.round(baseYeast * calcPortions * 10) / 10} g
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E8DFD1]">
                <span>Oliwa z oliwek extra virgin</span>
                <span className="font-bold text-[#C86443]">{baseOil * calcPortions} g</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-extrabold text-[#2C221E]">
                <span>Łączna masa ciasta:</span>
                <span>
                  {(baseFlour + baseWater + baseSalt + baseYeast + baseOil) * calcPortions} g
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. STOPKA PLATFORMY */}
      <footer className="text-center text-[11px] text-[#2C221E]/60 pt-8 space-y-1 border-t border-[#E8DFD1] mt-8">
        <p className="font-semibold text-[#2C221E]/80">Ziarno na miarę © 2026</p>
        <p>Ekosystem wiedzy o mąkach, fermentacji i domowych wypiekach[cite: 23].</p>
        <p>Partner technologiczny mąk: NIRO BIO[cite: 24]</p>
      </footer>
    </main>
  );
}