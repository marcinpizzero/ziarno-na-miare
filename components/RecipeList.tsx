// components/RecipeList.tsx
'use client';

import { RecipeData } from '@/lib/exclusionRecipes';
import Link from 'next/link';

interface RecipeListProps {
  recipes: RecipeData[];
  categoryName: string;
  categoryIcon: string;
}

export default function RecipeList({ recipes, categoryName, categoryIcon }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl">🍞</span>
        <h2 className="text-xl font-bold text-stone-700 mt-4">Przepisy wkrótce</h2>
        <p className="text-stone-500 mt-2">
          Pracujemy nad przepisami w tej kategorii. Wróć niedługo!
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
        >
          ← Wróć do kategorii
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl">{categoryIcon}</span>
        <h2 className="text-2xl font-bold text-stone-800">{categoryName}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/przepis/${recipe.slug}`}
            className="group block bg-white rounded-xl p-5 border border-stone-200 hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-700 transition-colors mb-2">
              {recipe.title}
            </h3>
            <p className="text-sm text-stone-500 mb-3 line-clamp-2">
              {recipe.shortDescription}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <span>⏱️</span> {recipe.totalTime}
              </span>
              <span className="flex items-center gap-1">
                <span>📊</span> {recipe.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <span>🍽️</span> {recipe.servings} porcji
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-block mt-6 px-4 py-2 bg-stone-100 text-stone-600 rounded-full hover:bg-stone-200 transition-colors text-sm"
      >
        ← Wróć do wszystkich kategorii
      </Link>
    </div>
  );
}