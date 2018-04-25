import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../model/product.model';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {
  private subscription: Subscription;
  private productsInBag: any[] = [];
  private order: any;


  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.subscription = this.cartService.products$.subscribe(products => {
      this.productsInBag = products;
    })
    this.subscription = this.cartService.orderForm$.subscribe(orderForm => {
      this.order = orderForm;
    })

  }

  ngOnDestroy() {
    this
      .subscription
      .unsubscribe();
  }

  sendOrder() {
    this.prepareOrder();
    this.updateProducts();
    this.cartService.sendOrder().subscribe();
    this.cartService.clearBag();
    this.router.navigate(['/home'])
  }

  checkIfSpacerIsNeeded(product: Product) {
    const count = this.productsInBag.length;
    if (count > 0 && this.productsInBag.indexOf(product) !== (count - 1)) {
      return 'item border-bottom';
    }
    return 'item';
  }

  objectKeys(object) {
    return object ? Object.keys(object) : object;
  }

  prepareOrder() {
    this.order.id = new Date().getTime();
  }

  updateProducts() {
    this.order.products.forEach(
      product => {
        let offer = product.data.offers.find(offer => offer.size === product.selectedOptions.size)
        offer.quantity -= product.selectedOptions.quantity
      })
    this.order.products.forEach(product =>
      this.storeService.updateProduct(product.data).subscribe());
  }

}
