import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { StoreService } from '../../store.service';
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


  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
    this.declaredRating = 5;
  }

  ngOnInit() {
    this.getProducts({ sortBy: 'id', sortDirection: 'asc' });
  }

  getProducts(criteria: ProductSortCriteria): void {
    this.storeService.getProducts().subscribe(products => this.products = this.sortProducts(products, criteria));
  }

  onSorted($event) {
    this.getProducts($event);
  }

  sortProducts(products, criteria) {
    return products.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        return a[criteria.sortBy] < b[criteria.sortBy] ? 1 : -1;
      }
      return a[criteria.sortBy] > b[criteria.sortBy] ? 1 : -1;
    });
  }

  goToDetails(product: Product): void {
    console.log("asdasd: ", product.id);
    this.router.navigate(['/product', product.id])
  }

}

export class ProductSortCriteria {
  sortBy: string;
  sortDirection: string;
}
