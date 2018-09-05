import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReservationService } from '../reservation.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { Meta } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService]
})

export class ReservationComponent implements OnInit {
  name;
  date: Date;
  time;
  pcid;
  minDate = new Date();
  displayedColumns: string[] = ['user', 'id', 'date', 'delete'];
  dataSource;

  constructor(private meta: Meta, private _ReservationService: ReservationService, public dialog: MatDialog) { 
    this.meta.updateTag({ name:"viewport", content: 'user-scalable=yes, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' });
  }

  ngOnInit() {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this._ReservationService.getReservation().subscribe((data:any) => {
      this.dataSource = [];
      data.forEach(data => {
        this.dataSource.push({user: data.name, id: data.elementId, date: data.start + " - " + data.end + ", " + data.day, delete:"delete"});
      })
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  makeReservation() {
    var formattedDate = this.date.getFullYear() + "-" + ("0" + (this.date.getMonth() + 1)).slice(-2) + "-" + ("0" + this.date.getDate()).slice(-2);
    var start = this.time.substring(0,5);
    var end = this.time.substring(8);
    var json = { "elementId":this.pcid, "start": start, "name": this.name, "end": end, "type": "PC", "day": formattedDate, "workspaceId":1};
    if((this.name != undefined) && (this.name != "") && (this.pcid != undefined) && (this.pcid != "")){
      console.log(json);
      this._ReservationService.postReservation(JSON.stringify(json)).subscribe((data:any) => {console.log(data)});
    }
  }
}
