import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Order } from '../../../model/order.model'
import { Subscription } from 'rxjs/Subscription';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {
  totalPrice: any;
  subscription: Subscription;
  private productsInBag: any[]
  private addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService

  ) { }

  ngOnInit() {
    this.buildOrderForm();
    this.cartService.updateCosts();
  }

  buildOrderForm() {
    this.addressForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      company: [''],
      postcode: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(6)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      country: 'Poland',
      phone: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(9)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      payment: '',
      spam: false,
      term: false
    });
  }

  calculateTotalPrice(products) {
    let totalPrice = 0;
    products.forEach((product => totalPrice += product.data.price * product.selectedOptions.quantity));
    return totalPrice;
  }

  addAddressFormValue() {
    this.cartService.addForm(this.addressForm.value, 'address');
    this.router.navigate(['/order/delivery'])
  }

  prepareOrder(form) {
    const id = new Date().getTime();
    const selectedProducts = this.productsInBag;
    const totalPrice = this.totalPrice;
    const order: Order = { id, selectedProducts, form, totalPrice }
    return order
  }

}

