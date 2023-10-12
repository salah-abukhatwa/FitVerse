import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {


  transform(value: any): Date | null {
    if (value && value.seconds) {
      return new Date(value.seconds * 1000); // Convert seconds to milliseconds
    }
    return null;
  }

}
