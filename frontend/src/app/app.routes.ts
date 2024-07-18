import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RecipePageComponent } from './components/pages/recipe-page/recipe-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NewRecipeComponent } from './components/pages/new-recipe/new-recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'recipe/:id', component: RecipePageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
];
