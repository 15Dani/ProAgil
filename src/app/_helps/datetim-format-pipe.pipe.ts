import { Constants } from './../util/Constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'DatetimeFormatPipe'
})
export class DatetimFormatPipePipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }

}
