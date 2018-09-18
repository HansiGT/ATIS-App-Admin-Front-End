import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReservationService } from '../reservation.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import {FormControl, Validators} from '@angular/forms';
import { Meta } from '../../../node_modules/@angular/platform-browser';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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
  nameCheck = new FormControl('', [Validators.required]);
  idCheck = new FormControl('', [Validators.required]);

  nameError() {
    this.nameCheck.hasError('required') ? 'Bitte geben sie einen Namen ein' : '';
  }

  idError() {
    this.idCheck.hasError('required') ? 'Bitte geben sie einen Namen ein' : '';
  }

  constructor(private meta: Meta, private _ReservationService: ReservationService, public dialog: MatDialog, private _loginService: LoginService, private router: Router) { 
    this.meta.updateTag({ name:"viewport", content: 'user-scalable=yes, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' });
  }

  ngOnInit() {
    this._loginService.getLogin(this.getCookie('username'), this.getCookie('password')).subscribe((data:any) => {
      console.log(data);
    },
    error => {
      this.router.navigateByUrl('/login');
    }
    );
    this.minDate.setDate(this.minDate.getDate() + 1);
    this._ReservationService.getReservation().subscribe((data:any) => {
      this.dataSource = [];
      data.forEach(data => {
        this.dataSource.push({user: data.name, id: data.elementId, date: data.start + " - " + data.end + ", " + data.day, delete:"delete"});
      })
    })
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
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
      this._ReservationService.postReservation(JSON.stringify(json)).subscribe((data:any) => {
        console.log(data);
        location.reload();
      });
    }
  }

  deleteReservation(id) {
    this._ReservationService.deleteReservation(id).subscribe((data:any) => {
      console.log(data);
      location.reload();
    });
  }
}
