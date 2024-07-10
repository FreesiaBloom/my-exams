import { inject, Injectable } from '@angular/core';
import { IExam } from '../../shared/models/exam';
import { Day } from '../../shared/models/day';
import { MatDialog } from '@angular/material/dialog';
import { ExamSummeryDialogComponent } from 'src/app/feature/exam-summery-dialog/exam-summery-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  readonly dialog = inject(MatDialog);
  
  public openExamDialog(exams: IExam[], day: Day) {
    const matchedExam = this.isExamsIncludesDate(exams, day.date);
    this.dialog.open(ExamSummeryDialogComponent, {
      data: matchedExam,
    });
  }
  
  public openExamDetailsDialog(exams: IExam[], date: Date) {
    const matchedExam = this.isExamsIncludesDate(exams, date);
    if (matchedExam) {
      this.dialog.open(ExamSummeryDialogComponent, {
        data: matchedExam,
      });
    }
  }

  public isExamsIncludesDate(exams: IExam[], date: Date) {
    return exams.find(exam =>  new Date(exam.details.exam_date).toDateString() === date.toDateString());
  }
}
