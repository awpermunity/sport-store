import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { StoreService } from '../../store.service';
import { Product } from '../../model/product.model';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  declaredRating: number;
  product: Product;

  constructor(
    private storeService: StoreService,
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
    const imgPath = "../../../assets/img/products/";
    let productId = this.product.id;
    const jpg = ".jpg";
    for (let i = 0; i < this.product.numberOfImages; i++) {
      let nextImg = i / 10;
      let imgProductId = nextImg === 0 ? productId : productId + nextImg;
      let fullPath = imgPath + imgProductId + jpg;
      let galleryImage =
        {
          small: fullPath,
          medium: fullPath,
          big: fullPath
        }
      this.galleryImages.push(galleryImage);
    }
  }

}
