import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from '../../store.service';
import { Product } from '../../model/product.model';
import { NouiFormatter } from "ng2-nouislider";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  private sliderConfig: any = {
    connect: true,
    tooltips: [new MyFormatter, new MyFormatter],
    start: [0, 100],
    step: 1,
    range: {
      min: 0,
      max: 100
    }
  }

  private displayedFiltersDropdowns: Array<any> = [];
  private selectedDropDownsValues: Array<any> = [];
  products: Product[];
  filters = {
    products: ['football', 'fitness', 'rugby', 'running', 'acessories'],
    size: ['xs', 's', 'm', 'l', 'xl']
  }
  triggerUpdate(event) {
    console.log('event', event)
  }

  ngAfterViewInit() {
  }

  constructor(
    private storeService: StoreService,

  ) { }

  ngOnInit() {
    // this.getProducts();
  }

  objectKeys(object) {
    return Object.keys(object)
  }

  // getProducts(): void {
  //   this.storeService.getProducts().subscribe(products => this.products = products);
  // }

  displayFilterDropdown(event) {
    const filter = event.target.id;
    this.displayedFiltersDropdowns = this.onSelect(filter, this.displayedFiltersDropdowns);
    console.log('displayFilterDropDown', this.displayedFiltersDropdowns)
  }

  selectDropdownValue(event) {
    const value = event.target.id;
    this.selectedDropDownsValues = this.onSelect(value, this.selectedDropDownsValues)
  }

  onSelect(element, array) {
    if (this.checkIfElementIsAlreadyInArray(element, array)) {
      return this.removeElementFromArray(element, array);
    }
    return this.addToSelectedFilters(element, array);
  }

  checkIfElementIsAlreadyInArray(inputElement, array) {
    return array.some(element => element === inputElement);
  }

  removeElementFromArray(inputElement, array) {
    return array.filter(element => element !== inputElement);
  }

  addToSelectedFilters(inputElement, array) {
    array.push(inputElement);
    return array;
  }

}

export class MyFormatter implements NouiFormatter {
  to(value: number): string {
    let output = value + " $";
    return output;
  }
  from(value: string): number {
    return Number(value.split(" ")[0]);
  }
}
