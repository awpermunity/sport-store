import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SortService {

    columnSortedSource = new Subject<ColumnSortedEvent>();
    columnSorted$ = this.columnSortedSource.asObservable();

    constructor() { }

    columnSorted(event: ColumnSortedEvent) {
        this.columnSortedSource.next(event);
    }

}

export interface ColumnSortedEvent {
    sortBy: string;
    sortDirection: string;
}