import { Component } from '@angular/core';
import { Recipes } from '../../../shared/models/Recipes';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, NotFoundComponent],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
export class RecipePageComponent {
  recipe!: Recipes;
  user!: User;
  userHasRecipe: boolean = false;
  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.checkIfUserHasRecipe();
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        foodService.getRecipeByID(params['id']).subscribe((serverRecipe) => {
          this.recipe = serverRecipe;
        });
      }
    });
  }
  checkIfUserHasRecipe() {
    return this.user.recipes?.includes(this.recipe);
  }

  addToCart() {
    this.cartService.addToCart(this.recipe);
    this.router.navigateByUrl('/cart-page');
  }

  addToUser() {
    this.userService.addRecipeToUser(this.recipe, this.user).subscribe();
    this.checkIfUserHasRecipe();
  }
  isAuth() {
    return this.user.id === undefined ? false : true;
  }
}
