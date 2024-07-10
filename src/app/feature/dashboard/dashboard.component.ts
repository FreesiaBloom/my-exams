import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { IExam } from "src/app/shared/models/exam";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/core/services/auth.service";
import { SummeryDialogComponent } from "../../core/components/dialogs/summery-dialog/summery-dialog.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  exams: IExam[];
  dataSource = new MatTableDataSource<IExam>([]);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    "details.student.firstName",
    "details.school.schoolName",
    "details.summary",
    "details.subject",
    "details.course_number",
    "details.grade_value",
    "details.level",
    "details.semester",
    "details.discipline",
    "details.graded_url",
    "details.status",
  ];

  displayedLabels = {
    id: "ID",
    "details.student.firstName": "Name",
  };

  users: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.exams = this.route.snapshot.data.exams;
    this.users = this.route.snapshot.data.users;
    this.dataSource = new MatTableDataSource<IExam>(this.exams);
    this.dataSource.paginator = this.paginator;
  }

  showPopupWindow(summery): void {
    if (summery && this.isClickable(summery)) {
      this.dialog.open(SummeryDialogComponent, {
        data: summery,
      });
    }
  }

  isClickable(value): boolean {
    if (!value) return false;
    return value.split(" ").slice(0, 5).join(" ").length < value.length;
  }

  changeStatus(e, exam: IExam) {
    let status = +e.value;
    let user = this.users.find((u) => u.id == exam.details.student.id);

    let payload: IExam = { ...exam };
    payload.details.status = status;

    this.auth.updateUser({ ...user, status }).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Successfully Updated User");
      },
      (err) => {
        this.toastr.error("Update failed");
      }
    );

    this.auth.updateExam(payload).subscribe(
      (data) => {
        this.toastr.success("Successfully Updated Exam");
      },
      (err) => {
        this.toastr.error("Update failed");
      }
    );
  }
}
