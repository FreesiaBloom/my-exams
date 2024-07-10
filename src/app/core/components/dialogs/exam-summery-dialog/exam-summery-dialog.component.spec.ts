import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExamSummeryDialogComponent } from "./exam-summery-dialog.component";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { mockExam } from "src/app/shared/mock/exams.mock";

describe("ExamSummeryDialogComponent", () => {
  let component: ExamSummeryDialogComponent;
  let fixture: ComponentFixture<ExamSummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSummeryDialogComponent, MatDialogModule],
      providers: [
        DatePipe,
        { provide: MatDialog, useValue: MatDialog },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockExam,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamSummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
