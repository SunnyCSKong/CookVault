import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;
  constructor(cartService: CartService, private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    cartService.getCartObservables().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }
  logout() {
    this.userService.logout();
  }
  get isAuth() {
    return this.user.name;
  }
}
