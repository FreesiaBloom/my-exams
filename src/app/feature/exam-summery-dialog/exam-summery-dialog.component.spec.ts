import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSummeryDialogComponent } from './exam-summery-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mockExam } from '../../shared/mock/exams.mock';
import { DatePipe } from '@angular/common';

// describe('ExamSummeryDialogComponent', () => {
//   let component: ExamSummeryDialogComponent;
//   let fixture: ComponentFixture<ExamSummeryDialogComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ExamSummeryDialogComponent, MatDialogModule],
//       providers: [
//         DatePipe,
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             mockExam
//           }
//         }
//       ]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ExamSummeryDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
