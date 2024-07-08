import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "src/app/core/services/auth.service";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceMock = jasmine.createSpyObj("AuthService", {
    logOut: () => {}
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("logOut", () => {
    it("should make http request to log out", () => {
      component.logOut();

      expect(authServiceMock.logOut).toHaveBeenCalled();
    })
  })
});
