// components/DoughCalculator.tsx
'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { recipeTemplates } from '@/lib/recipeData';
import { z } from 'zod';

const blendSchema = z
  .number()
  .min(0, 'Min 0%')
  .max(100, 'Max 100%');

export default function DoughCalculator() {
  const calculatorParams = useAppStore((s) => s.calculatorParams);
  const setCalculatorParams = useAppStore((s) => s.setCalculatorParams);
  const setFlourBlend = useAppStore((s) => s.setFlourBlend);
  const selectedRecipeId = useAppStore((s) => s.selectedRecipeId);
  const selectRecipe = useAppStore((s) => s.selectRecipe);
  const scaledRecipe = useAppStore((s) => s.scaledRecipe);
  const exclusions = useAppStore((s) => s.exclusions);

  const [errors, setErrors] = useState<string[]>([]);

  const currentRecipe = recipeTemplates.find((r) => r.id === selectedRecipeId);
  const blend = calculatorParams.flourBlend;
  const blendTotal = blend.reduce((s, i) => s + i.percentage, 0);

  const updateBlendPercentage = (flourId: string, newPct: number) => {
    try {
      blendSchema.parse(newPct);
      const newBlend = blend.map((item) =>
        item.flour.id === flourId ? { ...item, percentage: newPct } : item
      );
      setFlourBlend(newBlend);
      setErrors([]);
    } catch {
      setErrors(['Procent musi być między 0 a 100']);
    }
  };

  const removeFlourFromBlend = (flourId: string) => {
    if (blend.length <= 1) {
      setErrors(['Blend musi zawierać przynajmniej jedną mąkę']);
      return;
    }
    const newBlend = blend.filter((item) => item.flour.id !== flourId);
    const total = newBlend.reduce((s, i) => s + i.percentage, 0);
    if (total > 0) {
      newBlend.forEach((i) => (i.percentage = Math.round((i.percentage / total) * 100)));
    }
    setFlourBlend(newBlend);
  };

  const ballStyles = [
    { value: 'napoli', label: 'Napoli', weight: 250 },
    { value: 'detroit', label: 'Detroit', weight: 400 },
    { value: 'pinsa', label: 'Pinsa / Mini', weight: 140 },
    { value: 'focaccia', label: 'Focaccia', weight: 200 },
    { value: 'custom', label: 'Własna', weight: calculatorParams.customBallWeight },
  ];

  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
      <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
        <span>🧮</span> Kalkulator Piekarniczy
      </h2>

      {/* Wybór przepisu bazowego */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Przepis bazowy
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {recipeTemplates.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => selectRecipe(recipe.id)}
              className={`text-left p-3 rounded-xl border-2 transition-all min-h-[44px] ${
                selectedRecipeId === recipe.id
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className="font-semibold text-stone-800 text-sm">{recipe.name}</span>
              <span className="block text-xs text-stone-500 mt-0.5">
                Hydracja: {Math.round(recipe.baseHydration * 100)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {!currentRecipe && (
        <p className="text-stone-500 text-center py-4">Wybierz przepis bazowy, aby rozpocząć.</p>
      )}

      {currentRecipe && (
        <>
          {/* Blend mąk */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-stone-700">Blend mąk</label>
              <span
                className={`text-sm font-bold ${
                  Math.abs(blendTotal - 100) < 0.5 ? 'text-green-600' : 'text-red-500'
                }`}
              >
                Suma: {blendTotal}%
              </span>
            </div>
            {blend.map((item) => (
              <div key={item.flour.id} className="flex items-center gap-2 mb-2">
                <span className="flex-1 text-sm text-stone-700 truncate">
                  {item.flour.name}
                </span>
                <div className="flex items-center gap-1">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={item.percentage}
                    onChange={(e) =>
                      updateBlendPercentage(item.flour.id, Number(e.target.value))
                    }
                    className="w-20 h-2 accent-amber-500"
                  />
                  <input
                    type="number"
                    value={item.percentage}
                    onChange={(e) =>
                      updateBlendPercentage(item.flour.id, Number(e.target.value))
                    }
                    className="w-14 px-1.5 py-1 text-sm border border-stone-300 rounded text-center min-h-[44px]"
                    min={0}
                    max={100}
                  />
                  <span className="text-sm text-stone-500">%</span>
                </div>
                <button
                  onClick={() => removeFlourFromBlend(item.flour.id)}
                  className="text-red-400 hover:text-red-600 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Usuń z blendu"
                >
                  ✕
                </button>
              </div>
            ))}
            {errors.length > 0 && (
              <p className="text-red-500 text-xs mt-1">{errors.join(', ')}</p>
            )}
          </div>

          {/* Parametry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Hydracja bazowa ({(calculatorParams.baseHydration * 100).toFixed(0)}%)
              </label>
              <input
                type="range"
                min={0.5}
                max={0.95}
                step={0.01}
                value={calculatorParams.baseHydration}
                onChange={(e) =>
                  setCalculatorParams({ baseHydration: Number(e.target.value) })
                }
                className="w-full h-2 accent-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Sól ({calculatorParams.saltPercentage}%)
              </label>
              <input
                type="range"
                min={1.5}
                max={3.5}
                step={0.1}
                value={calculatorParams.saltPercentage}
                onChange={(e) =>
                  setCalculatorParams({ saltPercentage: Number(e.target.value) })
                }
                className="w-full h-2 accent-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Zakwas/Drożdże ({calculatorParams.prefermentPercentage}%)
              </label>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={calculatorParams.prefermentPercentage}
                onChange={(e) =>
                  setCalculatorParams({ prefermentPercentage: Number(e.target.value) })
                }
                className="w-full h-2 accent-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Oliwa ({calculatorParams.oilPercentage}%)
              </label>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={calculatorParams.oilPercentage}
                onChange={(e) =>
                  setCalculatorParams({ oilPercentage: Number(e.target.value) })
                }
                className="w-full h-2 accent-amber-500"
              />
            </div>
          </div>

          {/* Styl kulki i ilość */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Styl i waga kulki
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {ballStyles.map((bs) => (
                <button
                  key={bs.value}
                  onClick={() =>
                    setCalculatorParams({
                      ballStyle: bs.value as any,
                      customBallWeight: bs.weight,
                    })
                  }
                  className={`px-3 py-1.5 rounded-full text-sm font-medium min-h-[44px] transition-colors ${
                    calculatorParams.ballStyle === bs.value
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {bs.label} ({bs.weight}g)
                </button>
              ))}
            </div>
            {calculatorParams.ballStyle === 'custom' && (
              <div>
                <label className="text-xs text-stone-500 mb-1 block">
                  Własna waga kulki (g)
                </label>
                <input
                  type="number"
                  value={calculatorParams.customBallWeight}
                  onChange={(e) =>
                    setCalculatorParams({ customBallWeight: Number(e.target.value) })
                  }
                  className="w-24 px-3 py-2 border border-stone-300 rounded-lg text-center min-h-[44px]"
                  min={50}
                  max={1000}
                />
              </div>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Liczba kulek
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setCalculatorParams({
                    ballCount: Math.max(1, calculatorParams.ballCount - 1),
                  })
                }
                className="w-11 h-11 rounded-full bg-stone-100 text-stone-700 font-bold text-xl flex items-center justify-center hover:bg-stone-200"
              >
                −
              </button>
              <span className="text-2xl font-bold text-stone-800 min-w-[3rem] text-center">
                {calculatorParams.ballCount}
              </span>
              <button
                onClick={() =>
                  setCalculatorParams({ ballCount: calculatorParams.ballCount + 1 })
                }
                className="w-11 h-11 rounded-full bg-stone-100 text-stone-700 font-bold text-xl flex items-center justify-center hover:bg-stone-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Wynik */}
          {scaledRecipe && (
            <div className="bg-stone-50 rounded-xl p-4 mt-4">
              <h3 className="font-bold text-stone-800 mb-3 text-lg">
                📊 Przepis po przeliczeniu
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="block text-xs text-stone-500">Całkowita waga</span>
                  <span className="text-xl font-bold text-stone-800">
                    {scaledRecipe.totalDoughWeight}g
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="block text-xs text-stone-500">Waga mąki</span>
                  <span className="text-xl font-bold text-stone-800">
                    {scaledRecipe.flourTotalWeight}g
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="block text-xs text-stone-500">Woda</span>
                  <span className="text-xl font-bold text-blue-600">
                    {scaledRecipe.waterTotalWeight}g
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="block text-xs text-stone-500">Na kulkę</span>
                  <span className="text-xl font-bold text-stone-800">
                    {Math.round(scaledRecipe.totalDoughWeight / calculatorParams.ballCount)}g
                  </span>
                </div>
              </div>

              <h4 className="font-semibold text-stone-700 mb-2">Składniki:</h4>
              <ul className="space-y-1.5 mb-4">
                {scaledRecipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white rounded-lg px-3 py-2 text-sm"
                  >
                    <div>
                      <span className="font-medium text-stone-700">{ing.name}</span>
                      {ing.notes && (
                        <span className="block text-xs text-stone-400">{ing.notes}</span>
                      )}
                    </div>
                    <span className="font-bold text-stone-800">
                      {ing.amountGrams}g
                    </span>
                  </li>
                ))}
              </ul>

              {scaledRecipe.substitutions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-amber-700 mb-1">🔄 Substytucje:</h4>
                  {scaledRecipe.substitutions.map((sub, i) => (
                    <p key={i} className="text-xs text-amber-600 bg-amber-50 rounded px-2 py-1 mb-1">
                      {sub.original} → {sub.replacement}
                    </p>
                  ))}
                </div>
              )}

              {scaledRecipe.warnings.length > 0 && (
                <div className="mb-4">
                  {scaledRecipe.warnings.map((w, i) => (
                    <p key={i} className="text-xs text-red-600 bg-red-50 rounded px-3 py-2 mb-1">
                      {w}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}