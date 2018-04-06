import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { OrderingFormComponent } from './ordering-form/ordering-form.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SortingComponent } from './products-list/sorting/sorting.component';
import { SortService } from './products-list/sorting/sort.service';
import { SortableTableDirective } from './products-list/sorting/sorting-table.directive';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    NouisliderModule
  ],
  declarations: [
    ProductsListComponent,
    ProductDetailComponent,
    SearchBarComponent,
    OrderingFormComponent,
    RatingComponent,
    HomeComponent,
    SidebarComponent,
    SortingComponent,
    SortableTableDirective
  ],
  providers: [SortService],
  exports: [ProductsListComponent]
})
export class StoreModule { }
