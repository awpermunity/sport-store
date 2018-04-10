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
  galleryImages: NgxGalleryImage[];
  declaredRating: number;


  @Input() product: Product;
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.declaredRating = 5;
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '400px',
        height: '535px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 500
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: '../../../assets/img/1.jpg',
        medium: '../../../assets/img/1.jpg',
        big: '../../../assets/img/1.jpg'
      },
      {
        small: '../../../assets/img/2.jpg',
        medium: '../../../assets/img/2.jpg',
        big: '../../../assets/img/2.jpg'
      },
      {
        small: '../../../assets/img/3.jpg',
        medium: '../../../assets/img/3.jpg',
        big: '../../../assets/img/3.jpg'
      },
      {
        small: '../../../assets/img/4.jpg',
        medium: '../../../assets/img/4.jpg',
        big: '../../../assets/img/4.jpg'
      }
    ];
    this.getProduct();
  }

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.storeService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  goBack(): void {
    this.location.back();
  }

}
