import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {


  transform(records: Array<any>, args?: any): any {
    return records.sort(function (a, b) {
      let aProp: any = a[args.property] ? a[args.property] : '';
      let bProp: any = b[args.property] ? b[args.property] : '';

      if (+aProp && +bProp) {
        // compare numbers
        return (aProp > bProp) ? args.direction : -1 * args.direction;
      } else {
        // compare strings
        return aProp.toString().toUpperCase().localeCompare(bProp.toString().toUpperCase(), ['et-EE']) * -1 * args.direction;
      }
    });
  }
}
