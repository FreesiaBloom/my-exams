import { Injectable } from "@angular/core";
import { Day } from "../../shared/models/day";
import { IExam } from "../../shared/models/exam";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  public calendar: Day[] = [];
  public isToday: Day;

  public get getCurrentMonthName(): string {
    switch (this.isToday.date.getMonth()) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "";
    }
  }

  public generateCalendar(exams: IExam[]): Day[] {
    // for more efficient way this data should come from API to not place processing time on client browser
    // but to safe time I'd rather do it in this service

    // reset calendar on every generate
    this.calendar = [];

    // get exam dates in single array
    const examsDates = exams.map((e: IExam) =>
      new Date(e.details.exam_date).toDateString()
    );

    // current day variable
    let day = new Date();
    

    // counter for calendar days
    let addDay: Date = new Date(day.setDate(0));

    // populate calendar with 35 - 5 weeks
    for (let i = 0; i < 35; i++) {
      const createdDay = new Day(new Date(addDay));

      // set IsExamDay if variable matches date
      if (examsDates.includes(createdDay.date.toDateString()))
        createdDay.isExamDay = true;

      // populate calendar
      this.calendar.push(createdDay);

      // we need to sete add date for a next day, then create new Date object and assign it to out addDay counter
      addDay = new Date(addDay.setDate(addDay.getDate() + 1));
    }

    // set global variable isToday to display month
    this.isToday = this.calendar.find((day) => day.isToday);

    return this.calendar;
  }
}
