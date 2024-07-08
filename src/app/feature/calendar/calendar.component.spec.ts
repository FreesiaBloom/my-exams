import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { WeekSpreadPipe } from 'src/app/core/pipes/week-spread.pipe';
import { ActivatedRoute } from '@angular/router';
import { mockExams } from 'src/app/core/mock/exams.mock';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [WeekSpreadPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                exams: mockExams
              },
            },
          },
        },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
