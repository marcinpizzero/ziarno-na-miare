// lib/bakersPercentage.ts
import {
    CalculatorParams,
    ExclusionFlags,
    FlourBlendItem,
    ScaledRecipe,
    ScaledIngredient,
    RecipeTemplate,
    Flour,
  } from '@/types';
  import {
    getHydrationBoostFromExclusions,
    getWarningsFromExclusions,
    getSubstitutionsForExclusions,
    adjustBlendForExclusions,
  } from './exclusionLogic';
  import { recipeTemplates } from './recipeData';
  
  function getBallWeight(style: string, customWeight: number): number {
    switch (style) {
      case 'napoli':
        return 250;
      case 'detroit':
        return 400;
      case 'pinsa':
        return 140;
      case 'focaccia':
        return 200;
      case 'custom':
        return customWeight > 0 ? customWeight : 200;
      default:
        return 250;
    }
  }
  
  export function calculateHydration(
    flourBlend: FlourBlendItem[],
    baseHydration: number,
    exclusions: ExclusionFlags
  ): { adjustedHydration: number; reason: string } {
    if (flourBlend.length === 0) {
      return { adjustedHydration: baseHydration, reason: 'Brak wybranej mąki.' };
    }
  
    const total = flourBlend.reduce((sum, item) => sum + item.percentage, 0);
    if (Math.abs(total - 100) > 0.01) {
      return {
        adjustedHydration: baseHydration,
        reason: 'Suma udziałów mąk musi wynosić 100%.',
      };
    }
  
    // Średnia ważona hydrationBoost dla blendu
    let weightedBoost = 0;
    for (const item of flourBlend) {
      weightedBoost += item.flour.hydrationBoost * (item.percentage / 100);
    }
  
    // Boost z wykluczeń
    const exclusionBoost = getHydrationBoostFromExclusions(exclusions);
    const totalBoost = weightedBoost + exclusionBoost.boost;
  
    const adjustedHydration = baseHydration + totalBoost;
    const reasons: string[] = [];
  
    if (weightedBoost > 0) {
      reasons.push(
        `Średni boost z mąk: +${(weightedBoost * 100).toFixed(0)}%`
      );
    }
    reasons.push(...exclusionBoost.reasons);
  
    return {
      adjustedHydration: Math.round(adjustedHydration * 1000) / 1000,
      reason: reasons.join(' | ') || 'Hydracja bazowa bez korekt.',
    };
  }
  
  export function scaleRecipe(
    baseRecipe: RecipeTemplate,
    targetWeight?: number,
    ballCount?: number,
    ballWeight?: number
  ): ScaledRecipe {
    // ... (implementacja poniżej)
    // placeholder – pełna implementacja w funkcji computeFullRecipe
    return computeFullRecipe(baseRecipe, ballCount || 4, ballWeight || 250);
  }
  
  function computeFullRecipe(
    recipe: RecipeTemplate,
    ballCount: number,
    customBallWeight: number,
    blendOverride?: FlourBlendItem[],
    exclusionsOverride?: ExclusionFlags
  ): ScaledRecipe {
    const exclusions = exclusionsOverride || {
      glutenCeliac: false,
      fodmapIbs: false,
      lactoseDairy: false,
      commercialYeast: false,
      highGI: false,
      sesame: false,
      soy: false,
      nuts: false,
      eggs: false,
    };
  
    const blend =
      blendOverride && blendOverride.length > 0
        ? adjustBlendForExclusions(blendOverride, exclusions)
        : [];
  
    const ballW = getBallWeight(recipe.ballStyle, customBallWeight);
    const totalDough = ballW * ballCount;
  
    // Oblicz hydrację
    const baseHydration = recipe.baseHydration;
    const { adjustedHydration, reason: hydrationReason } = calculateHydration(
      blend,
      baseHydration,
      exclusions
    );
  
    // Baker's math: mąka = 100%
    // suma procentów: 100% (mąka) + hydration% + salt% + preferment% + oil%
    const saltPct = recipe.saltPercentage / 100;
    const prefermentPct = recipe.prefermentPercentage / 100;
    const oilPct = recipe.oilPercentage / 100;
  
    const totalPercentage = 1 + adjustedHydration + saltPct + prefermentPct + oilPct;
    const flourWeight = totalDough / totalPercentage;
  
    const waterWeight = flourWeight * adjustedHydration;
    const saltWeight = flourWeight * saltPct;
    const prefermentWeight = flourWeight * prefermentPct;
    const oilWeight = flourWeight * oilPct;
  
    const ingredients: ScaledIngredient[] = [
      {
        name: 'Mąka',
        amountGrams: Math.round(flourWeight),
        percentageOfFlour: 100,
        notes: blend.map((b) => `${b.flour.name} (${b.percentage}%)`).join(', '),
      },
      {
        name: 'Woda',
        amountGrams: Math.round(waterWeight),
        percentageOfFlour: Math.round(adjustedHydration * 100),
        notes: hydrationReason,
      },
      {
        name: 'Sól',
        amountGrams: Math.round(saltWeight * 10) / 10,
        percentageOfFlour: recipe.saltPercentage,
      },
      {
        name: exclusions.commercialYeast ? 'Zakwas' : 'Zakwas / Drożdże',
        amountGrams: Math.round(prefermentWeight),
        percentageOfFlour: recipe.prefermentPercentage,
        notes: exclusions.commercialYeast
          ? 'Wyłącznie dziki zakwas (sourdough)'
          : 'Zakwas lub drożdże według preferencji',
      },
    ];
  
    if (recipe.oilPercentage > 0) {
      const oilName = exclusions.lactoseDairy ? 'Oliwa EV (zamiennik nabiału)' : 'Oliwa EV';
      ingredients.push({
        name: oilName,
        amountGrams: Math.round(oilWeight),
        percentageOfFlour: recipe.oilPercentage,
      });
    }
  
    // Dodajemy substytucje
    const substitutions = getSubstitutionsForExclusions(recipe, exclusions);
  
    // Ostrzeżenia
    const warnings = getWarningsFromExclusions(exclusions, blend);
  
    // Dodajemy notatki o blendzie
    if (blend.length > 0) {
      const blendNote = `Blend: ${blend
        .map((b) => `${b.flour.name} ${b.percentage}%`)
        .join(' + ')}`;
      if (!warnings.includes(blendNote)) {
        warnings.unshift(blendNote);
      }
    }
  
    return {
      totalDoughWeight: Math.round(totalDough),
      flourTotalWeight: Math.round(flourWeight),
      waterTotalWeight: Math.round(waterWeight),
      ingredients,
      warnings,
      substitutions,
      fermentationSchedule: recipe.fermentationSchedule,
      bakingParams: recipe.bakingParams,
    };
  }
  
  export { computeFullRecipe };