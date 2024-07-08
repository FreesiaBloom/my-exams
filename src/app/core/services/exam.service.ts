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
    const matchedExam = exams.find((exam: IExam) => new Date(exam.details.exam_date).toDateString() === day.date.toDateString());
    this.dialog.open(ExamSummeryDialogComponent, {
      data: matchedExam,
    });
  }
}
