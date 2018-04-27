import { Injectable, Inject, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {

  private key: string = 'store';

  private orderForm = this.getOrderFormData();
  private formSubject = new BehaviorSubject<any>(this.orderForm);
  public orderForm$ = this.formSubject.asObservable();

  public costs = this.calculateCostsIfNeeded();
  public costsSubject = new BehaviorSubject<any>(this.costs);
  public costs$ = this.costsSubject.asObservable();

  private url = 'http://localhost:3000/'
  private shipmentTypesUrl = this.url + 'shipmentTypes';

  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: WebStorageService,
    private httpclient: HttpClient,
    private http: HttpClient
  ) {
    this.update();
  }

  getOrderFormData() {
    let orderForm = {
      products: [],
    };
    const storageData = this.checkDataInLocalStorage();
    return storageData || orderForm
  }

  checkDataInLocalStorage() {
    return this.storage.get(this.key);
  }


  sendOrder(): Observable<any> {
    return this.http.post<any>(this.url + 'orders', this.orderForm);
  }

  updateDeliveryCost(price) {
    if (this.costs.subtotal < 200) {
      this.costs.delivery = price;
      this.updateCosts()
    }
  }

  getShipmentTypes(): Observable<Product[]> {
    return this.http.get<Product[]>(this.shipmentTypesUrl)
  }

  addForm(formValue, formName) {
    this.orderForm[formName] = formValue;
    this.formSubject.next(this.orderForm);
    this.saveDataInLocalStorage(this.orderForm);
  }

  addProduct(product: any) {
    this.addingManager(product);
  }

  addCostsToOrderForm() {
    this.orderForm.costs = this.costs;
  }

  update() {
    this.updateCart();
    this.updateCosts();
  }

  updateCart() {
    this.formSubject.next(this.orderForm);
    this.saveDataInLocalStorage(this.orderForm);
    this.costs
  }

  calculateCostsIfNeeded() {
    let costs: any = {
    };
    costs.subtotal = this.calculateProductsCost();
    costs.total = costs.delivery ? costs.delivery + costs.subtotal : costs.subtotal;
    costs.delivery = 0
    return costs;
  }

  updateCosts() {
    this.costs.subtotal = this.calculateProductsCost();
    this.costs.total = this.costs.delivery ? this.costs.delivery + this.costs.subtotal : this.costs.subtotal;
    if (this.costs.total >= 200) {
      this.costs.delivery = 0
    }
    this.costsSubject.next(this.costs);
  }

  calculateProductsCost() {
    let subtotal = 0;
    if (this.orderForm.products) {
      this.orderForm.products.forEach(product => subtotal += (product.selectedOptions.quantity * product.price));
    }
    return subtotal;
  }

  addingManager(inputProduct) {
    const products = this.orderForm.products;
    if (products.length > 0 && this.checkIfProductIsAlreadyInBag(products, inputProduct)) {
      products.forEach(product => {
        if (product.id === inputProduct.id && product.selectedOptions.size === inputProduct.selectedOptions.size) {
          this.increaseQuantity(product);
        }
      })
    }
    else {
      this.orderForm.products.push(inputProduct);
      this.update();
    }
  }

  reduceQuantity(inputProduct) {
    this.orderForm.products.forEach(product => {
      if (product.uniqueName === inputProduct.uniqueName && product.selectedOptions.quantity > 1) {
        product.selectedOptions.quantity--
      }
    })
    this.update();
  }

  increaseQuantity(product) {
    if (product.selectedOptions.quantity < product.availableQuantity) {
      product.selectedOptions.quantity++
    }
    this.update();
  }


  checkIfProductIsAlreadyInBag(products, inputProduct) {
    return products.some(product => product.id === inputProduct.id && product.selectedOptions.size === inputProduct.selectedOptions.size)
  }

  saveDataInLocalStorage(orderForm): void {
    this.storage.set(this.key, orderForm);
  }

  removeProduct(uniqueName: string) {
    this.orderForm.products = this.orderForm.products.filter((product) => product.uniqueName !== uniqueName);
    this.update();
  }

  clearBag() {
    this.storage.remove(this.key);
    this.orderForm = this.getOrderFormData();
    this.formSubject.next(this.orderForm);
  }

}
