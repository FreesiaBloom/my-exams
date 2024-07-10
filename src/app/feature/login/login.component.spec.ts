import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/core/services/auth.service";
import { mockInvalidUser, mockUser, mockUsers, mockWrongCredentialsUser } from "src/app/shared/mock/user-data.mock";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: AuthService;
  let toastrServiceMock: ToastrService;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj<AuthService>(
      'AuthService',
      { 
        login: undefined
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
      declarations: [LoginComponent],
      imports: [
        RouterModule.forRoot([{ path: "login", component: LoginComponent }]),
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: ToastrService, useValue: toastrServiceMock},
        {provide: AuthService, useValue: authServiceMock},
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

    expect(component.loginForm.getRawValue()["email"]).toEqual("agataj");
    expect(component.loginForm.getRawValue()["password"]).toEqual("test123");
  });

  describe("onSubmitForm", () => {
    it("should login successfully with valid user", () => {
      component.loginForm.get("email").setValue(mockUser.username);
      component.loginForm.get("password").setValue(mockUser.password);
  
      const { email } = component.loginForm.value;
      const user = component.users.find((u) => u.username == email);
  
      expect(component.loginForm.valid).toBeTrue();
      
      component.onSubmitForm();
  
      expect(authServiceMock.login).toHaveBeenCalledWith(user);
    });

    it("should not login with wrong user", () => {
      component.loginForm.get("email").setValue(mockWrongCredentialsUser.username);
      component.loginForm.get("password").setValue(mockWrongCredentialsUser.password);
  
      expect(component.loginForm.valid).toBeTrue();
      
      component.onSubmitForm();
  
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(toastrServiceMock.error).toHaveBeenCalledWith("No user found!");
    });

    it("should not login with inactive credentials", () => {
      component.loginForm.get("email").setValue(mockInvalidUser.username);
      component.loginForm.get("password").setValue(mockInvalidUser.password);
  
      expect(component.loginForm.valid).toBeTrue();
      
      component.onSubmitForm();
  
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(toastrServiceMock.error).toHaveBeenCalledWith("Please contact Admin to login!");
    });
  
    it("should handle validation for empty credentials", () => {
      component.loginForm.get("email").setValue('');
      component.loginForm.get("password").setValue('');
      expect(component.loginForm.valid).toBeFalse();
  
      component.onSubmitForm();
  
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(toastrServiceMock.error).not.toHaveBeenCalled();
    });
  
    it("should handle validation for invalid credentials", () => {
      component.loginForm.get('email').setValue(mockUser.username);
      component.loginForm.get('password').setValue('123');
      expect(component.loginForm.valid).toBeTrue();
  
      component.onSubmitForm();
      
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(toastrServiceMock.error).toHaveBeenCalledWith("Password doesn't match");
    });

  })
});
