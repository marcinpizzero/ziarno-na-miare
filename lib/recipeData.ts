import { pizzaRecipes } from "./recipes/pizzas";
import { breadRecipes } from "./recipes/breads";

export type DietaryTag = "dairy-free" | "low-fodmap" | "low-gi" | "gluten-free";

export interface Ingredient {
  name: string;
  amountPerPortion: number;
  unit: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: "pizza" | "focaccia" | "pieczywo";
  defaultPortions: number;
  portionUnitName: string;
  timeMinutes: string;
  shortDescription: string;
  recommendedFlourId?: string;
  tags: readonly DietaryTag[];
  ingredients: Ingredient[];
  steps: string[];
}

export const DIETARY_TAG_LABELS: Record<DietaryTag, string> = {
  "dairy-free": "Bez Nabiału",
  "low-fodmap": "Low FODMAP",
  "low-gi": "Niski IG",
  "gluten-free": "Bezgluten",
};

export const RECIPES: Recipe[] = [
  ...pizzaRecipes,
  ...breadRecipes,
];