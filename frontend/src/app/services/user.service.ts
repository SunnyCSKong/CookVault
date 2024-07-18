import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import {
  USER_ADD_RECIPE_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Recipes } from '../shared/models/Recipes';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>; //read only version of user subj
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `${user.name}`,
            'Successfully logged in as:'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login unsuccessful');
        },
      })
    );
  }

  register(UserRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, UserRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.name}`,
            'Successful Registration'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registration Failed');
        },
      })
    );
  }
  addRecipeToUser(recipe: Recipes, user: User): Observable<User> {
    const data = {
      recipe: recipe,
      user: user,
    };
    if (user.recipes?.some((r) => r.id === recipe.id)) {
      this.toastrService.error(
        'You already have this recipe in your home page',
        'Unable to Add Recipe'
      );
      return of(user);
    }
    return this.http.post<User>(USER_ADD_RECIPE_URL, data).pipe(
      tap({
        next: (updatedUser) => {
          this.setUserToLocalStorage(updatedUser);
          this.userSubject.next(updatedUser);
          this.toastrService.success(
            `Recipe was added to your homepage ${updatedUser.name}`,
            'Successfully Added'
          );
        },
        error: (errorResponse) => {
          console.error('Error adding recipe:', errorResponse);
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
