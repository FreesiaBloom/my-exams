import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardComponent } from "./dashboard.component";
import { ActivatedRoute } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { EllipsisPipe } from "src/app/core/pipes/ellipsis.pipe";
import { mockExam, mockExams } from "src/app/core/mock/exams.mock";
import { mockUsers } from "src/app/core/mock/user-data.mock";
import { of, throwError } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { IExam } from "src/app/shared/models/exam";
 
describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
    updateExam: of({}),
  });

  const toastServiceMock = jasmine.createSpyObj("ToastrService", {
    success: undefined,
    error: undefined,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        EllipsisPipe
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                users: mockUsers,
                exams: mockExams
              },
            },
          },
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {},
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should render table with mocked data', (done) => {
    expect(component.users).toEqual(mockUsers);
    expect(component.exams).toEqual(mockExams);
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('th');
      expect(tableRows.length).toBe(11);

      done();
    });
  });

  describe("isClickable", () => {
    it("should return true for null value", () => {
      expect(component.isClickable(null)).toEqual(false);
    });

    it("should return true for long summery value", () => {
      expect(component.isClickable("ISO recommendations on industrial safety for battery manufacturers")).toEqual(true);
    });
    
    it("should return false for short summery value", () => {
      expect(component.isClickable("University of Moscow")).toEqual(false);
    });
  });

  describe("changeStatus", () => {
    it("should updateUser when user status change return success", () => {
      component.changeStatus({value: '0'}, component.exams[0]);

      const user = component.users.find((u) => u.id == component.exams[0].details.student.id);

      expect(authServiceMock.updateUser).toHaveBeenCalledWith({...user, status: 0});
      expect(toastServiceMock.success).toHaveBeenCalledWith('Successfully Updated User');
    });

    it("should not updateUser when user status returns error", () => {
      authServiceMock.updateUser = jasmine.createSpy().and.returnValue(throwError(() => new Error()))
      
      component.changeStatus({value: '0'}, component.exams[0]);

      expect(authServiceMock.updateUser).toHaveBeenCalled();
      expect(toastServiceMock.error).toHaveBeenCalledWith('Update failed');
    });

    it("should updateExam when user status is changed", () => {
      component.changeStatus({value: '0'}, component.exams[0]);

      const payload: IExam = { ...component.exams[0] };
      payload.details.status = 0;

      expect(authServiceMock.updateExam).toHaveBeenCalledWith(payload);
      expect(toastServiceMock.success).toHaveBeenCalledWith('Successfully Updated Exam');
    });
    

    it("should not updateUser when user status returns error", () => {
      authServiceMock.updateExam = jasmine.createSpy().and.returnValue(throwError(() => new Error()));
      
      component.changeStatus({value: '0'}, component.exams[0]);

      expect(authServiceMock.updateExam).toHaveBeenCalled();
      expect(toastServiceMock.error).toHaveBeenCalledWith('Update failed');
    });
  });
});
