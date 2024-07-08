import { Pipe, PipeTransform } from '@angular/core';
import { Day } from '../../shared/models/day';

@Pipe({
  name: 'weekSpread',
  standalone: true
})
export class WeekSpreadPipe implements PipeTransform {

  transform(calendarDaysArray: any, weekSize: number = 7): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day, index) => {
        weekDays.push(day);

        if (++index % weekSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];
        }
    });
    return calendarDays;
  }

}
