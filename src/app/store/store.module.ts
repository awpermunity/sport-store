import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SortingComponent } from './products-list/sorting/sorting.component';
import { SortService } from './products-list/sorting/sort.service';
import { SortableTableDirective } from './products-list/sorting/sorting-table.directive';
import { NgxGalleryModule } from 'ngx-gallery';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddressComponent } from './order/address/address.component';
import { DeliveryComponent } from './order/delivery/delivery.component';
import { ConfirmationComponent } from './order/confirmation/confirmation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    AngularFontAwesomeModule,
    NouisliderModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailComponent,
    SearchBarComponent,
    RatingComponent,
    HomeComponent,
    SidebarComponent,
    SortingComponent,
    SortableTableDirective,
    CartComponent,
    OrderComponent,
    AddressComponent,
    DeliveryComponent,
    ConfirmationComponent,
  ],
  providers: [SortService, CartService],
  exports: [ProductsListComponent]
})
export class StoreModule { }
