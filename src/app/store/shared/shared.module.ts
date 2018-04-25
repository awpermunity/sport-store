import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    OrderSummaryComponent
  ],
  declarations: [OrderSummaryComponent]
})
export class SharedModule { }
