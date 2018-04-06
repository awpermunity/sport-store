import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './store/products-list/products-list.component';
import { ProductDetailComponent } from './store/product-detail/product-detail.component';
import { HomeComponent } from './store/home/home.component';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'product/:id', component: ProductDetailComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);