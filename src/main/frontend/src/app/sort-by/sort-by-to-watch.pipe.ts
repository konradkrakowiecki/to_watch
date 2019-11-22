import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByToWatch'
})
export class SortByToWatchPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any[]): Array<any> {
    return value.sort(a => (a.to_watch)? 1: -1);
  }

}
