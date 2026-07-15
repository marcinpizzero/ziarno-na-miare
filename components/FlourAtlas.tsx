// components/FlourAtlas.tsx
'use client';

import { useState, useMemo } from 'react';
import { flours } from '@/lib/flourData';
import { filterFloursByExclusions } from '@/lib/exclusionLogic';
import { useAppStore } from '@/store/appStore';
import { Flour } from '@/types';

export default function FlourAtlas() {
  const exclusions = useAppStore((s) => s.exclusions);
  const setFlourBlend = useAppStore((s) => s.setFlourBlend);
  const calculatorParams = useAppStore((s) => s.calculatorParams);

  const [filterGF, setFilterGF] = useState(false);
  const [filterLowGI, setFilterLowGI] = useState(false);
  const [filterBIO, setFilterBIO] = useState(false);
  const [filterHighProtein, setFilterHighProtein] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFlours = useMemo(() => {
    let result = filterFloursByExclusions(flours, exclusions);
    if (filterGF) result = result.filter((f) => f.glutenFree);
    if (filterLowGI) result = result.filter((f) => f.glycemicIndex === 'low');
    if (filterBIO) result = result.filter((f) => f.organic);
    if (filterHighProtein) result = result.filter((f) => f.protein >= 14);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.type.toLowerCase().includes(term)
      );
    }
    return result;
  }, [exclusions, filterGF, filterLowGI, filterBIO, filterHighProtein, searchTerm]);

  const addFlourToBlend = (flour: Flour) => {
    const currentBlend = calculatorParams.flourBlend;
    const existing = currentBlend.find((item) => item.flour.id === flour.id);
    if (existing) {
      // Już jest – zwiększ o 10%
      const newBlend = currentBlend.map((item) =>
        item.flour.id === flour.id
          ? { ...item, percentage: Math.min(100, item.percentage + 10) }
          : item
      );
      const total = newBlend.reduce((s, i) => s + i.percentage, 0);
      if (total > 100) {
        const excess = total - 100;
        const target = newBlend.find((i) => i.flour.id === flour.id)!;
        target.percentage -= excess;
      }
      setFlourBlend(newBlend);
    } else {
      const newBlend = [...currentBlend, { flour, percentage: 20 }];
      const total = newBlend.reduce((s, i) => s + i.percentage, 0);
      if (total > 100) {
        const scale = 100 / total;
        newBlend.forEach((i) => (i.percentage = Math.round(i.percentage * scale)));
      }
      setFlourBlend(newBlend);
    }
  };

  const getGILabel = (gi: string) => {
    switch (gi) {
      case 'low':
        return { text: 'Niski IG', color: 'bg-green-100 text-green-700' };
      case 'medium':
        return { text: 'Średni IG', color: 'bg-amber-100 text-amber-700' };
      case 'high':
        return { text: 'Wysoki IG', color: 'bg-red-100 text-red-700' };
    }
  };

  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
      <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
        <span>📚</span> Cyfrowy Atlas Mąk
      </h2>

      {/* Wyszukiwarka */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Szukaj mąki..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent min-h-[44px]"
        />
      </div>

      {/* Filtry */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { label: 'Bezglutenowe', state: filterGF, set: setFilterGF, icon: '🌾' },
          { label: 'Niski IG', state: filterLowGI, set: setFilterLowGI, icon: '📉' },
          { label: 'BIO', state: filterBIO, set: setFilterBIO, icon: '🍃' },
          { label: 'Białko ≥14g', state: filterHighProtein, set: setFilterHighProtein, icon: '💪' },
        ].map(({ label, state, set, icon }) => (
          <button
            key={label}
            onClick={() => set(!state)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium min-h-[44px] flex items-center gap-1 transition-colors ${
              state
                ? 'bg-green-700 text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Siatka kart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredFlours.map((flour) => {
          const giInfo = getGILabel(flour.glycemicIndex);
          const isInBlend = calculatorParams.flourBlend.some(
            (item) => item.flour.id === flour.id
          );
          return (
            <div
              key={flour.id}
              className={`relative border-2 rounded-xl p-3 cursor-pointer transition-all hover:shadow-lg ${
                isInBlend
                  ? 'border-amber-400 bg-amber-50 shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
              onClick={() => addFlourToBlend(flour)}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-stone-800 text-sm leading-tight pr-6">
                  {flour.name}
                </h3>
                {isInBlend && (
                  <span className="absolute top-2 right-2 text-amber-500 text-lg">⭐</span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${giInfo.color}`}>
                  {giInfo.text}
                </span>
                {flour.glutenFree && (
                  <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                    GF
                  </span>
                )}
                {flour.organic && (
                  <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                    BIO
                  </span>
                )}
                {flour.fodmapSafe && (
                  <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    Low-FODMAP
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-1 text-xs text-stone-600">
                <div className="bg-stone-50 rounded p-1 text-center">
                  <span className="block font-bold text-stone-800">{flour.protein}g</span>
                  <span className="text-[10px]">białko</span>
                </div>
                <div className="bg-stone-50 rounded p-1 text-center">
                  <span className="block font-bold text-stone-800">{flour.fiber}g</span>
                  <span className="text-[10px]">błonnik</span>
                </div>
                <div className="bg-stone-50 rounded p-1 text-center">
                  <span className="block font-bold text-stone-800">
                    +{(flour.hydrationBoost * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px]">hydracja</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 mt-2 line-clamp-2">{flour.notes}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addFlourToBlend(flour);
                }}
                className="mt-2 w-full py-1.5 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors min-h-[36px]"
              >
                {isInBlend ? 'Dodaj więcej (+10%)' : 'Dodaj do blendu'}
              </button>
            </div>
          );
        })}
      </div>

      {filteredFlours.length === 0 && (
        <p className="text-center text-stone-500 py-8">
          Brak mąk spełniających kryteria. Zmień filtry lub wykluczenia.
        </p>
      )}
    </section>
  );
}