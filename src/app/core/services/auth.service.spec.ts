import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { Injector } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { mockExam, mockExams } from "../../shared/mock/exams.mock";
import { mockUpdatedUserData, mockUserData, mockUsers } from "../../shared/mock/user-data.mock";

// TODO: (agajas) create more unit test with local storage
describe("AuthService", () => {
  let injector: Injector;
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    let user = {};
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
    service = injector.get(AuthService);
    httpController = injector.get(HttpTestingController);
    // const mockUserStorage = {
    //   getItem: (key: string): string => {
    //     return key in user ? user[key] : null;
    //   },
    //   setItem: (key: string, value: string) => {
    //     user[key] = `${value}`;
    //   },
    //   removeItem: (key: string) => {
    //     delete user[key];
    //   },
    //   clear: () => {
    //     user = {};
    //   }
    // };

    // spyOn(localStorage, 'getItem')
    // .and.callFake(mockUserStorage.getItem);
    // spyOn(localStorage, 'setItem')
    //   .and.callFake(mockUserStorage.setItem);
    // spyOn(localStorage, 'removeItem')
    //   .and.callFake(mockUserStorage.removeItem);
    // spyOn(localStorage, 'clear')
    //   .and.callFake(mockUserStorage.clear);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // describe('populate', () => {
  //   it("should store mocked user in localStorage", () => {
  //     localStorage.setItem('suer', JSON.stringify(mockUserData));
  //     service.populate();
  //     expect(localStorage.getItem('user')).toEqual('sometoken');
  //   });
  // });

  describe("getExams", () => {
    it("should make get http request and return an array of Exams", () => {
      service.getExams().subscribe((res) => {
        expect(res).toEqual(mockExams);
      });

      const req = httpController.expectOne({
        method: "GET",
        url: `${environment.api_url}/exams`,
      });

      req.flush(mockExams);
    });
  });

  describe("updateExam", () => {
    it("should make put http request and return updated exam", () => {
      service.updateExam(mockExam).subscribe((res) => {
        expect(res).toEqual(mockExam);
      });

      const req = httpController.expectOne({
        method: "PUT",
        url: `${environment.api_url}/exams/update/${mockExam.id}`,
      });

      req.flush(mockExam);
    });
  });

  describe("getUsers", () => {
    it("should make get http request and return user list", () => {
      service.getUsers().subscribe((res) => {
        expect(res).toEqual(mockUsers);
      });

      const req = httpController.expectOne({
        method: "GET",
        url: `${environment.api_url}/login`,
      });

      req.flush(mockUsers);
    });
  });

  describe("updateUser", () => {
    it("should make put http request and return updated user", () => {
      service.updateUser(mockUserData).subscribe((res) => {
        expect(res).toEqual(mockUpdatedUserData);
      });

      const req = httpController.expectOne({
        method: "PUT",
        url: `${environment.api_url}/login/update/${mockUserData.id}`,
      });

      req.flush(mockUpdatedUserData);
    });
  });

  describe("transformUserData", () => {
    it("should return null for empty arguments", () => {
      expect(service.transformUserData(null)).toEqual(null);
    });

    it("should return updated user data", () => {
      expect(service.transformUserData(mockUserData)).toEqual(
        mockUpdatedUserData
      );
    });
  });
});
