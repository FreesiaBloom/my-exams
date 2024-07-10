import { TestBed } from "@angular/core/testing";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { Injector } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { mockExam, mockExams } from "../../shared/mock/exams.mock";
import { mockUpdatedUser, mockUser, mockUsers } from "../../shared/mock/user-data.mock";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let injector: Injector;
  let authServiceMock: AuthService;
  let httpController: HttpTestingController;
  let routerMock: Router;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>(
      'Router',
      { 
        navigateByUrl: undefined
      }
    );
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{provide: Router, useValue: routerMock}]
    });
    authServiceMock = injector.get(AuthService);
    httpController = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(authServiceMock).toBeTruthy();
  });

  describe("populate", () => {
    it('should emit isAuthenticatedSubject with false when user is null', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(authServiceMock.isAuthenticatedSubject, 'next');
  
      authServiceMock.populate();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(authServiceMock.isAuthenticatedSubject.next).toHaveBeenCalledWith(false);
    });
  
    it('populate should emit isAuthenticatedSubject with when user is find', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
      spyOn(authServiceMock.isAuthenticatedSubject, 'next');
  
      authServiceMock.populate();
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(authServiceMock.isAuthenticatedSubject.next).toHaveBeenCalledWith(true);
    });
  });

  describe("getUsers", () => {
    it("should make get http request and return user list", () => {
      authServiceMock.getUsers().subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res).toEqual(mockUsers);
      });

      const req = httpController.expectOne({
        method: "GET",
        url: `${environment.api_url}/login`,
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });
  });

  describe("login", () => {
    it('should authenticate user', () => {
      spyOn(localStorage, 'setItem');
      spyOn(authServiceMock.isAuthenticatedSubject, 'next');
  
      const user = mockUser;
      authServiceMock.login(user);
  
      let url = user.role == "admin" ? "/dashboard" : "/user";
  
      expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(user))
      expect(authServiceMock.isAuthenticatedSubject.next).toHaveBeenCalledWith(true);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(url);
    });
  });

  describe("logout", () => {
    it('should logout user', () => {
      spyOn(localStorage, 'removeItem');
      spyOn(authServiceMock.isAuthenticatedSubject, 'next');
  
      authServiceMock.logOut();
  
      expect(localStorage.removeItem).toHaveBeenCalledWith("user")
      expect(authServiceMock.isAuthenticatedSubject.next).toHaveBeenCalledWith(false);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  describe("updateUser", () => {
    it("should make put http request and return updated user", () => {
      authServiceMock.updateUser(mockUser).subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res).toEqual(mockUpdatedUser);
      });

      const req = httpController.expectOne({
        method: "PUT",
        url: `${environment.api_url}/login/update/${mockUser.id}`,
      });

      expect(req.request.method).toBe('PUT');
      req.flush(mockUpdatedUser);
    });
  });

  describe("updateExam", () => {
    it("should make put http request and return updated exam", () => {
      authServiceMock.updateExam(mockExam).subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res).toEqual(mockExam);
      });

      const req = httpController.expectOne({
        method: "PUT",
        url: `${environment.api_url}/exams/update/${mockExam.id}`,
      });

      expect(req.request.method).toBe('PUT');
      req.flush(mockExam);
    });
  });

  describe("getLoggedInUser", () => {
    it('should return user when user get from local storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
  
      const user = authServiceMock.getLoggedInUser();
  
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });

    it('should return null when user is null', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
  
      const user = authServiceMock.getLoggedInUser();
  
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(user).toBeFalsy();
    });
  });

  describe("isAuthenticated", () => {
    it('should return true when user is logged in', () => {
      const localStorageUser = mockUser;
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(localStorageUser));

      const isAuth = authServiceMock.isAuthenticated();

      expect(localStorage.getItem).toHaveBeenCalled();
      expect(isAuth).toBeTrue();
    });

    it('should return false when user is not logged in', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
  
      const isAuth = authServiceMock.isAuthenticated();
  
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(isAuth).toBeFalse();
    });
  })

  describe("getExams", () => {
    it("should make get http request and return an array of Exams", () => {
      authServiceMock.getExams().subscribe((res) => {
        expect(res).toBeTruthy();
        expect(res).toEqual(mockExams);
      });

      const req = httpController.expectOne({
        method: "GET",
        url: `${environment.api_url}/exams`,
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockExams);
    });
  });
});
