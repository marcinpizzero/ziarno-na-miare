"use client";

import { useState } from "react";
import { RECIPES, DietaryTag, DIETARY_TAG_LABELS, Recipe } from "@/lib/recipeData";

export default function RecipeList() {
  const [activeFilter, setActiveFilter] = useState<DietaryTag | "all">("all");
  // Przechowujemy liczbę porcji dla każdego przepisu niezależnie
  const [portionsState, setPortionsState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    RECIPES.forEach((r) => {
      initial[r.id] = r.defaultPortions;
    });
    return initial;
  });

  const allTags: DietaryTag[] = ["dairy-free", "low-fodmap", "low-gi", "gluten-free"];

  const handlePortionChange = (recipeId: string, delta: number) => {
    setPortionsState((prev) => {
      const current = prev[recipeId] || 1;
      const nextVal = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [recipeId]: nextVal };
    });
  };

  const filteredRecipes = RECIPES.filter((recipe) => {
    if (activeFilter === "all") return true;
    return recipe.tags.includes(activeFilter);
  });

  return (
    <section id="baza-przepisow" className="pt-6 pb-12">
      {/* Tytuł sekcji */}
      <div className="mb-4">
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#6B705C] bg-[#E8DFD1] px-2.5 py-1 rounded-full mb-2">
          Baza Przepisów & Fermentacji
        </span>
        <h2 className="text-2xl font-bold text-[#2C221E]">
          Przepisy z kalkulatorem porcji
        </h2>
        <p className="text-sm text-[#2C221E]/80 mt-1">
          Dopracowane proporcje i długa fermentacja. Dostosuj liczbę porcji pod swoją blachę lub gości.
        </p>
      </div>

      {/* Filtry wykluczeń pod kciuk */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            activeFilter === "all"
              ? "bg-[#2C221E] text-[#F7F4EE]"
              : "bg-[#E8DFD1] text-[#2C221E] hover:bg-[#ded1c0]"
          }`}
        >
          Wszystkie
        </button>
        {allTags.map((tag) => {
          const isActive = activeFilter === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveFilter(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#C86443] text-[#F7F4EE]"
                  : "bg-[#E8DFD1] text-[#2C221E] hover:bg-[#ded1c0]"
              }`}
            >
              {DIETARY_TAG_LABELS[tag]}
            </button>
          );
        })}
      </div>

      {/* Lista Kart Przepisów */}
      <div className="flex flex-col gap-6">
        {filteredRecipes.map((recipe) => {
          const currentPortions = portionsState[recipe.id] || recipe.defaultPortions;

          return (
            <article
              key={recipe.id}
              className="p-5 rounded-2xl bg-[#E8DFD1]/50 border border-[#E8DFD1] space-y-4"
            >
              {/* Belka tagów i czasu */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFD1] pb-3">
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-bold tracking-wider bg-[#F7F4EE] text-[#6B705C] px-2 py-0.5 rounded"
                    >
                      {DIETARY_TAG_LABELS[tag]}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#2C221E]/70 font-medium">
                  ⏱ {recipe.timeMinutes}
                </span>
              </div>

              {/* Tytuł i opis */}
              <div>
                <h3 className="text-xl font-bold text-[#2C221E]">
                  {recipe.title}
                </h3>
                <p className="text-xs text-[#2C221E]/80 mt-1 leading-relaxed">
                  {recipe.shortDescription}
                </p>
              </div>

              {/* Dynamiczny Przelicznik Porcji */}
              <div className="bg-[#F7F4EE] p-3.5 rounded-xl border border-[#E8DFD1] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-semibold text-[#2C221E]/70 uppercase">
                    Liczba porcji
                  </span>
                  <span className="text-sm font-bold text-[#2C221E]">
                    {currentPortions} {recipe.portionUnitName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePortionChange(recipe.id, -1)}
                    disabled={currentPortions <= 1}
                    className="w-9 h-9 rounded-lg bg-[#E8DFD1] text-[#2C221E] font-bold text-lg flex items-center justify-center disabled:opacity-40 active:scale-95"
                    aria-label="Mniej porcji"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-[#2C221E]">
                    {currentPortions}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePortionChange(recipe.id, 1)}
                    disabled={currentPortions >= 20}
                    className="w-9 h-9 rounded-lg bg-[#2C221E] text-[#F7F4EE] font-bold text-lg flex items-center justify-center disabled:opacity-40 active:scale-95"
                    aria-label="Więcej porcji"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Przeliczona lista składników */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                  Składniki (przeliczone automatycznie):
                </h4>
                <ul className="space-y-1.5 bg-white/70 p-3 rounded-xl border border-[#E8DFD1]">
                  {recipe.ingredients.map((ing, idx) => {
                    const calculatedAmount = Math.round(ing.amountPerPortion * currentPortions * 10) / 10;
                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between text-xs py-1 border-b border-[#E8DFD1]/40 last:border-0"
                      >
                        <span className="text-[#2C221E] font-medium">{ing.name}</span>
                        <span className="font-bold text-[#C86443] whitespace-nowrap ml-2">
                          {calculatedAmount} {ing.unit}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Kroki przygotowania */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B705C]">
                  Kroki przygotowania:
                </h4>
                <ol className="space-y-2 text-xs text-[#2C221E]/90">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-bold text-[#C86443]">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          );
        })}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-8 text-sm text-[#2C221E]/70 bg-[#E8DFD1]/30 rounded-xl p-4">
            Brak przepisów dla wybranego filtru wykluczeń.
          </div>
        )}
      </div>
    </section>
  );
}