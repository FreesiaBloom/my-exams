import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { mockUserData, mockUsers } from "src/app/core/mock/user-data.mock";
import { AuthService } from "src/app/core/services/auth.service";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceMock = jasmine.createSpyObj("AuthService", {
    login: undefined,
  });

  let toastServiceMock = jasmine.createSpyObj("ToastrService", {
    success: undefined,
    error: undefined,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterModule.forRoot([{ path: "login", component: LoginComponent }]),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: ToastrService, useValue: toastServiceMock},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                users: mockUsers,
              },
            },
          },
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set default values", () => {
    fixture.detectChanges();

    expect(component.loginForm.getRawValue()["email"]).toEqual("jackb");
    expect(component.loginForm.getRawValue()["password"]).toEqual("password");
  });

  it("should login successfully", () => {
    component.loginForm.get("email").setValue(mockUserData.username);
    component.loginForm.get("password").setValue(mockUserData.password);
    const { email, password } = component.loginForm.value;
    const user = component.users.find((u) => u.username == email);

    expect(component.loginForm.valid).toBeTrue();
    
    component.onSubmitForm();
    expect(authServiceMock.login).toHaveBeenCalledWith(user);
  });


  it("should handle validation for empty required data", () => {
    component.loginForm.get("email").setValue(' ');
    component.loginForm.get("password").setValue(' ');

    // expect(component.loginForm.get("email")?.errors?.["required"]).toBeTrue;
    // expect(component.loginForm.get("password")?.errors?.["required"]).toBeTrue;

    component.onSubmitForm();

    expect(component.loginForm.valid).toBeFalse();
    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(toastServiceMock.error).not.toHaveBeenCalled();
  });

  it("should handle not correct data", () => {
    component.loginForm.get('email').setValue(mockUserData.username);
    component.loginForm.get('password').setValue('123');

    component.onSubmitForm();
    
    // expect(component.loginForm.get("email")?.errors?.["required"]).toEqual(undefined);
    // expect(component.loginForm.get("password")?.errors?.["required"]).toEqual(undefined);
    
    expect(component.loginForm.valid).toBeTrue();
    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(toastServiceMock.error).toHaveBeenCalledWith("Password doesn't match");
  });
});
