// app/kategoria/[slug]/page.tsx
import { exclusionCategories, getRecipesByCategory } from '@/lib/exclusionRecipes';
import RecipeList from '@/components/RecipeList';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = exclusionCategories.find((c) => c.id === params.slug);

  if (!category) {
    notFound();
  }

  const recipes = getRecipesByCategory(params.slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      <header className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/" className="text-amber-100 hover:text-white text-sm flex items-center gap-1 mb-2">
            ← Strona główna
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌾</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ziarno na Miarę</h1>
              <p className="text-amber-100 text-sm italic">„Twój przepis bez kompromisów”</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <RecipeList
          recipes={recipes}
          categoryName={category.name}
          categoryIcon={category.icon}
        />
      </div>

      <footer className="bg-stone-800 text-stone-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-amber-300 text-base mb-1">🌾 Ziarno na Miarę</p>
          <p>Wszystkie przepisy przetestowane i sprawdzone. Bez polepszaczy, bez chemii.</p>
          <p className="mt-1">© {new Date().getFullYear()} Ziarno na Miarę</p>
        </div>
      </footer>
    </main>
  );
}