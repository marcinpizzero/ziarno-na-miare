export type DietaryTag = "dairy-free" | "low-fodmap" | "low-gi" | "gluten-free";

export interface Ingredient {
  name: string;
  amountPerPortion: number; // Ilość bazowa przypadająca na 1 porcję
  unit: string;             // np. "g", "ml", "łyżeczka"
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: "pizza" | "focaccia" | "pieczywo";
  defaultPortions: number;
  portionUnitName: string;   // np. "pizze", "porcje", "bochenki"
  timeMinutes: string;       // np. "24h (długa fermentacja)"
  shortDescription: string;
  recommendedFlourId?: string; // Powiązanie z mąką z Atlasu (np. "niro-orkisz-00")
  tags: DietaryTag[];
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
  {
    id: "pizza-orkisz-00",
    slug: "domowa-pizza-orkiszowa",
    title: "Domowa Pizza Orkiszowa (Długa Fermentacja)",
    category: "pizza",
    defaultPortions: 2,
    portionUnitName: "pizze (kulki ok. 260g)",
    timeMinutes: "24h fermentacji w lodówce",
    shortDescription: "Chrupiący brzeg, miękkie wnętrze i maksymalna lekkostrawność dzięki Bio Mące Orkiszowej Typ 00.",
    recommendedFlourId: "niro-orkisz-00",
    tags: ["dairy-free", "low-fodmap"],
    ingredients: [
      { name: "Bio Mąka orkiszowa Typ 00 (NIRO BIO)", amountPerPortion: 160, unit: "g" },
      { name: "Woda (zimna)", amountPerPortion: 105, unit: "ml" },
      { name: "Sól morska", amountPerPortion: 4.5, unit: "g" },
      { name: "Świeże drożdże", amountPerPortion: 0.5, unit: "g" },
      { name: "Oliwa z oliwek extra virgin", amountPerPortion: 4, unit: "ml" },
    ],
    steps: [
      "Rozpuść drożdże w chłodnej wodzie.",
      "Dodaj mąkę orkiszową 00 i zacznij mieszać łyżką lub dłonią do połączenia składników.",
      "Dodaj sól oraz oliwę. Wyrabiaj ciasto przez ok. 8-10 minut, aż stanie się gładkie i elastyczne.",
      "Przełóż ciasto do pojemnika, zamknij szczelnie i wstaw do lodówki (4-6°C) na 20-24 godziny.",
      "Wyjmij ciasto na 2 godziny przed pieczeniem, podziel na równe kulki i uformuj placki.",
      "Piecz w maksymalnej temperaturze piekarnika (250-280°C z funkcją termoobiegu lub grill) na rozgrzanej blasze lub kamieniu przez ok. 5-7 minut.",
    ],
  },
  {
    id: "focaccia-oliwa-rozmaryn",
    slug: "rzemieslnicza-focaccia-rozmaryn",
    title: "Rzemieślnicza Focaccia z Oliwą i Solą Morską",
    category: "focaccia",
    defaultPortions: 4,
    portionUnitName: "duże porcje",
    timeMinutes: "18h fermentacji",
    shortDescription: "Puszysta focaccia z dużymi bąblami, aromatem świeżego rozmarynu i chrupiącą złocistą skórką.",
    recommendedFlourId: "niro-orkisz-00",
    tags: ["dairy-free", "low-gi"],
    ingredients: [
      { name: "Bio Mąka orkiszowa Typ 00 lub chlebowa", amountPerPortion: 100, unit: "g" },
      { name: "Woda", amountPerPortion: 75, unit: "ml" },
      { name: "Oliwa z oliwek (do ciasta i formy)", amountPerPortion: 8, unit: "ml" },
      { name: "Sól", amountPerPortion: 2.5, unit: "g" },
      { name: "Drożdże świeże", amountPerPortion: 0.8, unit: "g" },
      { name: "Świeży rozmaryn", amountPerPortion: 1, unit: "gałązka" },
    ],
    steps: [
      "Połącz wodę z drożdżami, dodaj mąkę i odstaw na 30 minut (autoliza).",
      "Dodaj sól i 2/3 oliwy, wykonaj 3 serie składań ciasta co 30 minut w misce.",
      "Odstaw do lodówki na noc (ok. 12-16 godzin).",
      "Przełóż ciasto na obficie naoliwioną blachę, pozostaw do wyrośnięcia w temperaturze pokojowej na ok. 2 godziny.",
      "Polej wierzch oliwą, zrób charakterystyczne wgłębienia palcami, posyp solą morską i rozmarynem.",
      "Piecz w temperaturze 220°C przez ok. 20-25 minut na złocisty kolor.",
    ],
  },
];