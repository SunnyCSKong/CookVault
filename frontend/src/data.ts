import { Recipes } from './app/shared/models/Recipes';

export const sample_foods: Recipes[] = [
  {
    id: '1',
    name: 'Chicken Noodle Soup',
    imageUrl: './assets/cns.jpg',
    link: 'https://cooking.nytimes.com/recipes/1024338-chicken-noodle-soup',
    favourite: false,
    cookTime: '40 min',
    ingredients: [
      '2 tablespoons unsalted butter',
      '1 medium yellow onion',
      'salt and black pepper',
      '8 cups chicken stock',
      '2 bay leaves or thyme sprigs (or 1 teaspoon dried thyme)',
      '¼ cup finely chopped parsley or dill, stems reserved, plus more for garnish',
      '2 medium carrots, cut into ½-inch pieces',
      '2celery stalks, cut into ½-inch pieces',
      '6 ounces dried noodles, such as egg noodles or short pasta',
      '3 cups shredded, cooked chicken (from 1 rotisserie chicken)',
    ],
  },
  {
    id: '2',
    name: 'Monte Cristo',
    imageUrl: './assets/montecristo.jpg',
    link: 'https://cooking.nytimes.com/recipes/1024832-monte-cristo',
    favourite: true,
    cookTime: '20 min',
  },
];
