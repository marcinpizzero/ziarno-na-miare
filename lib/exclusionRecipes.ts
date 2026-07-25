// lib/exclusionRecipes.ts

export interface RecipeIngredient {
  name: string;
  amount: string;
  flourId?: string;
}

export interface RecipeData {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  whyThisCategory: string[];
  prepTime: string;
  fermentationTime: string;
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
  image?: string;
}

export const exclusionCategories = [
  {
    id: 'prosty-sklad',
    name: 'Prosty skład',
    icon: '🌾',
    description: 'Tylko naturalne składniki. Żadnych polepszaczy, konserwantów ani dodatku cukru.',
  },
  {
    id: 'bez-nabialu',
    name: 'Bez nabiału',
    icon: '🧀',
    description: 'Dla osób eliminujących laktozę i nabiał. Roślinne zamienniki, oliwa zamiast masła.',
  },
  {
    id: 'bez-glutenu',
    name: 'Bez glutenu',
    icon: '🌾',
    description: 'Przepisy bezglutenowe dla osób z celiakią i nadwrażliwością.',
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
    id: 'bez-alergenow',
    name: 'Bez alergenów',
    icon: '⚠️',
    description: 'Bez orzechów, sezamu, soi, jajek.',
  },
];

export const recipes: RecipeData[] = [
  // ============================================
  // PROSTY SKŁAD + BEZ NABIAŁU
  // ============================================

  // Pizza Zielona Italia – Prosty skład
  {
    slug: 'pizza-zielona-italia-prosty',
    title: 'Pizza Zielona Italia',
    category: 'prosty-sklad',
    shortDescription:
      'Ta pizza powstaje z trzech prastarych mąk: samopszy, orkiszu i żyta pełnoziarnistego. Dzięki 40-godzinnej fermentacji ciasto jest lekkostrawne, bogate w aromat i łatwiejsze do trawienia. Zielone dodatki, pesto z jarmużu oraz roślinny ser tworzą pizzę inspirowaną kuchnią śródziemnomorską, zachowując jednocześnie prosty i naturalny skład.',
    whyThisCategory: [
      'zawiera wyłącznie naturalne składniki',
      'nie zawiera konserwantów ani polepszaczy',
      'nie zawiera dodatku cukru',
      'wykorzystuje oliwę extra virgin jako jedyne źródło tłuszczu',
      'wszystkie składniki są łatwo dostępne i mają prosty, rozpoznawalny skład',
    ],
    prepTime: 'około 1 godzina (aktywny czas)',
    fermentationTime: '40 godzin',
    bakeTime: '6–8 minut',
    totalTime: 'około 41 godzin',
    servings: 2,
    difficulty: 'średni',
    calories: 'około 680 kcal / pizza (wartość orientacyjna)',
    equipment: [
      'duża miska',
      'waga kuchenna',
      'szpatułka',
      'pojemnik do fermentacji',
      'dwa pojemniki na kule ciasta',
      'łopatka do pizzy',
      'kamień lub stal do pizzy (zalecane)',
      'piekarnik nagrzany do 250–300°C',
    ],
    ingredients: [
      {
        section: 'Ciasto',
        items: [
          { name: 'mąka z samopszy typ 2000', amount: '120 g', flourId: 'samopsza-pelny' },
          { name: 'mąka orkiszowa pełnoziarnista typ 2000', amount: '150 g', flourId: 'orkisz-2000' },
          { name: 'mąka żytnia pełnoziarnista typ 2000', amount: '80 g', flourId: 'zyto-pelny-przemial' },
          { name: 'zimna, filtrowana woda', amount: '228 ml' },
          { name: 'świeże drożdże', amount: '1 g' },
          { name: 'oliwa extra virgin', amount: '10 g' },
          { name: 'sól morska', amount: '9 g' },
        ],
      },
      {
        section: 'Dodatki (na 1 pizzę)',
        items: [
          { name: 'passata pomidorowa BIO (bez cukru i czosnku)', amount: '80 g' },
          { name: 'wegański ser na bazie skrobi ryżowej i oleju kokosowego', amount: '60 g' },
          { name: 'cukinia pokrojona w bardzo cienkie plasterki', amount: '50 g' },
          { name: 'czarne oliwki', amount: '20 g' },
          { name: 'pesto z jarmużu i pestek dyni', amount: '15 g' },
          { name: 'świeża bazylia', amount: 'kilka listków' },
        ],
      },
    ],
    steps: [
      { step: 1, description: 'Połącz wszystkie mąki z 210 ml zimnej wody i pozostaw na 45 minut, aby przeprowadzić autolizę.' },
      { step: 2, description: 'Rozpuść drożdże w pozostałej wodzie.' },
      { step: 3, description: 'Dodaj drożdże do ciasta i dokładnie wymieszaj.' },
      { step: 4, description: 'Dodaj sól oraz oliwę extra virgin.' },
      { step: 5, description: 'Wyrabiaj ciasto przez 10–15 minut, aż stanie się gładkie i elastyczne.' },
      { step: 6, description: 'Pozostaw ciasto na 2 godziny w temperaturze pokojowej.' },
      { step: 7, description: 'Wykonaj dwa składania – po około 45 minutach i 90 minutach.' },
      { step: 8, description: 'Przełóż ciasto do szczelnego pojemnika i umieść w lodówce na 34 godziny w temperaturze około 4°C.' },
      { step: 9, description: 'Podziel ciasto na dwie kule o masie około 280 g.' },
      { step: 10, description: 'Pozostaw kule do ogrzania przez około 3 godziny przed pieczeniem.' },
      { step: 11, description: 'Pokrój cukinię w bardzo cienkie plasterki.' },
      { step: 12, description: 'Odsącz oliwki i przekrój je na połówki.' },
      { step: 13, description: 'Przygotuj passatę, pesto oraz wegański ser.' },
      { step: 14, description: 'Rozgrzej piekarnik wraz z kamieniem lub stalą do 250–300°C.' },
      { step: 15, description: 'Delikatnie rozciągnij ciasto, pozostawiając wyraźny rant. Uwaga: Nie używaj wałka – usuniesz pęcherzyki powietrza z ciasta.' },
      { step: 16, description: 'Posmaruj pizzę passatą.' },
      { step: 17, description: 'Rozłóż równomiernie wegański ser.' },
      { step: 18, description: 'Dodaj plasterki cukinii oraz oliwki.' },
      { step: 19, description: 'Piecz przez 6–8 minut, aż brzegi będą mocno wyrośnięte i dobrze zarumienione.' },
      { step: 20, description: 'Dodaj pesto z jarmużu bezpośrednio po upieczeniu.' },
      { step: 21, description: 'Udekoruj świeżą bazylią i od razu podawaj.' },
    ],
    tips: [
      'Im stabilniejsza temperatura lodówki, tym bardziej przewidywalna będzie fermentacja.',
      'Cukinię pokrój bardzo cienko, aby zdążyła zmięknąć podczas krótkiego pieczenia.',
      'Pesto dodawaj dopiero po upieczeniu – zachowa świeży kolor i intensywny aromat.',
      'Pizza najlepiej smakuje pieczona na kamieniu lub stalowej płycie.',
      'Do ciasta używaj świeżych mąk pełnoziarnistych z pewnego źródła.',
    ],
    storage: [
      'Surowe kule ciasta przechowuj w lodówce do 48 godzin.',
      'Gotową pizzę najlepiej spożyć bezpośrednio po upieczeniu.',
      'W razie potrzeby odgrzej ją przez 2–3 minuty w piekarniku nagrzanym do 220°C.',
      'Nie zaleca się zamrażania gotowej pizzy.',
    ],
    modifications: [
      'Zastąp cukinię grillowanymi szparagami.',
      'Dodaj karczochy marynowane dla bardziej śródziemnomorskiego charakteru.',
      'Uzupełnij pizzę świeżym szpinakiem dodanym po upieczeniu.',
      'Posyp pestkami dyni lub słonecznika dla dodatkowej chrupkości.',
      'Dodaj kilka kropli wysokiej jakości oliwy cytrynowej przed podaniem.',
    ],
  },

  // Pizza Zielona Italia – Bez nabiału
  {
    slug: 'pizza-zielona-italia-bez-nabialu',
    title: 'Pizza Zielona Italia',
    category: 'bez-nabialu',
    shortDescription:
      'Ta pizza powstaje z trzech prastarych mąk: samopszy, orkiszu i żyta pełnoziarnistego. Dzięki 40-godzinnej fermentacji ciasto jest lekkostrawne, bogate w aromat i łatwiejsze do trawienia. Zielone dodatki, pesto z jarmużu oraz roślinny ser tworzą pizzę inspirowaną kuchnią śródziemnomorską.',
    whyThisCategory: [
      'nie zawiera mleka, masła ani sera pochodzenia zwierzęcego',
      'wykorzystuje roślinny ser jako zamiennik tradycyjnego nabiału',
      'jedynym źródłem tłuszczu jest oliwa extra virgin',
      'zachowuje pełny smak dzięki warzywom i ziołom, bez dodatku produktów mlecznych',
      'sprawdzi się u osób z nietolerancją laktozy lub unikających nabiału',
    ],
    prepTime: 'około 1 godzina (aktywny czas)',
    fermentationTime: '40 godzin',
    bakeTime: '6–8 minut',
    totalTime: 'około 41 godzin',
    servings: 2,
    difficulty: 'średni',
    calories: 'około 680 kcal / pizza (wartość orientacyjna)',
    equipment: [
      'duża miska',
      'waga kuchenna',
      'szpatułka',
      'pojemnik do fermentacji',
      'dwa pojemniki na kule ciasta',
      'łopatka do pizzy',
      'kamień lub stal do pizzy (zalecane)',
      'piekarnik nagrzany do 250–300°C',
    ],
    ingredients: [
      {
        section: 'Ciasto',
        items: [
          { name: 'mąka z samopszy typ 2000', amount: '120 g', flourId: 'samopsza-pelny' },
          { name: 'mąka orkiszowa pełnoziarnista typ 2000', amount: '150 g', flourId: 'orkisz-2000' },
          { name: 'mąka żytnia pełnoziarnista typ 2000', amount: '80 g', flourId: 'zyto-pelny-przemial' },
          { name: 'zimna, filtrowana woda', amount: '228 ml' },
          { name: 'świeże drożdże', amount: '1 g' },
          { name: 'oliwa extra virgin', amount: '10 g' },
          { name: 'sól morska', amount: '9 g' },
        ],
      },
      {
        section: 'Dodatki (na 1 pizzę)',
        items: [
          { name: 'passata pomidorowa BIO (bez cukru i czosnku)', amount: '80 g' },
          { name: 'wegański ser na bazie skrobi ryżowej i oleju kokosowego', amount: '60 g' },
          { name: 'cukinia pokrojona w bardzo cienkie plasterki', amount: '50 g' },
          { name: 'czarne oliwki', amount: '20 g' },
          { name: 'pesto z jarmużu i pestek dyni', amount: '15 g' },
          { name: 'świeża bazylia', amount: 'kilka listków' },
        ],
      },
    ],
    steps: [
      { step: 1, description: 'Połącz wszystkie mąki z 210 ml zimnej wody i pozostaw na 45 minut, aby przeprowadzić autolizę.' },
      { step: 2, description: 'Rozpuść drożdże w pozostałej wodzie.' },
      { step: 3, description: 'Dodaj drożdże do ciasta i dokładnie wymieszaj.' },
      { step: 4, description: 'Dodaj sól oraz oliwę extra virgin.' },
      { step: 5, description: 'Wyrabiaj ciasto przez 10–15 minut, aż stanie się gładkie i elastyczne.' },
      { step: 6, description: 'Pozostaw ciasto na 2 godziny w temperaturze pokojowej.' },
      { step: 7, description: 'Wykonaj dwa składania – po około 45 minutach i 90 minutach.' },
      { step: 8, description: 'Przełóż ciasto do szczelnego pojemnika i umieść w lodówce na 34 godziny w temperaturze około 4°C.' },
      { step: 9, description: 'Podziel ciasto na dwie kule o masie około 280 g.' },
      { step: 10, description: 'Pozostaw kule do ogrzania przez około 3 godziny przed pieczeniem.' },
      { step: 11, description: 'Pokrój cukinię w bardzo cienkie plasterki.' },
      { step: 12, description: 'Odsącz oliwki i przekrój je na połówki.' },
      { step: 13, description: 'Przygotuj passatę, pesto oraz wegański ser.' },
      { step: 14, description: 'Rozgrzej piekarnik wraz z kamieniem lub stalą do 250–300°C.' },
      { step: 15, description: 'Delikatnie rozciągnij ciasto, pozostawiając wyraźny rant. Uwaga: Nie używaj wałka – usuniesz pęcherzyki powietrza z ciasta.' },
      { step: 16, description: 'Posmaruj pizzę passatą.' },
      { step: 17, description: 'Rozłóż równomiernie wegański ser.' },
      { step: 18, description: 'Dodaj plasterki cukinii oraz oliwki.' },
      { step: 19, description: 'Piecz przez 6–8 minut, aż brzegi będą mocno wyrośnięte i dobrze zarumienione.' },
      { step: 20, description: 'Dodaj pesto z jarmużu bezpośrednio po upieczeniu.' },
      { step: 21, description: 'Udekoruj świeżą bazylią i od razu podawaj.' },
    ],
    tips: [
      'Im stabilniejsza temperatura lodówki, tym bardziej przewidywalna będzie fermentacja.',
      'Cukinię pokrój bardzo cienko, aby zdążyła zmięknąć podczas krótkiego pieczenia.',
      'Pesto dodawaj dopiero po upieczeniu – zachowa świeży kolor i intensywny aromat.',
      'Pizza najlepiej smakuje pieczona na kamieniu lub stalowej płycie.',
      'Do ciasta używaj świeżych mąk pełnoziarnistych z pewnego źródła.',
    ],
    storage: [
      'Surowe kule ciasta przechowuj w lodówce do 48 godzin.',
      'Gotową pizzę najlepiej spożyć bezpośrednio po upieczeniu.',
      'W razie potrzeby odgrzej ją przez 2–3 minuty w piekarniku nagrzanym do 220°C.',
      'Nie zaleca się zamrażania gotowej pizzy.',
    ],
    modifications: [
      'Zastąp cukinię grillowanymi szparagami.',
      'Dodaj karczochy marynowane dla bardziej śródziemnomorskiego charakteru.',
      'Uzupełnij pizzę świeżym szpinakiem dodanym po upieczeniu.',
      'Posyp pestkami dyni lub słonecznika dla dodatkowej chrupkości.',
      'Dodaj kilka kropli wysokiej jakości oliwy cytrynowej przed podaniem.',
    ],
  },

  // Pinsa Bianca – Prosty skład
  {
    slug: 'pinsa-bianca-prosty',
    title: 'Pinsa Bianca z Boczniakami i Pieczoną Papryką',
    category: 'prosty-sklad',
    shortDescription:
      'Pinsa Bianca z boczniakami i pieczoną papryką to lekka, aromatyczna propozycja dla osób ceniących naturalne składniki. Bez sera i bez sosu pomidorowego, dzięki czemu pełnię smaku tworzą pieczone warzywa, oliwa extra virgin oraz świeży rozmaryn. Długie dojrzewanie ciasta sprawia, że pinsa jest chrupiąca z zewnątrz i miękka w środku.',
    whyThisCategory: [
      'zawiera wyłącznie naturalne składniki',
      'nie zawiera konserwantów ani polepszaczy',
      'nie zawiera dodatku cukru',
      'wykorzystuje oliwę extra virgin jako jedyne źródło tłuszczu',
      'pełnię smaku budują warzywa, zioła i naturalne przyprawy',
    ],
    prepTime: 'około 25 minut (aktywny czas)',
    fermentationTime: 'około 18 godzin',
    bakeTime: '8–10 minut',
    totalTime: 'około 19 godzin',
    servings: 2,
    difficulty: 'średni',
    calories: 'około 620 kcal / pinsa (wartość orientacyjna)',
    equipment: [
      'duża miska',
      'waga kuchenna',
      'szpatułka',
      'pojemnik do fermentacji',
      'kamień lub stal do pizzy (opcjonalnie)',
      'piekarnik nagrzany do 250°C',
    ],
    ingredients: [
      {
        section: 'Ciasto',
        items: [
          { name: 'mąka orkiszowa pełnoziarnista typ 2000', amount: '220 g', flourId: 'orkisz-2000' },
          { name: 'mąka żytnia pełnoziarnista typ 2000', amount: '130 g', flourId: 'zyto-pelny-przemial' },
          { name: 'lodowata woda', amount: '245 ml' },
          { name: 'świeże drożdże', amount: '2 g' },
          { name: 'sól morska', amount: '8 g' },
          { name: 'oliwa extra virgin', amount: '12 g' },
        ],
      },
      {
        section: 'Dodatki',
        items: [
          { name: 'boczniaki', amount: '120 g' },
          { name: 'pieczona czerwona papryka', amount: '1 szt.' },
          { name: 'świeży rozmaryn', amount: '1 gałązka' },
          { name: 'pestki słonecznika', amount: '1 łyżka' },
          { name: 'oliwa extra virgin', amount: '1–2 łyżki' },
          { name: 'świeżo mielony pieprz', amount: 'do smaku' },
        ],
      },
    ],
    steps: [
      { step: 1, description: 'Połącz mąkę z wodą i pozostaw na 20 minut, aby przeprowadzić autolizę.' },
      { step: 2, description: 'Dodaj drożdże i dokładnie wymieszaj.' },
      { step: 3, description: 'Dodaj sól, a następnie oliwę extra virgin.' },
      { step: 4, description: 'Wyrabiaj ciasto przez około 8 minut, aż stanie się elastyczne.' },
      { step: 5, description: 'Pozostaw ciasto na 2 godziny w temperaturze pokojowej.' },
      { step: 6, description: 'Wykonaj trzy serie składania co około 30 minut.' },
      { step: 7, description: 'Przełóż ciasto do lodówki na około 14 godzin.' },
      { step: 8, description: 'Podziel ciasto na dwie równe porcje.' },
      { step: 9, description: 'Pozostaw kule do końcowego garowania przez około 2 godziny.' },
      { step: 10, description: 'Pokrój boczniaki na mniejsze kawałki.' },
      { step: 11, description: 'Pokrój pieczoną paprykę w paski.' },
      { step: 12, description: 'Upraż pestki słonecznika na suchej patelni przez 2–3 minuty.' },
      { step: 13, description: 'Rozgrzej piekarnik do 250°C.' },
      { step: 14, description: 'Delikatnie rozciągnij ciasto, nadając mu charakterystyczny kształt pinsy. Uwaga: Nie używaj wałka – zachowasz więcej pęcherzyków powietrza.' },
      { step: 15, description: 'Skrop ciasto oliwą extra virgin.' },
      { step: 16, description: 'Piecz przez 5 minut bez dodatków.' },
      { step: 17, description: 'Wyjmij pinsę z piekarnika. Ułóż boczniaki oraz pieczoną paprykę.' },
      { step: 18, description: 'Piecz przez kolejne 3–5 minut, aż brzegi będą złociste i chrupiące.' },
      { step: 19, description: 'Posyp świeżym rozmarynem oraz uprażonymi pestkami słonecznika.' },
      { step: 20, description: 'Skrop niewielką ilością oliwy extra virgin i podawaj od razu.' },
    ],
    tips: [
      'Boczniaki możesz wcześniej lekko podsmażyć, aby uzyskać bardziej intensywny aromat.',
      'Nie nakładaj zbyt wielu dodatków – pinsa pozostanie lekka i chrupiąca.',
      'Rozmaryn najlepiej dodawać pod koniec pieczenia lub tuż po wyjęciu z piekarnika.',
      'Najlepszy efekt uzyskasz, piekąc pinsę na kamieniu lub stalowej płycie.',
      'Kilka kropel oliwy extra virgin dodanych po upieczeniu podkreśli smak wszystkich składników.',
    ],
    storage: [
      'Pinsę najlepiej spożyć bezpośrednio po upieczeniu.',
      'Surowe ciasto można przechowywać w lodówce do 24 godzin.',
      'Gotową pinsę odgrzej przez 3–4 minuty w piekarniku nagrzanym do 220°C.',
      'Nie zaleca się zamrażania gotowej pinsy.',
    ],
    modifications: [
      'Dodaj grillowaną cukinię.',
      'Zamień pieczoną paprykę na pieczone pomidory.',
      'Uzupełnij pinsę świeżym tymiankiem.',
      'Zastąp pestki słonecznika pestkami dyni.',
      'Dodaj płatki chili, jeśli lubisz ostrzejszy smak.',
    ],
  },

  // Pinsa Bianca – Bez nabiału
  {
    slug: 'pinsa-bianca-bez-nabialu',
    title: 'Pinsa Bianca z Boczniakami i Pieczoną Papryką',
    category: 'bez-nabialu',
    shortDescription:
      'Pinsa Bianca z boczniakami i pieczoną papryką to lekka, aromatyczna propozycja dla osób ceniących naturalne składniki. Bez sera i bez sosu pomidorowego, dzięki czemu pełnię smaku tworzą pieczone warzywa, oliwa extra virgin oraz świeży rozmaryn.',
    whyThisCategory: [
      'nie zawiera mleka, masła ani sera',
      'kremowość i aromat budują pieczone warzywa oraz oliwa extra virgin',
      'wykorzystuje wyłącznie składniki pochodzenia roślinnego',
      'pełnię smaku zapewniają świeże zioła i naturalne przyprawy',
      'jest odpowiednia dla osób eliminujących nabiał z codziennej diety',
    ],
    prepTime: 'około 25 minut (aktywny czas)',
    fermentationTime: 'około 18 godzin',
    bakeTime: '8–10 minut',
    totalTime: 'około 19 godzin',
    servings: 2,
    difficulty: 'średni',
    calories: 'około 620 kcal / pinsa (wartość orientacyjna)',
    equipment: [
      'duża miska',
      'waga kuchenna',
      'szpatułka',
      'pojemnik do fermentacji',
      'kamień lub stal do pizzy (opcjonalnie)',
      'piekarnik nagrzany do 250°C',
    ],
    ingredients: [
      {
        section: 'Ciasto',
        items: [
          { name: 'mąka orkiszowa pełnoziarnista typ 2000', amount: '220 g', flourId: 'orkisz-2000' },
          { name: 'mąka żytnia pełnoziarnista typ 2000', amount: '130 g', flourId: 'zyto-pelny-przemial' },
          { name: 'lodowata woda', amount: '245 ml' },
          { name: 'świeże drożdże', amount: '2 g' },
          { name: 'sól morska', amount: '8 g' },
          { name: 'oliwa extra virgin', amount: '12 g' },
        ],
      },
      {
        section: 'Dodatki',
        items: [
          { name: 'boczniaki', amount: '120 g' },
          { name: 'pieczona czerwona papryka', amount: '1 szt.' },
          { name: 'świeży rozmaryn', amount: '1 gałązka' },
          { name: 'pestki słonecznika', amount: '1 łyżka' },
          { name: 'oliwa extra virgin', amount: '1–2 łyżki' },
          { name: 'świeżo mielony pieprz', amount: 'do smaku' },
        ],
      },
    ],
    steps: [
      { step: 1, description: 'Połącz mąkę z wodą i pozostaw na 20 minut, aby przeprowadzić autolizę.' },
      { step: 2, description: 'Dodaj drożdże i dokładnie wymieszaj.' },
      { step: 3, description: 'Dodaj sól, a następnie oliwę extra virgin.' },
      { step: 4, description: 'Wyrabiaj ciasto przez około 8 minut, aż stanie się elastyczne.' },
      { step: 5, description: 'Pozostaw ciasto na 2 godziny w temperaturze pokojowej.' },
      { step: 6, description: 'Wykonaj trzy serie składania co około 30 minut.' },
      { step: 7, description: 'Przełóż ciasto do lodówki na około 14 godzin.' },
      { step: 8, description: 'Podziel ciasto na dwie równe porcje.' },
      { step: 9, description: 'Pozostaw kule do końcowego garowania przez około 2 godziny.' },
      { step: 10, description: 'Pokrój boczniaki na mniejsze kawałki.' },
      { step: 11, description: 'Pokrój pieczoną paprykę w paski.' },
      { step: 12, description: 'Upraż pestki słonecznika na suchej patelni przez 2–3 minuty.' },
      { step: 13, description: 'Rozgrzej piekarnik do 250°C.' },
      { step: 14, description: 'Delikatnie rozciągnij ciasto, nadając mu charakterystyczny kształt pinsy.' },
      { step: 15, description: 'Skrop ciasto oliwą extra virgin.' },
      { step: 16, description: 'Piecz przez 5 minut bez dodatków.' },
      { step: 17, description: 'Ułóż boczniaki oraz pieczoną paprykę.' },
      { step: 18, description: 'Piecz przez kolejne 3–5 minut.' },
      { step: 19, description: 'Posyp świeżym rozmarynem oraz uprażonymi pestkami słonecznika.' },
      { step: 20, description: 'Skrop oliwą extra virgin i podawaj od razu.' },
    ],
    tips: [
      'Boczniaki możesz wcześniej lekko podsmażyć, aby uzyskać bardziej intensywny aromat.',
      'Nie nakładaj zbyt wielu dodatków – pinsa pozostanie lekka i chrupiąca.',
      'Rozmaryn najlepiej dodawać pod koniec pieczenia lub tuż po wyjęciu z piekarnika.',
      'Najlepszy efekt uzyskasz, piekąc pinsę na kamieniu lub stalowej płycie.',
      'Kilka kropel oliwy extra virgin dodanych po upieczeniu podkreśli smak wszystkich składników.',
    ],
    storage: [
      'Pinsę najlepiej spożyć bezpośrednio po upieczeniu.',
      'Surowe ciasto można przechowywać w lodówce do 24 godzin.',
      'Gotową pinsę odgrzej przez 3–4 minuty w piekarniku nagrzanym do 220°C.',
      'Nie zaleca się zamrażania gotowej pinsy.',
    ],
    modifications: [
      'Dodaj grillowaną cukinię.',
      'Zamień pieczoną paprykę na pieczone pomidory.',
      'Uzupełnij pinsę świeżym tymiankiem.',
      'Zastąp pestki słonecznika pestkami dyni.',
      'Dodaj płatki chili, jeśli lubisz ostrzejszy smak.',
    ],
  },
];

export function getRecipesByCategory(categoryId: string): RecipeData[] {
  return recipes.filter((r) => r.category === categoryId);
}

export function getRecipeBySlug(slug: string): RecipeData | undefined {
  return recipes.find((r) => r.slug === slug);
}