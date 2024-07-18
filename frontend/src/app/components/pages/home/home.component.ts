import { Component } from '@angular/core';
import { Recipes } from '../../../shared/models/Recipes';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import { map, Observable, of } from 'rxjs';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { TitleComponent } from '../../partials/title/title.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SearchComponent,
    NotFoundComponent,
    TitleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipes: Recipes[] = [];
  user!: User;
  constructor(
    private foodService: FoodService,
    private userService: UserService,
    activatedRoute: ActivatedRoute
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    let recipesObservable: Observable<Recipes[]>;
    recipesObservable = of(this.user?.recipes || []);
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        //change this to be both in user and search term
        recipesObservable = this.foodService.getRecipesBySearchTerm(
          params['searchTerm']
        );
      } else {
        //change this to get only things in user
        recipesObservable = foodService.getAll();
        recipesObservable.subscribe((serverRecipes) => {
          this.recipes = serverRecipes;
        });
      }
    });
    const userRecipeIds = new Set(
      this.user.recipes?.map((recipe) => recipe.id)
    );
    recipesObservable = recipesObservable.pipe(
      map((recipes) => recipes.filter((recipe) => userRecipeIds.has(recipe.id)))
    );
    recipesObservable.subscribe((filteredRecipes) => {
      this.recipes = filteredRecipes;
    });
  }
  get isAuth() {
    return this.user.name;
  }
}
