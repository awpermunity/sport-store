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

  private addedProducts: Array<any> = this.getProductsFromLocalStorage();
  private addedProductsSubject = new BehaviorSubject<any>(this.addedProducts);
  public products$ = this.addedProductsSubject.asObservable();

  private orderForm: any = {};
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
    this.orderForm[formName] = formValue
    this.formSubject.next(this.orderForm)
    console.log('FORRMM', this.orderForm);
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
    this.addedProductsSubject.next(this.addedProducts);
    this.saveInLocalStorage(this.addedProducts);
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
    this.addedProducts.forEach(product => subtotal += (product.selectedOptions.quantity * product.data.price));
    return subtotal;
  }

  addingManager(inputProduct) {
    if (this.addedProducts.length > 0 && this.checkIfProductIsAlreadyInBag(inputProduct)) {
      this.addedProducts.forEach(product => {
        if (product.data.id === inputProduct.data.id && product.selectedOptions.size === inputProduct.selectedOptions.size) {
          this.increaseQuantity(inputProduct);
        }
      })
    }
    else {
      this.addedProducts.push(inputProduct);
      this.update();
    }
  }

  reduceQuantity(inputProduct) {
    this.addedProducts.forEach(product => {
      if (product.uniqueName === inputProduct.uniqueName && product.selectedOptions.quantity > 1) {
        product.selectedOptions.quantity--
      }
    })
    this.update();
  }

  increaseQuantity(inputProduct) {
    let offer = inputProduct.data.offers.find(offer => offer.size === inputProduct.selectedOptions.size)
    this.addedProducts.forEach(product => {
      if (product.uniqueName === inputProduct.uniqueName && product.selectedOptions.quantity < offer.quantity) {
        product.selectedOptions.quantity++
      }
    })
    this.update();
  }


  checkIfProductIsAlreadyInBag(inputProduct) {
    return this.addedProducts.some(product => product.data.id === inputProduct.data.id && product.selectedOptions.size === inputProduct.selectedOptions.size)
  }

  saveInLocalStorage(product): void {
    this.storage.set(this.key, product);
  }

  getProductsFromLocalStorage() {
    const storage = this.storage.get(this.key)
    return storage || [];
  }
  removeProduct(uniqueName: string) {
    this.addedProducts = this.addedProducts.filter((product) => product.uniqueName !== uniqueName);
    this.update();
  }

  clearBag() {
    this.addedProducts = [];
    this.addedProductsSubject.next(this.addedProducts);
    this.storage.remove(this.key);
  }

}
