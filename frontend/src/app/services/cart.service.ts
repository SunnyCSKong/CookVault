import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipes } from '../shared/models/Recipes';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartLocal();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}
  addToCart(recipe: Recipes): void {
    let cartItem = this.cart.items.find((item) => item.recipe.id === recipe.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(recipe));
    this.setCartLocal();
  }

  removeFromCart(recipeID: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.recipe.id != recipeID
    );
    this.setCartLocal();
  }

  changeQuantity(recipeID: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.recipe.id === recipeID);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    this.setCartLocal();
  }
  clearCart() {
    this.cart = new Cart();
  }
  getCartObservables(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartLocal(): void {
    const cartJSON = JSON.stringify(this.cart);
    this.cart.totalCount = this.cart.items.reduce((prevSum) => prevSum + 1, 0);
    localStorage.setItem('Cart', cartJSON);
    this.cartSubject.next(this.cart);
  }
  private getCartLocal(): Cart {
    const cartJSON = localStorage.getItem('Cart');
    return cartJSON ? JSON.parse(cartJSON) : new Cart();
  }
}
