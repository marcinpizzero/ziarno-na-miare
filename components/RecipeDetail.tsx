// components/RecipeDetail.tsx
'use client';

import { RecipeData } from '@/lib/exclusionRecipes';
import { flours } from '@/lib/flourData';
import Link from 'next/link';

interface RecipeDetailProps {
  recipe: RecipeData;
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const scrollToFlour = (flourId: string) => {
    const element = document.getElementById(`flour-${flourId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-4', 'ring-amber-400');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-amber-400');
      }, 2000);
    }
  };

  const getFlourName = (flourId: string): string => {
    const flour = flours.find((f) => f.id === flourId);
    return flour ? flour.name : '';
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Powrót */}
      <Link
        href={`/kategoria/${recipe.category}`}
        className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium mb-6"
      >
        ← Wróć do listy przepisów
      </Link>

      {/* Tytuł */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-stone-800 mb-3">
        {recipe.title}
      </h1>
      <p className="text-stone-600 mb-6 leading-relaxed">{recipe.shortDescription}</p>

      {/* Dlaczego ta kategoria */}
      <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-6">
        <h2 className="font-semibold text-green-800 mb-2">
          Dlaczego ten przepis znajduje się w tej kategorii?
        </h2>
        <ul className="space-y-1">
          {recipe.whyThisCategory.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-700">
              <span className="text-green-500 mt-0.5">✓</span> {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Metryczka */}
      <div className="bg-amber-50 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <div className="text-center">
          <span className="block text-2xl">⏱️</span>
          <span className="text-xs text-stone-500">Czas całkowity</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.totalTime}</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl">🕐</span>
          <span className="text-xs text-stone-500">Fermentacja</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.fermentationTime}</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl">📊</span>
          <span className="text-xs text-stone-500">Trudność</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.difficulty}</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl">🍽️</span>
          <span className="text-xs text-stone-500">Porcje</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.servings}</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl">🔥</span>
          <span className="text-xs text-stone-500">Pieczenie</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.bakeTime}</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl">⚖️</span>
          <span className="text-xs text-stone-500">Kalorie</span>
          <span className="block text-sm font-semibold text-stone-700">{recipe.calories}</span>
        </div>
      </div>

      {/* Wyposażenie */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
          <span>🛠️</span> Niezbędne wyposażenie
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {recipe.equipment.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
              <span className="text-amber-500">•</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Składniki */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
          <span>📋</span> Składniki
        </h2>
        {recipe.ingredients.map((section, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-semibold text-amber-700 mb-2">{section.section}</h3>
            <ul className="space-y-1.5">
              {section.items.map((item, j) => (
                <li key={j} className="flex justify-between text-sm text-stone-600 py-1 border-b border-stone-100">
                  <span className="flex items-center gap-1">
                    {item.name}
                    {item.flourId && (
                      <button
                        onClick={() => scrollToFlour(item.flourId!)}
                        className="text-xs text-amber-500 hover:text-amber-700 underline cursor-pointer"
                        title={`Zobacz ${getFlourName(item.flourId!)} w Atlasie Ziaren`}
                      >
                        📚
                      </button>
                    )}
                  </span>
                  <span className="font-medium text-stone-700 whitespace-nowrap ml-2">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Kroki */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
          <span>👨‍🍳</span> Przygotowanie
        </h2>
        <div className="space-y-4">
          {recipe.steps.map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {s.step}
              </div>
              <p className="text-sm text-stone-600 pt-1">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wskazówki */}
      <div className="mb-8 bg-green-50 rounded-xl p-4 border border-green-200">
        <h2 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
          <span>💡</span> Wskazówki
        </h2>
        <ul className="space-y-1.5">
          {recipe.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-700">
              <span className="text-green-500 mt-0.5">✓</span> {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Przechowywanie */}
      <div className="mb-8 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span>📦</span> Przechowywanie
        </h2>
        <ul className="space-y-1.5">
          {recipe.storage.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
              <span className="text-blue-500 mt-0.5">•</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Modyfikacje */}
      <div className="mb-8 bg-purple-50 rounded-xl p-4 border border-purple-200">
        <h2 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
          <span>🔄</span> Możliwe modyfikacje
        </h2>
        <ul className="space-y-1.5">
          {recipe.modifications.map((mod, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-purple-700">
              <span className="text-purple-500 mt-0.5">•</span> {mod}
            </li>
          ))}
        </ul>
      </div>

      {/* Atlas Ziaren */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
        <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
          <span>📚</span> Mąki użyte w przepisie
        </h2>
        <p className="text-sm text-stone-500 mb-3">
          Kliknij w mąkę, aby zobaczyć jej szczegóły w Atlasie Ziaren.
        </p>
        <div className="space-y-2">
          {recipe.ingredients
            .flatMap((s) => s.items)
            .filter((item) => item.flourId)
            .map((item, i) => {
              const flour = flours.find((f) => f.id === item.flourId);
              if (!flour) return null;
              return (
                <div
                  key={i}
                  id={`flour-${item.flourId}`}
                  className="bg-white rounded-lg p-3 border border-stone-200 transition-all duration-500"
                >
                  <h3 className="font-semibold text-stone-700 text-sm">{flour.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-stone-500">
                    <span>Białko: {flour.protein}g</span>
                    <span>Błonnik: {flour.fiber}g</span>
                    <span>IG: {flour.glycemicIndex === 'low' ? 'Niski' : flour.glycemicIndex === 'medium' ? 'Średni' : 'Wysoki'}</span>
                    {flour.organic && <span className="text-emerald-600 font-medium">BIO</span>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}