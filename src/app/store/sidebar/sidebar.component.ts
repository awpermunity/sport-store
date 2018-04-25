import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NouiFormatter } from "ng2-nouislider";
import { Utils } from '../../model/utils';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Input() products: Array<any>;
  @Output() checkedFilters: EventEmitter<any> = new EventEmitter();

  private sliderConfig: any = {
    unencoded: true,
    connect: true,
    tooltips: [new MyFormatter, new MyFormatter],
    start: [0, 5000],
    step: 1,
    range: {
      min: 0,
      max: 5000
    }
  }

  private displayedFiltersDropdowns: Array<any> = [];
  private selectedDropDownsValues: Array<any> = [];
  private filters: Object;
  private priceFromSlider: Array<any> = [0, 5000];

  triggerUpdate(event) {
    this.priceFromSlider = event;
    this.emitFilters();
  }

  ngOnChanges() {
    if (this.products) {
      this.filters = this.getFiltersFromGivenProducts();
    }
  }

  getFiltersFromGivenProducts() {
    let obj = {};
    let keys = [];
    this.products.forEach(product => {
      keys.push(Object.keys(product.details))
    });
    const merge = Utils.merge(keys);
    const keysWithoutDuplicates = Utils.removeDuplicates(merge)
    keysWithoutDuplicates.forEach(key => {
      obj[key] = [];
    })

    keysWithoutDuplicates.forEach(key => {
      const keyValues = [];
      this.products.forEach(product => {
        if (product.details[key]) {
          keyValues.push(product.details[key])
        }
      });
      obj[key] = Utils.removeDuplicates(keyValues);
    });
    return obj;
  }

  emitFilters() {
    this.checkedFilters['details'] = this.selectedDropDownsValues;
    this.checkedFilters['price'] = this.priceFromSlider;
    this.checkedFilters.emit(this.checkedFilters);
  }

  constructor(

  ) { }

  ngOnInit() {
  }

  objectKeys(object) {
    return Utils.objectKeys(object);
  }

  removeItem(event) {
    this.selectedDropDownsValues = this.selectedDropDownsValues.filter(value => value !== event);
    this.emitFilters()
  }

  displayFilterDropdown(event) {
    const filter = event.target.id;
    this.displayedFiltersDropdowns = this.onSelect(filter, this.displayedFiltersDropdowns);
  }

  selectDropdownValue(event) {
    const value = event.target.id;
    this.selectedDropDownsValues = this.onSelect(value, this.selectedDropDownsValues)
    this.emitFilters()
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
    let output = Math.floor(value) + " $";
    return output;
  }
  from(value: string): number {
    return Number(value.split(" ")[0]);
  }
}
