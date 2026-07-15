// components/ExclusionFilters.tsx
'use client';

import { useAppStore } from '@/store/appStore';
import { ExclusionFlags } from '@/types';
import { motion } from 'framer-motion';

const exclusionConfig: {
  key: keyof ExclusionFlags;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    key: 'glutenCeliac',
    label: 'Gluten / Celiakia',
    icon: '🌾',
    description: 'Blokuje mąki glutenowe, przełącza na blendy GF',
  },
  {
    key: 'fodmapIbs',
    label: 'FODMAP / IBS',
    icon: '🔬',
    description: 'Wymusza fermentację zakwasową ≥24h',
  },
  {
    key: 'lactoseDairy',
    label: 'Laktoza / Nabiał',
    icon: '🥛',
    description: 'Zamiana na oliwę EV i alternatywy roślinne',
  },
  {
    key: 'commercialYeast',
    label: 'Drożdże przemysłowe',
    icon: '🦠',
    description: 'Wyłącznie dziki zakwas (sourdough)',
  },
  {
    key: 'highGI',
    label: 'Wysoki IG / Insulinooporność',
    icon: '📊',
    description: 'Forsuje mąki pełnoziarniste o niskim IG',
  },
  {
    key: 'sesame',
    label: 'Alergia: Sezam',
    icon: '⚠️',
    description: 'Eliminuje sezam z przepisów',
  },
  {
    key: 'soy',
    label: 'Alergia: Soja',
    icon: '⚠️',
    description: 'Eliminuje soję z przepisów',
  },
  {
    key: 'nuts',
    label: 'Alergia: Orzechy',
    icon: '⚠️',
    description: 'Eliminuje orzechy z przepisów',
  },
  {
    key: 'eggs',
    label: 'Alergia: Jajka',
    icon: '⚠️',
    description: 'Eliminuje jajka, sugeruje zamienniki',
  },
];

export default function ExclusionFilters() {
  const exclusions = useAppStore((s) => s.exclusions);
  const setExclusion = useAppStore((s) => s.setExclusion);
  const resetExclusions = useAppStore((s) => s.resetExclusions);

  const activeCount = Object.values(exclusions).filter(Boolean).length;

  return (
    <section className="bg-stone-100 rounded-2xl p-4 md:p-6 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <span>🚫</span> Panel Wykluczeń
        </h2>
        {activeCount > 0 && (
          <button
            onClick={resetExclusions}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            Resetuj ({activeCount})
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {exclusionConfig.map(({ key, label, icon, description }) => {
          const isActive = exclusions[key];
          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExclusion(key, !isActive)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                min-h-[44px] transition-all duration-200 select-none
                ${
                  isActive
                    ? 'bg-red-500 text-white shadow-md shadow-red-200 ring-2 ring-red-300'
                    : 'bg-white text-stone-700 border border-stone-300 hover:border-stone-400 hover:bg-stone-50'
                }
              `}
              title={description}
            >
              <span className="text-base">{icon}</span>
              <span className="whitespace-nowrap">{label}</span>
              {isActive && <span className="text-white/80 text-xs ml-0.5">✓</span>}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}