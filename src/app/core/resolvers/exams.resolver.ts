import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { IExam } from 'src/app/shared/models/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamsResolver  {
  constructor(private auth: AuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let { isAdmin } = route.data;

    let user = this.auth.getLoggedInUser();

    return this.auth.getExams().pipe(
      map((exams: IExam[]) => {
        if (isAdmin) {
          return exams;
        }

        return exams.filter((exam) => exam.details.student.id == user.id);
      })
    );
  }
}
