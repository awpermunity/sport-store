import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './store/products-list/products-list.component';
import { StoreModule } from './store/store.module';
import { StoreService } from './store/services/store.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core-module/core.module';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { CartService } from './store/services/cart.service';
import { StorageServiceModule } from 'angular-webstorage-service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    HttpClientModule,
    StoreModule,
    AngularFontAwesomeModule,
    CoreModule,
    RouterModule,
    routing,
  ],
  exports: [],
  providers: [StoreService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
