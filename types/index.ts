// types/index.ts

export type FlourType =
  | 'wheat'
  | 'rye'
  | 'spelt'
  | 'einkorn'
  | 'emmer'
  | 'legume'
  | 'gf-blend'
  | 'other';

export type GlycemicIndex = 'low' | 'medium' | 'high';

export interface Flour {
  id: string;
  name: string;
  type: FlourType;
  glutenFree: boolean;
  typNumber?: number;
  hydrationAbsorption: number; // 0.0–1.0
  hydrationBoost: number; // dodatkowy % hydracji względem Typ 00
  glycemicIndex: GlycemicIndex;
  protein: number; // g/100g
  fiber: number; // g/100g
  keyNutrients: string[];
  fermentationNotes: string;
  organic: boolean;
  fodmapSafe: boolean;
  notes: string;
}

export interface FlourBlendItem {
  flour: Flour;
  percentage: number; // 0–100
}

export interface ExclusionFlags {
  glutenCeliac: boolean;
  fodmapIbs: boolean;
  lactoseDairy: boolean;
  commercialYeast: boolean;
  highGI: boolean;
  sesame: boolean;
  soy: boolean;
  nuts: boolean;
  eggs: boolean;
}

export type BallStyle = 'napoli' | 'detroit' | 'pinsa' | 'focaccia' | 'custom';

export interface CalculatorParams {
  flourBlend: FlourBlendItem[];
  baseHydration: number; // 0–1
  saltPercentage: number; // % mąki
  prefermentPercentage: number; // % zakwasu/drożdży
  oilPercentage: number; // % mąki
  ballStyle: BallStyle;
  ballCount: number;
  customBallWeight: number; // g
}

export interface ScaledIngredient {
  name: string;
  amountGrams: number;
  percentageOfFlour: number;
  notes?: string;
}

export interface ScaledRecipe {
  totalDoughWeight: number;
  flourTotalWeight: number;
  waterTotalWeight: number;
  ingredients: ScaledIngredient[];
  warnings: string[];
  substitutions: { original: string; replacement: string; reason: string }[];
  fermentationSchedule: FermentationStep[];
  bakingParams: BakingParams;
}

export interface FermentationStep {
  step: number;
  description: string;
  duration: string;
  temperature: string;
  notes: string;
}

export interface BakingParams {
  method: string;
  temperature: string;
  time: string;
  notes: string;
}

export interface RecipeTemplate {
  id: string;
  name: string;
  description: string;
  baseHydration: number;
  saltPercentage: number;
  prefermentPercentage: number;
  oilPercentage: number;
  defaultBallWeight: number;
  ballStyle: BallStyle;
  defaultFlourBlend: { flourId: string; percentage: number }[];
  fermentationSchedule: FermentationStep[];
  bakingParams: BakingParams;
  toppings: string[];
  instructions: string[];
}

export interface AppState {
  exclusions: ExclusionFlags;
  calculatorParams: CalculatorParams;
  selectedRecipeId: string | null;
  scaledRecipe: ScaledRecipe | null;

  setExclusion: (key: keyof ExclusionFlags, value: boolean) => void;
  resetExclusions: () => void;
  setCalculatorParams: (params: Partial<CalculatorParams>) => void;
  setFlourBlend: (blend: FlourBlendItem[]) => void;
  selectRecipe: (recipeId: string) => void;
  computeRecipe: () => void;
}