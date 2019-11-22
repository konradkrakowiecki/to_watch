import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByNumber'
})
export class SortByNumberPipe implements PipeTransform {

  transform(value: Array<any>, ...args: string[]): Array<any> {
    const number: string = args[0];
    return value.sort((a, b) => (a[number] > b[number])? 1: -1);
  }

}
