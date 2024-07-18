import { Recipes } from './Recipes';

export class CartItem {
  constructor(public recipe: Recipes) {}
  quantity: number = 1;
}
