import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './store/products-list/products-list.component';
import { ProductDetailComponent } from './store/product-detail/product-detail.component';
import { HomeComponent } from './store/home/home.component';
import { CartComponent } from './store/cart/cart.component';
import { OrderComponent } from './store/order/order.component';
import { AddressComponent } from './store/order/address/address.component';
import { DeliveryComponent } from './store/order/delivery/delivery.component';
import { ConfirmationComponent } from './store/order/confirmation/confirmation.component';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    {
        path: 'order',
        component: OrderComponent,
        children: [
            { path: 'address', component: AddressComponent },
            { path: 'delivery', component: DeliveryComponent },
            { path: 'confirmation', component: ConfirmationComponent }
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);