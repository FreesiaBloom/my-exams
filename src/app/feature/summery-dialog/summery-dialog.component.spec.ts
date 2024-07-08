import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryDialogComponent } from './summery-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('SummeryDialogComponent', () => {
  let component: SummeryDialogComponent;
  let fixture: ComponentFixture<SummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummeryDialogComponent, MatDialogModule],
      providers: [
      {
        provide:MAT_DIALOG_DATA,
        useValue:{}
      }
  ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
