// lib/exclusionRecipes.ts

export interface RecipeIngredient {
    name: string;
    amount: string;
    flourId?: string; // jeśli to mąka - link do Atlasu
  }
  
  export interface RecipeData {
    slug: string;
    title: string;
    category: string;
    shortDescription: string;
    prepTime: string;
    bakeTime: string;
    totalTime: string;
    servings: number;
    difficulty: string;
    calories: string;
    equipment: string[];
    ingredients: {
      section: string;
      items: RecipeIngredient[];
    }[];
    steps: {
      step: number;
      description: string;
    }[];
    tips: string[];
    storage: string[];
    modifications: string[];
    image?: string; // ścieżka do zdjęcia (na razie puste)
  }
  
  export const exclusionCategories = [
    {
      id: 'prosty-sklad',
      name: 'Prosty skład',
      icon: '🌾',
      description: 'Tylko mąka, woda, sól i czas. Żadnych polepszaczy. Długa fermentacja, czysta etykieta.',
    },
    {
      id: 'bez-glutenu',
      name: 'Bez glutenu',
      icon: '🚫',
      description: 'Przepisy bezglutenowe dla osób z celiakią i nadwrażliwością na gluten.',
    },
    {
      id: 'niski-ig',
      name: 'Niski indeks glikemiczny',
      icon: '📊',
      description: 'Dla insulinooporności i cukrzycy. Mąki pełnoziarniste, długie fermentacje.',
    },
    {
      id: 'low-fodmap',
      name: 'Low FODMAP',
      icon: '🔬',
      description: 'Fermentacja zakwasowa 24h+. Bez cebuli, czosnku, miodu.',
    },
    {
      id: 'bez-nabialu',
      name: 'Bez nabiału',
      icon: '🥛',
      description: 'Oliwa zamiast masła, roślinne alternatywy serów.',
    },
    {
      id: 'bez-alergenow',
      name: 'Bez alergenów',
      icon: '⚠️',
      description: 'Bez orzechów, sezamu, soi, jajek.',
    },
  ];
  
  export const recipes: RecipeData[] = [
    {
      slug: 'pizza-detroit-orkiszowo-zytnia',
      title: 'Pizza Detroit na cieście orkiszowo-żytnim z pieczarkami i sosem z włoskich pomidorów',
      category: 'prosty-sklad',
      shortDescription:
        'Pizza Detroit wyróżnia się grubym, puszystym ciastem z chrupiącymi brzegami oraz charakterystycznymi pasami sosu nakładanymi na samym końcu. Ta wersja wykorzystuje mąkę orkiszową i pełnoziarnistą żytnią, dzięki czemu ciasto ma bardziej wyrazisty smak i większą wartość odżywczą. Delikatna mozzarella, maślane pieczarki i słodki sos z włoskich pomidorów tworzą klasyczne, ale wyjątkowo aromatyczne połączenie.',
      prepTime: 'około 30 minut + wyrastanie 45–60 minut (lub 12–24 godziny w lodówce)',
      bakeTime: '18–22 min',
      totalTime: 'około 1 godz. 40 min (bez wyrastania w lodówce)',
      servings: 4,
      difficulty: 'średni',
      calories: 'około 580 kcal / porcja (wartość orientacyjna)',
      equipment: [
        'blacha do pieczenia 20 × 25 cm lub 25 × 30 cm',
        'duża miska',
        'filiżanka lub kubek',
        'tarka o grubych oczkach',
        'patelnia',
        'ściereczka kuchenna',
        'piekarnik',
      ],
      ingredients: [
        {
          section: 'Ciasto',
          items: [
            { name: 'mąka orkiszowa jasna', amount: '200 g', flourId: 'orkisz-650' },
            { name: 'mąka żytnia pełnoziarnista', amount: '100 g', flourId: 'zyto-pelny-przemial' },
            { name: 'ciepła woda (35–40°C)', amount: '250 ml' },
            { name: 'drożdże suszone (lub 10 g świeżych)', amount: '5 g' },
            { name: 'miód lub cukier (1 łyżeczka)', amount: '5 g' },
            { name: 'sól (1 łyżeczka)', amount: '5 g' },
            { name: 'oliwa z oliwek (1 łyżka)', amount: '15 ml' },
            { name: 'drobne płatki owsiane lub jęczmienne (opcjonalnie)', amount: '5 g' },
          ],
        },
        {
          section: 'Dodatki',
          items: [
            { name: 'mozzarella z bloku', amount: 'około 250 g' },
            { name: 'pieczarki', amount: '200 g' },
            { name: 'masło', amount: '10 g' },
            { name: 'włoskie pomidory w puszce', amount: 'około 200 g' },
            { name: 'sól do smaku', amount: '' },
            { name: 'pomidorki koktajlowe', amount: '8–10' },
            { name: 'oliwa do natłuszczenia blachy', amount: '' },
          ],
        },
      ],
      steps: [
        { step: 1, description: 'Rozpuść drożdże z miodem lub cukrem w ciepłej wodzie i odstaw na 5–10 minut, aż pojawi się pianka.' },
        { step: 2, description: 'Połącz w misce mąkę orkiszową, mąkę żytnią, sól oraz płatki, jeśli ich używasz.' },
        { step: 3, description: 'Wlej zaczyn i oliwę do suchych składników.' },
        { step: 4, description: 'Wyrabiaj ciasto przez 8–10 minut, aż będzie gładkie i lekko elastyczne. W razie potrzeby dodaj niewielką ilość mąki lub po 1 łyżce wody. Uwaga: ciasto z dodatkiem mąki żytniej będzie bardziej miękkie niż klasyczne ciasto pszenne.' },
        { step: 5, description: 'Przełóż ciasto do lekko natłuszczonej miski.' },
        { step: 6, description: 'Przykryj miskę ściereczką i pozostaw do wyrastania na 45–60 minut, aż ciasto zwiększy objętość. Dla lepszego smaku możesz schłodzić je w lodówce przez 12–24 godziny.' },
        { step: 7, description: 'Podsmaż pieczarki na maśle do odparowania wody i lekkiego zrumienienia. Odstaw do ostygnięcia.' },
        { step: 8, description: 'Zetrzyj mozzarellę na grubych oczkach tarki.' },
        { step: 9, description: 'Dopraw rozgniecione włoskie pomidory wyłącznie solą i dokładnie wymieszaj.' },
        { step: 10, description: 'Natłuść blachę oliwą i rozciągnij ciasto równomiernie na całej powierzchni.' },
        { step: 11, description: 'Rozłóż startą mozzarellę aż po same brzegi ciasta. To właśnie ser utworzy charakterystyczną chrupiącą obwódkę.' },
        { step: 12, description: 'Rozsyp równomiernie podsmażone pieczarki.' },
        { step: 13, description: 'Piecz przez 18–22 minuty w temperaturze 220°C (góra-dół), aż brzegi będą mocno zarumienione.' },
        { step: 14, description: 'Nałóż gorący sos z pomidorów w charakterystyczne podłużne pasy na upieczonej pizzy.' },
        { step: 15, description: 'Ułóż pomidorki koktajlowe pomiędzy pasami sosu.' },
        { step: 16, description: 'Odstaw pizzę na 3–5 minut, a następnie pokrój i podawaj.' },
      ],
      tips: [
        'Im dłużej ciasto dojrzewa w lodówce, tym będzie bardziej aromatyczne i łatwiej się rumieni.',
        'Mozzarella z bloku sprawdzi się lepiej niż świeża, ponieważ zawiera mniej wody.',
        'Pieczarki zawsze podsmaż wcześniej – dzięki temu pizza pozostanie chrupiąca.',
        'Nie doprawiaj sosu wieloma przyprawami. Dobre włoskie pomidory potrzebują jedynie soli.',
        'Dobrze rozgrzej piekarnik przed włożeniem pizzy, aby spód szybko się zapiekł.',
      ],
      storage: [
        'W lodówce: do 3 dni w szczelnym pojemniku.',
        'Odgrzewaj przez 5–8 minut w piekarniku nagrzanym do 180°C lub na suchej patelni.',
        'Możesz zamrozić gotową pizzę na do 2 miesięcy.',
      ],
      modifications: [
        'Zastąp pieczarki pieczonymi warzywami, papryką lub karmelizowaną cebulą.',
        'Dodaj pikantne salami lub chorizo dla ostrzejszego smaku.',
        'Wzbogać pizzę o parmezan lub dojrzewający cheddar, aby uzyskać jeszcze bardziej chrupiące brzegi.',
        'Przygotuj wersję wegetariańską z dodatkiem grillowanej cukinii lub bakłażana.',
        'Dodaj świeżą bazylię bezpośrednio po upieczeniu, aby zachować jej aromat.',
      ],
    },
  ];
  
  export function getRecipesByCategory(categoryId: string): RecipeData[] {
    return recipes.filter((r) => r.category === categoryId);
  }
  
  export function getRecipeBySlug(slug: string): RecipeData | undefined {
    return recipes.find((r) => r.slug === slug);
  }