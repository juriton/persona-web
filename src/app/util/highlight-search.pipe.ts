import { Pipe, PipeTransform } from '@angular/core';
import {$} from "protractor";

@Pipe({
  name: 'highlight'
})

export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args !== undefined) {
      var re = new RegExp(args, 'gi');
      return value.replace(re, '<mark>'+ args + '</mark>');
    }
    return value;
  }
}
