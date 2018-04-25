import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { StoreService } from '../services/store.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {
  sortDirection: string;
  declaredRating: number;
  products: any[];
  sortedProducts: Product[];
  checkedFilters: any;
  sortingCriteria: ProductSortCriteria = { sortBy: 'id', sortDirection: 'asc' };


  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
    this.declaredRating = 5;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.storeService.getProducts().subscribe(products => this.products = this.manageProducts(products));
  }

  onSorted($event) {
    this.sortingCriteria = $event;
    this.getProducts();
  }

  manageProducts(products) {
    if (this.checkedFilters && this.checkedFilters.details) {
      products = this.filterProducts(products)
    }
    products = this.sortProducts(products)
    return products;
  }

  makeFiltring(checkedFilters) {
    this.checkedFilters = checkedFilters;
    this.getProducts()
  }

  filterProducts(products) {
    const productsList = Object.values(products);
    return productsList.filter(product => this.filterProduct(product));
  }

  filterProduct(product) {
    const productDetails = Object.values(product.details)
    const mergedProductDetails = [];
    productDetails.forEach(detail => mergedProductDetails.push(detail));
    return this.compareProductDetailsWithFilters(mergedProductDetails, product)
  }

  compareProductDetailsWithFilters(productDetails, product) {
    return this.checkedFilters.details.every(filter => productDetails.indexOf(filter) > -1) && this.comparePrice(product.price)
  }

  comparePrice(price) {
    return price >= this.checkedFilters.price[0] && price <= this.checkedFilters.price[1]
  }


  sortProducts(products) {
    const criteria = this.sortingCriteria;
    return products.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        return a[criteria.sortBy] < b[criteria.sortBy] ? 1 : -1;
      }
      return a[criteria.sortBy] > b[criteria.sortBy] ? 1 : -1;
    });
  }

  goToDetails(product: Product): void {
    this.router.navigate(['/product', product.id])
  }

}

export class ProductSortCriteria {
  sortBy: string;
  sortDirection: string;
}
