import { Component, OnInit } from '@angular/core';
import { OpeningHoursService } from '../opening-hours.service';
import { OpeningHoursDialogComponent } from '../opening-hours-dialog/opening-hours-dialog.component';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css'],
  providers: [OpeningHoursService]
})
export class OpeningHoursComponent implements OnInit {
  openingHours: Array<any>;

  constructor(private _OpeningHoursService: OpeningHoursService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(OpeningHoursDialogComponent, {
      height: "80vh",
      data: {
        openingHours: this.openingHours
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != undefined){
      console.log(JSON.stringify(result));
      this._OpeningHoursService.putOpeningHours(JSON.stringify(result)).subscribe((data:any) => {
        console.log(data);
        location.reload();
      })
      }
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