import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Day } from "src/app/shared/models/day";
import { IExam } from "src/app/shared/models/exam";
import { CalendarService } from "src/app/core/services/calendar.service";
import { ExamService } from "src/app/core/services/exam.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
})
export class CalendarComponent implements OnInit {
  @Input() exams: IExam[];
  public calendar: Day[] = [];
  public getCurrentMonthName: string;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService,
    private examService: ExamService
  ) {}

  public ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;
    this.calendar = this.calendarService.generateCalendar(this.exams);
    this.getCurrentMonthName = this.calendarService.getCurrentMonthName;
  }

  public showExamDetails(day: Day): void {
    this.examService.openExamDialog(this.exams, day);
  }
}
