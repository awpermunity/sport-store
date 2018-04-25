import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../store/services/cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  private bagCount: number;
  private subscription: Subscription;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.subscription = this.cartService.products$.subscribe(products => {
      this.bagCount = 0;
      products.forEach(product => this.bagCount += product.selectedOptions.quantity)
    });
  }

  ngOnDestroy() {
    this
      .subscription
      .unsubscribe();
  }
}
