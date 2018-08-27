import { Component, OnInit } from '@angular/core';
import { OpeningHoursService } from '../opening-hours.service';
import { OpeningHoursDialogComponent } from '../opening-hours-dialog/opening-hours-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css']
})
export class OpeningHoursComponent implements OnInit {
  openingHours: Array<any>;

  constructor(private _OpeningHoursService: OpeningHoursService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpeningHoursDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this._OpeningHoursService.getOpeningHours().subscribe(
      res => {
        this.openingHours = res['openingHours'];
      }
    )
  }
}