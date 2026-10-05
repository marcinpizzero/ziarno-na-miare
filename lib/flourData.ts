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
  logoUrl?: string;
  shopUrl: string;
}

export interface FlourProduct {
  id: string;
  slug: string;
  name: string;
  type: string;
  grainType: string;
  purpose: string[];
  description: string;
  shortDescription: string;
  itemNumber?: string;
  netWeight?: string;
  ingredients: string;
  isGlutenFree: boolean;
  category: "flour" | "spice" | "accessory";
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
    shortDescription: "Włoski standard mielenia na śnieżnobiały pył. Bogata w gluten, idealna do długich fermentacji i chrupiących wypieków.",
    description: "Mąka 00 to włoska klasyka drobnego przemiału. Dzięki wysokiej elastyczności ciasta sprawdza się w wypiekach wymagających długiej fermentacji chłodniczej. Ciasto jest miękkie w środku, a z zewnątrz zyskuje wyrazistą chrupkość.",
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
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-orkisz-650",
    slug: "ekologiczna-biala-maka-orkiszowa-typ-650",
    name: "Ekologiczna Biała Mąka Orkiszowa Typ 650",
    type: "Typ 650",
    grainType: "Orkisz",
    purpose: ["Pierogi", "Kluski", "Placki", "Naleśniki", "Racuchy", "Kruche ciasta", "Zagęszczanie sosów"],
    shortDescription: "Charakterystyczna, lekko ziarnista struktura przypominająca krupczatkę. Daje wypiekom wyjątkową teksturę i kruchość.",
    description: "Wytwarzana z czystych odmian orkiszu (Schwabenkorn, Frankenkorn, Ostro) rekomendowanych przez św. Hildegardę z Bingen. Posiada wyczuwalne drobne drobinki, dzięki czemu ciasta kruche i zaparzane ciasto na pierogi zyskują idealną sprężystość.",
    itemNumber: "4292PL",
    netWeight: "1000 g",
    ingredients: "mąka z pszenicy orkisz* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 354,
      fat: 1.3,
      saturatedFat: 0.3,
      carbs: 73.0,
      sugars: 2.0,
      fiber: 3.9,
      protein: 10.6,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl/racuchy-orkiszowe",
    },
  },
  {
    id: "niro-orkisz-700",
    slug: "ekologiczna-biala-maka-orkiszowa-typ-700",
    name: "Ekologiczna Biała Mąka Orkiszowa Typ 700",
    type: "Typ 700",
    grainType: "Orkisz",
    purpose: ["Chleb domowy", "Bułki", "Ciasta ucierane", "Drożdżówki", "Makarony", "Gofry"],
    shortDescription: "Bardzo gładka, drobno zmielona i uniwersalna. Doskonała baza do codziennego pieczywa i ciast drożdżowych.",
    description: "Jednolita, sypka mąka orkiszowa bez wyczuwalnych grudek. Zapewnia równomierne wyrastanie ciast i elastyczność miękiszu w chlebach orkiszowych na drożdżach i zakwasie.",
    itemNumber: "4295PL",
    netWeight: "1000 g",
    ingredients: "mąka z pszenicy orkisz* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 334,
      fat: 2.3,
      saturatedFat: 0.5,
      carbs: 62.5,
      sugars: 3.0,
      fiber: 5.9,
      protein: 12.9,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl/chleb-orkiszowy-ze-slonecznikiem",
    },
  },
  {
    id: "niro-orkisz-2000",
    slug: "bio-maka-orkiszowa-pelnoziarnista-typ-2000",
    name: "Bio Mąka Orkiszowa Typ 2000 (Pełny Przemiał)",
    type: "Typ 2000",
    grainType: "Orkisz",
    purpose: ["Chleb razowy", "Bułki pełnoziarniste", "Zakwas orkiszowy", "Kruche ciastka"],
    shortDescription: "Świeżo mielona na żarnach kamiennych. Aż 17g białka i 10g błonnika z pełnego ziarna orkiszu.",
    description: "Mielona w młynach żarnowych tuż przed pakowaniem, by zachować pełnię zarodka i składników mineralnych. Nadaje chlebom głęboki, orzechowy aromat oraz gęsty, sycący miękisz.",
    itemNumber: "4299PL",
    netWeight: "1500 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka z pszenicy orkisz* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 345,
      fat: 1.7,
      saturatedFat: 0.2,
      carbs: 60.3,
      sugars: 0.3,
      fiber: 10.0,
      protein: 17.0,
      salt: 0.02,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-owsiana-2000",
    slug: "bio-maka-owsiana-pelnoziarnista-typ-2000",
    name: "Bio Mąka Owsiana Typ 2000 (Pełny Przemiał)",
    type: "Typ 2000",
    grainType: "Owies",
    purpose: ["Naleśniki owsiane", "Ciasteczka", "Kruszonki", "Dodatek do chleba"],
    shortDescription: "Bogata w beta-glukany, witaminę E i minerały. Nadaje wypiekom maślany posmak i obniża indeks glikemiczny.",
    description: "Pełnoziarnista mąka owsiana ze świeżego przemiału ekologicznego ziarna. Ze względu na niski profil glikemiczny i wysoką zawartość błonnika stanowi doskonały dodatek uszlachetniający strukturę domowych wypieków.",
    itemNumber: "NIRO-OWS-2000",
    netWeight: "1000 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka owsiana* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 349,
      fat: 7.1,
      saturatedFat: 1.4,
      carbs: 55.7,
      sugars: 1.3,
      fiber: 9.7,
      protein: 10.7,
      salt: 0.02,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-plaskurka-2000",
    slug: "bio-maka-z-plaskurki-pelnoziarnista",
    name: "Bio Mąka z Płaskurki (Pełny Przemiał)",
    type: "Typ 2000",
    grainType: "Płaskurka",
    purpose: ["Chleb pradawny", "Naleśniki", "Racuchy", "Kruche ciasta"],
    shortDescription: "Pradawny przodek pszenicy o miodowo-orzechowym aromacie. Lekkostrawna i bogata w antyoksydanty.",
    description: "Mielona na młynkach żarnowych z ekologicznych polskich upraw. Płaskurka wyróżnia się delikatniejszą strukturą białek glutenowych, dzięki czemu przy odpowiednio dobranej hydratacji daje pieczywo o wyjątkowym charakterze.",
    itemNumber: "NIRO-PLAS-2000",
    netWeight: "1000 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka z pszenicy płaskurki* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 333,
      fat: 2.0,
      saturatedFat: 0.5,
      carbs: 61.0,
      sugars: 1.6,
      fiber: 9.6,
      protein: 13.0,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-samopsza-2000",
    slug: "bio-maka-z-samopszy-pelnoziarnista",
    name: "Bio Mąka z Samopszy (Pełny Przemiał)",
    type: "Typ 2000",
    grainType: "Samopsza",
    purpose: ["Chleb z formy", "Podpłomyki", "Naleśniki", "Gofry", "Ciasteczka"],
    shortDescription: "Najstarsze uprawiane zboże świata. Złocista barwa dzięki karotenoidom, bogata w aminokwasy egzogenne.",
    description: "Samopsza to pierwotna forma pszenicy, niemodyfikowana genetycznie. Posiada bardzo delikatny gluten, dlatego wymaga delikatnego mieszania i najlepiej sprawdza się w wypieku chlebów w foremkach lub jako wartościowa domieszka.",
    itemNumber: "NIRO-SAM-2000",
    netWeight: "1000 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka z pszenicy samopszy* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 337,
      fat: 3.0,
      saturatedFat: 0.7,
      carbs: 58.0,
      sugars: 1.5,
      fiber: 9.0,
      protein: 15.0,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-pradawna-mieszanka",
    slug: "bio-maka-pradawna-pszenica-pelnoziarnista",
    name: "Bio Mąka Pradawna Pszenica (Mieszanka 3 Zbóż)",
    type: "Typ 2000",
    grainType: "Mieszanka Pradawna",
    purpose: ["Chleb rustykalny", "Bułki rzemieślnicze", "Ciasto na pizzę rustykalną"],
    shortDescription: "Zrównoważone trio prastarych ziaren: samopsza (33,3%), płaskurka (33,3%) i orkisz (33,3%).",
    description: "Autorska kompozycja trzech najszlachetniejszych gatunków pszenic archaicznych. Łączy plastyczność orkiszu, głęboki smak płaskurki oraz wartości odżywcze samopszy.",
    itemNumber: "4300PL",
    netWeight: "1000 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka z: pszenicy samopszy* (33,3%), pszenicy płaskurki* (33,3%), pszenicy orkisz* (33,3%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 338,
      fat: 2.2,
      saturatedFat: 0.1,
      carbs: 59.8,
      sugars: 0.3,
      fiber: 9.5,
      protein: 15.0,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
  {
    id: "niro-zytnia-2000",
    slug: "bio-maka-zytnia-pelnoziarnista-typ-2000",
    name: "Bio Mąka Żytnia Typ 2000 (Pełny Przemiał)",
    type: "Typ 2000",
    grainType: "Żyto",
    purpose: ["Chleb żytni na zakwasie", "Prowadzenie zakwasu", "Pierniki", "Kruche tarty"],
    shortDescription: "Aż 13,2g błonnika pokarmowego. Niezbędna baza do prowadzenia aktywnego zakwasu i tradycyjnego razowca.",
    description: "Mąka ze świeżego, pełnego przemiału ekologicznego żyta. Zawiera kompleks witamin z grupy B, cynk i magnez. Śluzowce żyta nadają chlebom zwartą strukturę i długotrwałą świeżość.",
    itemNumber: "4301PL",
    netWeight: "1000 g",
    ingredients: "świeżo zmielona pełnoziarnista mąka żytnia* (100%) *z rolnictwa ekologicznego",
    isGlutenFree: false,
    category: "flour",
    nutrition: {
      energyKcal: 322,
      fat: 1.6,
      saturatedFat: 0.3,
      carbs: 60.7,
      sugars: 1.0,
      fiber: 13.2,
      protein: 9.5,
      salt: 0.01,
    },
    partner: {
      name: "NIRO BIO",
      logoUrl: "/partners/niro-bio.png",
      shopUrl: "https://www.niro-bio.pl",
    },
  },
];