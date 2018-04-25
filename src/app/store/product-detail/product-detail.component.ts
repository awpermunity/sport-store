import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { StoreService } from '../services/store.service';
import { Product } from '../../model/product.model';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  declaredRating: number;
  productAdded: boolean;
  product: Product;
  productSizesUrl: any;
  dropdownStatus: boolean = false;
  selectedSize: string;

  constructor(
    private storeService: StoreService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.declaredRating = 5;
  }

  ngOnInit() {
    this.getProduct();
  }

  ngOnChanges() {
  }
  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.storeService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.setGalleryConfig();
      });
  }
  goBack(): void {
    this.location.back();
  }

  addProduct(product: Product) {
    if (!this.selectedSize) {
      this.dropdownStatus = true;
      return;
    }
    this.productAdded = true;
    const selectedProduct = {
      data: product,
      selectedOptions: {
        size: this.selectedSize,
        quantity: 1
      },
      uniqueName: this.product.id + this.selectedSize
    }
    this.cartService.addProduct(selectedProduct);
    setTimeout(() => this.productAdded = false, 3000);
  }

  setGalleryConfig() {
    this.galleryOptions = [
      {
        width: '400px',
        height: '535px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 1024,
        width: '330px',
        height: '400px',
        imagePercent: 100,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 500
      {
        breakpoint: 500,
        width: '330px',
        height: '400px',
        preview: false,
        thumbnailsPercent: 20,
      }
    ];
    this.setGalleryImages();
  }

  setGalleryImages() {
    const jpg = ".jpg";
    const imgPath = "../../../assets/img/products/";
    this.product.imgsPaths.forEach(path => {
      let fullPath = imgPath + path;
      let galleryImage =
        {
          small: fullPath,
          medium: fullPath,
          big: fullPath
        }
      this.galleryImages.push(galleryImage)
    });
  }

  switchDropdownStatus() {
    this.dropdownStatus = !this.dropdownStatus
  }

  selectSize(event) {
    this.selectedSize = event.size;
    this.switchDropdownStatus();
  }

}
