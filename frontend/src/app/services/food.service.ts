import { Injectable } from '@angular/core';
import { Recipes } from '../shared/models/Recipes';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import {
  RECIPES_SEARCH_URL,
  RECIPES_URL,
  RECIPES_ID_URL,
  RECIPES_ADD_NEW,
} from '../shared/constants/urls';
import { User } from '../shared/models/User';
import { INewRecipe } from '../shared/interfaces/INewRecipe';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}
  getAll(): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(RECIPES_URL);
  }
  getRecipesBySearchTerm(searchTerm: String) {
    return this.http.get<Recipes[]>(RECIPES_SEARCH_URL + searchTerm);
  }
  getRecipeByID(recipeID: string): Observable<Recipes> {
    return this.http.get<Recipes>(RECIPES_ID_URL + recipeID);
  }
  getRecipesByUserID(user: User) {
    return user.recipes;
  }
  addNewRecipe(recipeData: INewRecipe, user: User): Observable<User> {
    return this.http.post<Recipes>(RECIPES_ADD_NEW, recipeData).pipe(
      tap({
        next: (recipe) => {
          this.toastrService.success(`${recipe.name}`, 'Successfully added:');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Unable to add recipe');
        },
      }),
      switchMap((recipe: Recipes) =>
        this.userService.addRecipeToUser(recipe, user)
      )
    );
  }
}
