import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.less']
})
export class OrderSummaryComponent implements OnInit {

  private subscription: Subscription;
  private totalPrice: number = 0;
  private products: Array<any> = [];
  private bagCount: number;
  private costs: any;

  constructor(
    private cartService: CartService
  ) { }

  @Input() cartCost: string;

  ngOnInit() {
    this.subscription = this.cartService.orderForm$.subscribe(orderForm => {
      this.bagCount = 0;
      orderForm.products.forEach(product => this.bagCount += product.selectedOptions.quantity);
    });

    this.subscription = this.cartService.costs$.subscribe(costs => {
      this.costs = costs;

    });
  }

  ngOnDestroy() {
    this
      .subscription
      .unsubscribe();
  }

  calculateTotalPrice(products) {
    let totalPrice = 0;
    products.forEach((product => totalPrice += product.data.price * product.selectedOptions.quantity));
    return totalPrice;
  }

}
