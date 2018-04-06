import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingFormComponent } from './ordering-form.component';

describe('OrderingFormComponent', () => {
  let component: OrderingFormComponent;
  let fixture: ComponentFixture<OrderingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
