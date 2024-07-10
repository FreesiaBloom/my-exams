import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarComponent } from "./navbar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "src/app/core/services/auth.service";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const authServiceMock = jasmine.createSpyObj("AuthService", {
    logOut: () => {}
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
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
