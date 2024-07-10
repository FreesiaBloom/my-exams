import { inject, Injectable } from '@angular/core';
import { IExam } from '../../shared/models/exam';
import { MatDialog } from '@angular/material/dialog';
import { ExamSummeryDialogComponent } from 'src/app/core/components/dialogs/exam-summery-dialog/exam-summery-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  readonly dialog = inject(MatDialog);
  
  public openExamDetailsDialog(exams: IExam[], date: Date) {
    const matchedExam = this.isExamsIncludesDate(exams, date);
    if (matchedExam) {
      this.dialog.open(ExamSummeryDialogComponent, {
        data: matchedExam,
      });
    }
  }

  public isExamsIncludesDate(exams: IExam[], date: Date): IExam {
    if (!exams || !date) return null;
    return exams.find(exam => new Date(exam.details.exam_date).toDateString() === date.toDateString()) || null;
  }
}
