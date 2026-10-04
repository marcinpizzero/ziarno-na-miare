export interface NutritionalValues {
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbs: number;
  sugars: number;
  fiber: number;
  protein: number;
  salt: number;
}

export interface PartnerInfo {
  name: string;
  logoUrl?: string; // ścieżka do logo w folderze /public/partners/
  shopUrl: string;  // bezpośredni link do sklepu partnera
}

export interface FlourProduct {
  id: string;
  slug: string;
  name: string;
  type: string;             // np. "Typ 00", "Typ 700"
  grainType: string;        // np. "Orkisz", "Pszenica", "Żyto"
  purpose: string[];        // np. ["Pizza", "Focaccia", "Bułki", "Kruche ciasta"]
  description: string;
  shortDescription: string;
  itemNumber?: string;      // Kod produktu, np. "4296PL"
  netWeight?: string;       // np. "1000 g"
  ingredients: string;
  isGlutenFree: boolean;    // Furtka pod filtry bezglutenowe
  category: "flour" | "spice" | "accessory"; // Furtka pod produkty rzemieślnicze
  nutrition: NutritionalValues;
  partner?: PartnerInfo;
}

export const FLOURS: FlourProduct[] = [
  {
    id: "niro-orkisz-00",
    slug: "bio-maka-orkiszowa-typ-00",
    name: "Bio Mąka Orkiszowa Typ 00",
    type: "Typ 00",
    grainType: "Orkisz",
    purpose: ["Pizza", "Pinsa", "Focaccia", "Bułki pszenne", "Ravioli", "Kruche ciasta"],
    shortDescription: "Śnieżnobiała, drobno mielona mąka orkiszowa bogata w gluten. Daje chrupiący brzeg i puszyste wnętrze.",
    description: "Mąka 00 to włoski klasyk, drobno mielony przypominający śnieżnobiały pył. Charakteryzuje się wysoką zawartością glutenu, dzięki czemu idealnie sprawdza się do ciast wymagających długiej fermentacji. Wypiekane z niej ciasto jest miękkie i delikatne w środku, a chrupiące na zewnątrz.",
    itemNumber: "4296PL",
    netWeight: "1000 g",
    ingredients: "mąka z pszenicy orkisz* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 346,
      fat: 1.5,
      saturatedFat: 0.4,
      carbs: 68.2,
      sugars: 0.6,
      fiber: 2.6,
      protein: 13.5,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png", // Domyślna ścieżka do logo partnera
      shopUrl: "https://nirobio.pl",      // Bezpośredni link do sklepu partnera
    },
  },
];