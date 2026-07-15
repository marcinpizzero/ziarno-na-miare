// lib/exclusionLogic.ts
import { ExclusionFlags, Flour, FlourBlendItem, RecipeTemplate } from '@/types';
import { flours } from './flourData';

export function filterFloursByExclusions(
  flourList: Flour[],
  exclusions: ExclusionFlags
): Flour[] {
  return flourList.filter((flour) => {
    if (exclusions.glutenCeliac && !flour.glutenFree) return false;
    if (exclusions.highGI && flour.glycemicIndex === 'high') return false;
    if (exclusions.fodmapIbs && !flour.fodmapSafe) return false;
    return true;
  });
}

export function getHydrationBoostFromExclusions(
  exclusions: ExclusionFlags
): { boost: number; reasons: string[] } {
  let boost = 0;
  const reasons: string[] = [];

  if (exclusions.glutenCeliac) {
    boost += 0.05;
    reasons.push('Blend bezglutenowy: +5% hydracji dla lepszej struktury');
  }
  if (exclusions.highGI) {
    boost += 0.03;
    reasons.push('Mąki pełnoziarniste: +3% hydracji dla absorpcji błonnika');
  }
  return { boost, reasons };
}

export function getSubstitutionsForExclusions(
  recipe: RecipeTemplate,
  exclusions: ExclusionFlags
): { original: string; replacement: string; reason: string }[] {
  const subs: { original: string; replacement: string; reason: string }[] = [];

  if (exclusions.lactoseDairy) {
    subs.push({
      original: 'masło / mleko / ser',
      replacement: 'oliwa EV / napój roślinny / ser roślinny (cashew, tofu)',
      reason: 'Wykluczenie laktozy/nabiału',
    });
  }
  if (exclusions.commercialYeast) {
    subs.push({
      original: 'drożdże instant/świeże',
      replacement: 'dziki zakwas (sourdough starter)',
      reason: 'Wykluczenie drożdży przemysłowych',
    });
  }
  if (exclusions.sesame) {
    subs.push({
      original: 'sezam',
      replacement: 'siemię lniane / słonecznik',
      reason: 'Alergia na sezam',
    });
  }
  if (exclusions.soy) {
    subs.push({
      original: 'sos sojowy / tofu',
      replacement: 'aminokwasy kokosowe / ser cashew',
      reason: 'Alergia na soję',
    });
  }
  if (exclusions.nuts) {
    subs.push({
      original: 'orzechy / mąka migdałowa',
      replacement: 'nasiona (dynia, słonecznik) / mąka owsiana',
      reason: 'Alergia na orzechy',
    });
  }
  if (exclusions.eggs) {
    subs.push({
      original: 'jajka',
      replacement: 'siemię lniane + woda (1:3) / aquafaba',
      reason: 'Alergia na jajka',
    });
  }
  if (exclusions.glutenCeliac) {
    subs.push({
      original: 'mąki glutenowe',
      replacement: 'blend GF (ryżowa, gryczana, kukurydziana, amarantus)',
      reason: 'Celiakia / nadwrażliwość na gluten',
    });
  }
  return subs;
}

export function getWarningsFromExclusions(
  exclusions: ExclusionFlags,
  blend: FlourBlendItem[]
): string[] {
  const warnings: string[] = [];
  if (exclusions.glutenCeliac) {
    warnings.push(
      '⚠️ ALERT CROSS-KONTAMINACJI: Upewnij się, że wszystkie mąki GF mają certyfikat bezglutenowy. Pracuj na oddzielnym sprzęcie.'
    );
    warnings.push(
      '⚠️ Ciasto bezglutenowe jest bardzo delikatne – nie wyrabiaj zbyt intensywnie. Może wymagać dodatku gumy ksantanowej (0.5% wagi mąki).'
    );
  }
  if (exclusions.fodmapIbs) {
    warnings.push(
      '🔬 Fermentacja zakwasowa min. 24h wymagana dla neutralizacji FODMAP. Skrócenie czasu może powodować dolegliwości.'
    );
    warnings.push(
      '🚫 Unikaj dodatków wysokofodmapowych: cebula, czosnek, miód, syrop z agawy.'
    );
  }
  if (exclusions.highGI) {
    warnings.push(
      '📊 Mąki o niskim IG (<55) zostały automatycznie wybrane. Unikaj dodatku cukru i miodu.'
    );
  }
  if (exclusions.commercialYeast) {
    warnings.push(
      '🦠 Tryb wyłącznie zakwasowy. Upewnij się, że Twój starter jest aktywny (podwaja objętość w 4h).'
    );
  }
  return warnings;
}

export function adjustBlendForExclusions(
  blend: FlourBlendItem[],
  exclusions: ExclusionFlags
): FlourBlendItem[] {
  const filtered = blend.filter((item) => {
    if (exclusions.glutenCeliac && !item.flour.glutenFree) return false;
    if (exclusions.highGI && item.flour.glycemicIndex === 'high') return false;
    if (exclusions.fodmapIbs && !item.flour.fodmapSafe) return false;
    return true;
  });

  if (filtered.length === 0 && blend.length > 0) {
    // Podmień na bezpieczne zamienniki
    const safeFlours = filterFloursByExclusions(flours, exclusions);
    if (safeFlours.length > 0) {
      const gf = safeFlours.find((f) => f.type === 'gf-blend') || safeFlours[0];
      return [{ flour: gf, percentage: 100 }];
    }
    return [];
  }

  // Normalizuj procenty
  const total = filtered.reduce((sum, item) => sum + item.percentage, 0);
  if (total > 0 && Math.abs(total - 100) > 0.01) {
    return filtered.map((item) => ({
      ...item,
      percentage: Math.round((item.percentage / total) * 100),
    }));
  }
  return filtered;
}