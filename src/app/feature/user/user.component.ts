import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IExam } from 'src/app/shared/models/exam';
import { AuthService } from 'src/app/core/services/auth.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  exams: IExam[];
  passwordChangeForm: FormGroup;
  user: IExam;

  private get getActiveUser() {
    return this.auth.getLoggedInUser();
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;
    
    if (this.exams && this.exams.length) {
      this.user = this.exams[0];
    }

    let user = this.getActiveUser;

    this.passwordChangeForm = this.fb.group(
      {
        id: [user.id, Validators.required],
        username: [user.username, Validators.required],
        role: [user.role, Validators.required],
        status: [user.status, Validators.required],
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
        ...this.passwordChangeForm.value,
        passwordHash: Md5.hashStr(password)
      })
      .subscribe((data) => {
        this.toastr.success("your password is changed. please login again");
        this.auth.logOut();
      });
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
