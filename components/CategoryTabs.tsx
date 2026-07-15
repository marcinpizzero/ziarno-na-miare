// components/CategoryTabs.tsx
'use client';

import { exclusionCategories } from '@/lib/exclusionRecipes';
import Link from 'next/link';

export default function CategoryTabs() {
  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-amber-100">
      <h2 className="text-xl font-bold text-stone-800 mb-2 flex items-center gap-2">
        <span>🌱</span> Wybierz swoją ścieżkę
      </h2>
      <p className="text-sm text-stone-500 mb-4">
        Każda zakładka to przepisy dostosowane do konkretnych potrzeb. Znajdź to, co najlepsze dla Ciebie.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {exclusionCategories.map((category) => (
          <Link
            key={category.id}
            href={`/kategoria/${category.id}`}
            className="group block bg-stone-50 hover:bg-amber-50 rounded-xl p-4 border border-stone-200 hover:border-amber-300 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-800 group-hover:text-amber-800 transition-colors text-base">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-amber-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Zobacz przepisy</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}