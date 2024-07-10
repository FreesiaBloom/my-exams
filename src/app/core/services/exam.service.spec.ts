import { TestBed } from '@angular/core/testing';

import { ExamService } from './exam.service';
import { mockExam, mockExams } from 'src/app/shared/mock/exams.mock';
import { of } from 'rxjs';

export class MdDialogMock {
  open() {
    return {
      afterClosed: () =>of({})
    };
  }
};

describe('ExamService', () => {
  let service: ExamService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("isExamsIncludesDate", () => {
    it('should return null for empty parameters', () => {
      expect(service.isExamsIncludesDate(null, null)).toEqual(null);
    });

    it('should return null for no matched exam', () => {
      const mockDate = new Date('August 19, 2024');
      expect(service.isExamsIncludesDate(mockExams, mockDate)).toEqual(null);
    });

    it('should return exam for matched exam', () => {
      expect(service.isExamsIncludesDate(mockExams, new Date(mockExam.details.exam_date))).toEqual(mockExam);
    });
  });
});
