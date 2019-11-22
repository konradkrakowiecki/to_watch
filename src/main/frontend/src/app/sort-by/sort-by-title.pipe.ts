import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTitle'
})
export class SortByTitlePipe implements PipeTransform {

  transform(value: Array<any>, ...args: any[]): Array<any> {
    return value.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase())? 1: -1);
  }

}
