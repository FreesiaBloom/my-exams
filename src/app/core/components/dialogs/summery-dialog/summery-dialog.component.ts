import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';


@Component({
  selector: 'app-summery-dialog',
  templateUrl: './summery-dialog.component.html',
  styleUrl: './summery-dialog.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ]
})
export class SummeryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}

