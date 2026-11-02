"use client";

import React, { useState } from "react";
import { RECIPES, DIETARY_TAG_LABELS, DietaryTag } from "@/lib/recipeData";
import { FLOURS } from "@/lib/flourData";

export default function RecipeSection() {
  const [activeTag, setActiveTag] = useState<DietaryTag | "all">("all");
  const [portionsMap, setPortionsMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    RECIPES.forEach((r) => {
      init[r.id] = r.defaultPortions;
    });
    return init;
  });

  const handlePortionChange = (id: string, delta: number) => {
    setPortionsMap((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const filtered = RECIPES.filter((r) => {
    if (activeTag === "all") return true;
    return (r.tags as readonly string[]).includes(activeTag);
  });

  return (
    <section className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">Sprawdzone Receptury</h2>
        <p className="text-xs text-[#2C221E]/70">Wybierz wykluczenie i dostosuj liczbę porcji pod kciukiem.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 py-1">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeTag === "all" ? "bg-[#2C221E] text-[#F7F4EE]" : "bg-[#E8DFD1] text-[#2C221E]"
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
                isActive ? "bg-[#C86443] text-[#F7F4EE]" : "bg-[#E8DFD1] text-[#2C221E]"
              }`}
            >
              {DIETARY_TAG_LABELS[tagKey]} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((recipe) => {
          const portions = portionsMap[recipe.id] || recipe.defaultPortions;
          const flour = FLOURS.find((f) => f.id === recipe.recommendedFlourId);

          return (
            <article key={recipe.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DFD1] space-y-3">
              <div>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {recipe.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#6B705C]/15 text-[#4e5341]">
                      {DIETARY_TAG_LABELS[t as DietaryTag]}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-[#2C221E] leading-snug">{recipe.title}</h3>
                <p className="text-xs text-[#2C221E]/80 mt-1">{recipe.shortDescription}</p>
                <div className="flex items-center text-[11px] text-[#2C221E]/70 mt-1.5 font-medium">
                  <span>⏱️ {recipe.timeMinutes}</span>
                </div>
              </div>

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

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C221E]/70">
                  Składniki na {portions} {recipe.portionUnitName}:
                </h4>
                <ul className="text-xs space-y-1 divide-y divide-[#E8DFD1]/40">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="pt-1 flex justify-between items-center">
                      <span className="text-[#2C221E]/90">{ing.name}</span>
                      <span className="font-bold text-[#C86443]">
                        {Math.round(ing.amountPerPortion * portions * 10) / 10} {ing.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {flour && (
                <div className="p-2.5 bg-[#E8DFD1]/40 rounded-xl flex items-center justify-between gap-2 border border-[#E8DFD1]">
                  <div className="text-[11px]">
                    <span className="text-[#2C221E]/60 block">Rekomendowana mąka:</span>
                    <span className="font-bold text-[#2C221E]">{flour.name}</span>
                  </div>
                  <a
                    href={flour.partner?.shopUrl || "https://www.niro-bio.pl"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-[#2C221E] text-[#F7F4EE] whitespace-nowrap"
                  >
                    Kup w NIRO BIO ↗
                  </a>
                </div>
              )}

              <details className="text-xs text-[#2C221E]/80 pt-1">
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
  );
}