import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data.users;

    this.loginForm = this.fb.group({
      email: ['agataj', Validators.required],
      password: ['test123', Validators.required],
    });
  }

  onSubmitForm() {
    if (!this.loginForm.valid) return null;

    let { email, password } = this.loginForm.value;
    let user = this.users.find((u) => u.username == email);

    if (!user) {
      return this.toastr.error('No user found!');
    }

    if (!user.status) {
      return this.toastr.error('Please contact Admin to login!');
    }

    let pass = Md5.hashStr(password);

    if (pass == user.passwordHash) {
      return this.auth.login(user);
    } else {
      this.toastr.error("Password doesn't match");
    }
  }
}
