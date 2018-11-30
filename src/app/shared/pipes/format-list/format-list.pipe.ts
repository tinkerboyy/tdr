import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatList'
})
export class FormatListPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return Array.isArray(value) ? value.join(`\n`) : value;
  }
}
