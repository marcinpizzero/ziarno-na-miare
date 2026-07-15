// components/RecipeManager.tsx
'use client';

import { useAppStore } from '@/store/appStore';

const tooltips: Record<string, string> = {
  walek:
    'Nigdy nie używaj wałka! Wałkowanie niszczy pęcherzyki powietrza. Rozciągaj ciasto wyłącznie dłońmi.',
  fermentacja:
    'Zimna fermentacja 24h w lodówce poprawia strawność, zwiększa biodostępność magnezu, cynku i żelaza.',
  oliwa:
    'Oliwę extra virgin o zawartości polifenoli >600 mg/kg dodawaj zawsze PO upieczeniu – zachowasz jej właściwości przeciwzapalne.',
  toppings:
    'Warzywa powinny stanowić minimum 50% powierzchni pizzy – to klucz do niskiego ładunku glikemicznego i efektu przeciwzapalnego.',
  pieczenie:
    'Kamień/Stal: 230°C, 8–12 min; Air Fryer: 200°C, 12 min. Zawsze nagrzewaj kamień min. 45 min.',
};

function Tooltip({ id, label }: { id: string; label: string }) {
  const text = tooltips[id];
  if (!text) return <span>{label}</span>;
  return (
    <span className="group relative inline-block cursor-help border-b border-dotted border-amber-400">
      {label}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-stone-800 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800"></span>
      </span>
    </span>
  );
}

export default function RecipeManager() {
  const scaledRecipe = useAppStore((s) => s.scaledRecipe);
  const selectedRecipeId = useAppStore((s) => s.selectedRecipeId);

  if (!scaledRecipe || !selectedRecipeId) {
    return (
      <section className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
        <h2 className="text-xl font-bold text-stone-800 mb-2 flex items-center gap-2">
          <span>📖</span> Inteligentny Przepiśnik
        </h2>
        <p className="text-stone-500 text-sm">
          Wybierz przepis w kalkulatorze, aby zobaczyć pełny harmonogram i parametry pieczenia.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
      <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
        <span>📖</span> Przepiśnik – Harmonogram
      </h2>

      {/* Harmonogram fermentacji */}
      <div className="mb-6">
        <h3 className="font-semibold text-stone-700 mb-3 flex items-center gap-1">
          ⏱️ <Tooltip id="fermentacja" label="Harmonogram fermentacji" />
        </h3>
        <div className="space-y-3">
          {scaledRecipe.fermentationSchedule.map((step) => (
            <div
              key={step.step}
              className="flex gap-3 bg-stone-50 rounded-xl p-3 border border-stone-100"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800">{step.description}</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  ⏰ {step.duration} | 🌡️ {step.temperature}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">{step.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parametry pieczenia */}
      <div className="mb-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
        <h3 className="font-semibold text-stone-700 mb-2 flex items-center gap-1">
          🔥 <Tooltip id="pieczenie" label="Parametry pieczenia" />
        </h3>
        <p className="text-sm text-stone-700">
          <strong>Metoda:</strong> {scaledRecipe.bakingParams.method}
        </p>
        <p className="text-sm text-stone-700">
          <strong>Temperatura:</strong> {scaledRecipe.bakingParams.temperature}
        </p>
        <p className="text-sm text-stone-700">
          <strong>Czas:</strong> {scaledRecipe.bakingParams.time}
        </p>
        <p className="text-xs text-stone-500 mt-1">{scaledRecipe.bakingParams.notes}</p>
      </div>

      {/* Porady */}
      <div className="mb-4">
        <h3 className="font-semibold text-stone-700 mb-2 flex items-center gap-1">
          💡 <Tooltip id="walek" label="Złote zasady" />
        </h3>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2 text-sm text-stone-600">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <Tooltip id="walek" label="Rozciągaj ciasto wyłącznie dłońmi" />
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-stone-600">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <Tooltip id="oliwa" label="Oliwa EV po upieczeniu" />
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-stone-600">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>
              <Tooltip id="toppings" label="Minimum 50% warzyw na pizzy" />
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-stone-600">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Zimna fermentacja min. 12h dla lepszej strawności</span>
          </li>
        </ul>
      </div>

      {/* Ostrzeżenia */}
      {scaledRecipe.warnings.length > 0 && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
          <h3 className="font-semibold text-red-700 mb-2">⚠️ Ostrzeżenia</h3>
          {scaledRecipe.warnings.map((w, i) => (
            <p key={i} className="text-sm text-red-600 mb-1">
              {w}
            </p>
          ))}
        </div>
      )}

      {/* Substytucje */}
      {scaledRecipe.substitutions.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-700 mb-2">🔄 Wymuszone substytucje</h3>
          {scaledRecipe.substitutions.map((sub, i) => (
            <div key={i} className="text-sm text-blue-600 mb-1">
              <span className="line-through text-blue-400">{sub.original}</span>
              {' → '}
              <span className="font-medium">{sub.replacement}</span>
              <p className="text-xs text-blue-400 mt-0.5">{sub.reason}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}