import { ActivatedRoute, RouterModule } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ToastrModule, ToastrService } from "ngx-toastr";

import { UserComponent } from "./user.component";
import { DatePipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { provideNativeDateAdapter } from "@angular/material/core";
import { of } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ListItemComponent } from "../list-item/list-item.component";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authServiceMock: AuthService;
  let toastrServiceMock: ToastrService;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj<AuthService>(
      'AuthService',
      { 
        getLoggedInUser: {
          id: 1,
          username: "agataj",
          role: "student",
          status: 1,
          password: "test123",
          passwordHash: "098f6bcd4621d373cade4e832627b4f6",
        },
        updateUser: of({}),
        logOut: undefined,
      }
    );
    
    toastrServiceMock = jasmine.createSpyObj<ToastrService>(
      'ToastrService',
      { 
        success: undefined,
        error: undefined
      }
    );

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
        { provide: ToastrService, useValue: toastrServiceMock },
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

  it('should open alert after submit when form is empty', () => {
    expect(component.passwordChangeForm.valid).toBeFalse();
    component.onSubmitForm();
    expect(window.alert).toHaveBeenCalledWith('form is not valid');
  });

  describe("change password form", () => {
    it('should open alert after submit when form is invalid', () => {
      component.passwordChangeForm.get('password').setValue('password')
      component.passwordChangeForm.get('retype_password').setValue('pass')
      expect(component.passwordChangeForm.valid).toBeFalse();

      component.onSubmitForm();
      expect(window.alert).toHaveBeenCalledWith('form is not valid');
    });

    it('should successfully submit when form is valid', () => {
      component.passwordChangeForm.get('password').setValue('password')
      component.passwordChangeForm.get('retype_password').setValue('password')
      expect(component.passwordChangeForm.valid).toBeTrue();

      component.onSubmitForm();
      expect(window.alert).not.toHaveBeenCalled();

      expect(authServiceMock.updateUser).toHaveBeenCalled();
      expect(toastrServiceMock.success).toHaveBeenCalled();
      expect(authServiceMock.logOut).toHaveBeenCalled();
    });
  })
});
