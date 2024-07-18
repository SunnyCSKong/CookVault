import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { TitleComponent } from '../../partials/title/title.component';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { INewRecipe } from '../../../shared/interfaces/INewRecipe';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [
    TitleComponent,
    TextInputComponent,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css',
})
export class NewRecipeComponent {
  isSubmitted = false;
  user!: User;
  newRecipe!: FormGroup;
  constructor(
    private userService: UserService,
    private foodService: FoodService,
    private router: Router
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.newRecipe = new FormGroup({
      name: new FormControl('', Validators.required),
      ingredients: new FormArray([], Validators.required),
      instructions: new FormArray([], Validators.required),
      imageUrl: new FormControl(''),
      link: new FormControl(''),
      cookTime: new FormControl('', Validators.required),
      origin: new FormControl('', Validators.required),
    });
  }

  get fc() {
    return this.newRecipe.controls;
  }

  get ingredients(): FormArray {
    return this.newRecipe.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.newRecipe.get('instructions') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  addInstruction(): void {
    this.instructions.push(new FormControl('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.newRecipe.invalid) return;
    const fv = this.newRecipe.value;
    const recipe: INewRecipe = {
      name: fv.name,
      imageUrl: fv.imageUrl,
      link: fv.link,
      cookTime: fv.cookTime,
      origin: fv.origin,
      instructions: fv.instructions,
      ingredients: fv.ingredients,
    };
    this.foodService.addNewRecipe(recipe, this.user).subscribe();
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 500);
  }
}
