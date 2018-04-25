import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../../model/product.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  private productsInBag: any[] = [];
  private subscription: Subscription;
  private cartCost = '-'

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.cartService.products$.subscribe(products => {
      this.productsInBag = products;
    });
  }

  ngOnDestroy() {
    this
      .subscription
      .unsubscribe();
  }

  checkIfQuantityIsMaximum(selectedProduct) {
    let offer = selectedProduct.data.offers.find(offer => offer.size === selectedProduct.selectedOptions.size)
    return offer.quantity === selectedProduct.selectedOptions.quantity;
  }

  reduceQuantity(product) {
    this.cartService.reduceQuantity(product);
  }

  increaseQuantity(product) {
    this.cartService.increaseQuantity(product)
  }

  goToProductList(): void {
    this.router.navigate(['/products'])
  }

  checkout() {
    this.cartService.addForm(this.productsInBag, 'products');
    this.router.navigate(['/order/address'])
  }

  continue() {
    this.router.navigate(['/products'])
  }

  objectKeys(object) {
    return object ? Object.keys(object) : object;
  }

  removeProduct(product: any) {
    this.productsInBag = this.productsInBag.filter((productInBag) => productInBag.uniqueName !== product.uniqueName)
    this.cartService.removeProduct(product.uniqueName)
    // this.calculateTotalPrice();
  }

  checkIfSpacerIsNeeded(product: Product) {
    const count = this.productsInBag.length;
    if (count > 0 && this.productsInBag.indexOf(product) !== (count - 1)) {
      return 'item border-bottom';
    }
    return 'item';
  }

}
