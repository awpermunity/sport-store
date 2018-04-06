import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './store/products-list/products-list.component';
import { StoreModule } from './store/store.module';
import { StoreService } from './store.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core-module/core.module';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { SortPipe } from './shared/pipes/sort.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule,
    AngularFontAwesomeModule,
    CoreModule,
    RouterModule,
    routing,
    SharedModule
  ],
  exports: [],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
