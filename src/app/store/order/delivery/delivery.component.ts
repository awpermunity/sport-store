import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.less']
})
export class DeliveryComponent implements OnInit {

  private subscription: Subscription;
  private deliveryForm: FormGroup;
  private shipmentTypes: Array<any> = [];
  private costs: any;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.buildDeliveryForm();
    this.getShipmentTypes();
    this.subscription = this.cartService.costs$.subscribe(costs => {
      this.costs = costs
    });
  }

  checkIfDeliveryIsFree() {
    return this.costs.total >= 200;
  }

  updateDeliveryCost(price) {
    this.cartService.updateDeliveryCost(price);
  }

  buildDeliveryForm() {
    this.deliveryForm = this.formBuilder.group({
      method: ['', Validators.required],
      type: ['', Validators.required],
      payment: ['', Validators.required]
    })
  }

  getShipmentTypes(): void {
    this.cartService.getShipmentTypes().subscribe(shipmentTypes => this.shipmentTypes = shipmentTypes);
  }

  addDeliveryFormValue() {
    this.cartService.addForm(this.deliveryForm.value, 'delivery')
    this.router.navigate(['/order/confirmation'])
  }

}
