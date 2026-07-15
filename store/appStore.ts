// store/appStore.ts
import { create } from 'zustand';
import { AppState, ExclusionFlags, FlourBlendItem, CalculatorParams } from '@/types';
import { flours } from '@/lib/flourData';
import { computeFullRecipe } from '@/lib/bakersPercentage';
import { recipeTemplates } from '@/lib/recipeData';

const defaultExclusions: ExclusionFlags = {
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

const defaultBlend: FlourBlendItem[] = [
  { flour: flours.find((f) => f.id === 'orkisz-650')!, percentage: 100 },
];

const defaultParams: CalculatorParams = {
  flourBlend: defaultBlend,
  baseHydration: 0.65,
  saltPercentage: 2.5,
  prefermentPercentage: 20,
  oilPercentage: 0,
  ballStyle: 'napoli',
  ballCount: 4,
  customBallWeight: 250,
};

export const useAppStore = create<AppState>((set, get) => ({
  exclusions: { ...defaultExclusions },
  calculatorParams: { ...defaultParams },
  selectedRecipeId: null,
  scaledRecipe: null,

  setExclusion: (key, value) => {
    set((state) => {
      const newExclusions = { ...state.exclusions, [key]: value };
      return { exclusions: newExclusions };
    });
    // Automatycznie przelicz po zmianie
    const state = get();
    if (state.selectedRecipeId) {
      const recipe = recipeTemplates.find((r) => r.id === state.selectedRecipeId);
      if (recipe) {
        const params = state.calculatorParams;
        const scaled = computeFullRecipe(
          recipe,
          params.ballCount,
          params.customBallWeight,
          params.flourBlend,
          state.exclusions
        );
        set({ scaledRecipe: scaled });
      }
    }
  },

  resetExclusions: () => set({ exclusions: { ...defaultExclusions } }),

  setCalculatorParams: (params) => {
    set((state) => ({
      calculatorParams: { ...state.calculatorParams, ...params },
    }));
    const state = get();
    if (state.selectedRecipeId) {
      const recipe = recipeTemplates.find((r) => r.id === state.selectedRecipeId);
      if (recipe) {
        const p = state.calculatorParams;
        const scaled = computeFullRecipe(
          recipe,
          p.ballCount,
          p.customBallWeight,
          p.flourBlend,
          state.exclusions
        );
        set({ scaledRecipe: scaled });
      }
    }
  },

  setFlourBlend: (blend) => {
    set((state) => ({
      calculatorParams: { ...state.calculatorParams, flourBlend: blend },
    }));
    const state = get();
    if (state.selectedRecipeId) {
      const recipe = recipeTemplates.find((r) => r.id === state.selectedRecipeId);
      if (recipe) {
        const p = state.calculatorParams;
        const scaled = computeFullRecipe(
          recipe,
          p.ballCount,
          p.customBallWeight,
          p.flourBlend,
          state.exclusions
        );
        set({ scaledRecipe: scaled });
      }
    }
  },

  selectRecipe: (recipeId) => {
    const recipe = recipeTemplates.find((r) => r.id === recipeId);
    if (!recipe) return;

    const blend: FlourBlendItem[] = recipe.defaultFlourBlend.map((item) => ({
      flour: flours.find((f) => f.id === item.flourId)!,
      percentage: item.percentage,
    }));

    const params: CalculatorParams = {
      flourBlend: blend,
      baseHydration: recipe.baseHydration,
      saltPercentage: recipe.saltPercentage,
      prefermentPercentage: recipe.prefermentPercentage,
      oilPercentage: recipe.oilPercentage,
      ballStyle: recipe.ballStyle,
      ballCount: 4,
      customBallWeight: recipe.defaultBallWeight,
    };

    const scaled = computeFullRecipe(
      recipe,
      params.ballCount,
      params.customBallWeight,
      params.flourBlend,
      get().exclusions
    );

    set({
      selectedRecipeId: recipeId,
      calculatorParams: params,
      scaledRecipe: scaled,
    });
  },

  computeRecipe: () => {
    const state = get();
    if (!state.selectedRecipeId) return;
    const recipe = recipeTemplates.find((r) => r.id === state.selectedRecipeId);
    if (!recipe) return;
    const p = state.calculatorParams;
    const scaled = computeFullRecipe(
      recipe,
      p.ballCount,
      p.customBallWeight,
      p.flourBlend,
      state.exclusions
    );
    set({ scaledRecipe: scaled });
  },
}));