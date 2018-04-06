import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SortService } from './sort.service';

@Component({
  selector: '[sorting]',
  templateUrl: './sorting.component.html'
})
export class SortingComponent implements OnInit {

  sortDirection: string = '';
  private columnSortedSubscription: Subscription;

  constructor(private sortService: SortService) { }

  @Input('sorting')
  columnName: string;

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortBy: this.columnName, sortDirection: this.sortDirection });

  }

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      if (this.columnName != event.sortBy) {
        this.sortDirection = '';
      }
    });
  }
}