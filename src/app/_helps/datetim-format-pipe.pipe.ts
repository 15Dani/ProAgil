import { Pipe, PipeTransform } from '@angular/core';
import { Datepipe } from '@angular/common';

@Pipe({
  name: 'datetimFormatPipe'
})
export class DatetimFormatPipePipe extends Datepipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return super.transform(value, '');
  }

}
