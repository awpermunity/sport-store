import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {

  transform(val: any, args?: any): any {
    // if (!array) {
    //   return array;
    // }
    console.log('array', val)
    return val
  }

}
