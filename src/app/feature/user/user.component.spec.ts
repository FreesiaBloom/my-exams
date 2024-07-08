import { ActivatedRoute, RouterModule } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ToastrModule, ToastrService } from "ngx-toastr";

import { ListItemComponent } from "../components/list-item/list-item.component";
import { UserComponent } from "./user.component";
import { DatePipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { provideNativeDateAdapter } from "@angular/material/core";
import { of } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { mockUpdatePasswordUserData } from "src/app/core/mock/user-data.mock";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const authServiceMock = jasmine.createSpyObj("AuthService", {
    getLoggedInUser: {
      id: 1,
      username: "jackb",
      role: "student",
      status: 1,
      password: "password",
      passwordHash: "098f6bcd4621d373cade4e832627b4f6",
    },
    updateUser: of({}),
    logOut: () => {},
  });

  const toastServiceMock = jasmine.createSpyObj("ToastrService", {
    success: undefined,
    error: undefined,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent, ListItemComponent],
      imports: [
        RouterModule.forRoot([
          {
            path: "user",
            component: UserComponent,
          },
        ]),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
      ],
      providers: [
        provideNativeDateAdapter(),
        DatePipe,
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                exams: [
                  {
                    details: {
                      student: {
                        firstName: "John",
                        lastName: "Smith",
                        email: "john.smith@gmail.com",
                      },
                      school: {
                        schoolName: "schoolName",
                      },
                      exam_date: "10.07.2022",
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, "alert");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should submit the form successfully", async () => {
    component.passwordChangeForm.get("password").setValue(mockUpdatePasswordUserData.password);
    component.passwordChangeForm.get("retype_password").setValue(mockUpdatePasswordUserData.password);

    component.onSubmitForm();

    expect(component.passwordChangeForm.valid).toBeTrue();
    expect(authServiceMock.updateUser).toHaveBeenCalledWith(mockUpdatePasswordUserData);
  });

  it("should handle validation for empty required data", () => {
    component.passwordChangeForm.get("password").setValue(' ');
    component.passwordChangeForm.get("retype_password").setValue(' ');

    component.onSubmitForm();

    expect(component.passwordChangeForm.valid).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('form is not valid');
  });

  it("should handle validation for wrong required data", () => {
    component.passwordChangeForm.get("password").setValue(mockUpdatePasswordUserData.password);
    component.passwordChangeForm.get("retype_password").setValue('123');

    component.onSubmitForm();

    expect(component.passwordChangeForm.valid).toBeFalse();
    expect(authServiceMock.updateUser).not.toHaveBeenCalled();
  });
});
