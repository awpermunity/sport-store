import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.less']
})
export class RatingComponent implements OnInit {
  @Input() declaredRating: number;
  @Output() onRating = new EventEmitter<Number>();

  maxItem: any[];
  ratedCount: number;

  constructor() {
  }

  ngOnInit() {
    this.maxItem = [];
    for (let i = 0; i < this.declaredRating; i++) {
      this.maxItem.push(i + 1);
    }
  }

  toggleRating(s: number) {
    this.ratedCount = s;
    this.onRating.emit(this.ratedCount);
  }

}
