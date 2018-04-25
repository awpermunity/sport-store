import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { CartService } from '../services/cart.service';
import { Order } from '../../model/order.model'
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  totalPrice: any;
  subscription: Subscription;
  private productsInBag: any[]
  private orderForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.subscription = this.cartService.products$.subscribe(products => {
      this.productsInBag = products;
    });
  }

  goToTheNextStep(event) {
    console.log('eeeeeeeeeeeeeeeevent', event);
  }


  goBack(): void {
    this.location.back();
  }

  prepareOrder(form) {
    const id = new Date().getTime();
    const selectedProducts = this.productsInBag;
    const totalPrice = this.totalPrice;
    const order: Order = { id, selectedProducts, form, totalPrice }
    return order
  }
}

