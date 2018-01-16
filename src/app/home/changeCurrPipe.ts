import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'change'
})
export class ChangeСurrPipe implements PipeTransform {
    
  transform(arr: any, d: string): any {
    let editedArr = arr.filter(function(item) {   
      return ((d >= item.Cur_DateStart.substring(0, 10)) && (d < item.Cur_DateEnd.substring(0, 10)));
    });
    return editedArr;
  }
}

