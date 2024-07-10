import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock: Router;
  let authServiceMock: AuthService;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>(
      'Router',
      { 
        navigateByUrl: undefined
      }
    );

    authServiceMock = jasmine.createSpyObj<AuthService>(
      'AuthService',
      { 
        isAuthenticated: true
      }
    );
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for a logged in user', () => {
    guard = new AuthGuard(authServiceMock, routerMock);

    expect(guard.canActivate(null, null)).toEqual(true);
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false for a not logged in user', () => {
    authServiceMock.isAuthenticated = jasmine.createSpy().and.returnValue(false)

    guard = new AuthGuard(authServiceMock, routerMock);

    expect(guard.canActivate(null, null)).toEqual(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
