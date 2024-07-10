import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IExam } from 'src/app/shared/models/exam';

@Component({
  selector: 'app-exam-summery-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './exam-summery-dialog.component.html',
  styleUrl: './exam-summery-dialog.component.scss'
})
export class ExamSummeryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExamSummeryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IExam
  ) {}
}
