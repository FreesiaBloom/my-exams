import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5/dist/md5';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { IExam } from 'src/app/shared/models/exam';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExamService } from 'src/app/core/services/exam.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public exams: IExam[];
  public passwordChangeForm: FormGroup;
  public user: IExam;
  public todayDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService,
    private examService: ExamService
  ) {}

  public ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;

    if (this.exams && this.exams.length) {
      this.user = this.exams[0];
    }

    this.passwordChangeForm = this.fb.group(
      {
        password: [null, Validators.required],
        retype_password: [null, Validators.required],
      },
      {
        validator: this.confirmPassword,
      }
    );
  }

  public onSubmitForm() {
    if (!this.passwordChangeForm.valid) {
      return alert("form is not valid");
    }

    let { password } = this.passwordChangeForm.value;

    this.auth
      .updateUser({
        ...this.auth.getLoggedInUser(),
        passwordHash: Md5.hashStr(password),
      })
      .subscribe(() => {
        this.toastr.success("your password is changed. please login again");
        this.auth.logOut();
      });
  }

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.examService.isExamsIncludesDate(this.exams, cellDate) ? 'exam-date' : 'default-date';
    }
    return '';
  };

  public onSelect(event) {
    this.examService.openExamDetailsDialog(this.exams, event);
  }

  private confirmPassword(c: AbstractControl): {
    invalid: boolean;
    mismatch: boolean;
  } {
    if (c.get("password") && c.get("retype_password")) {
      return c.get("password").value !== c.get("retype_password").value
        ? { invalid: true, mismatch: true }
        : null;
    } else {
      return { invalid: true, mismatch: true };
    }
  }
}