import { Component, OnInit } from '@angular/core';
import { OpeningHoursService } from '../opening-hours.service';
import { OpeningHoursDialogComponent } from '../opening-hours-dialog/opening-hours-dialog.component';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css'],
  providers: [OpeningHoursService]
})
export class OpeningHoursComponent implements OnInit {
  openingHours: Array<any>;

  constructor(private _OpeningHoursService: OpeningHoursService, public dialog: MatDialog, private _loginService: LoginService, private router: Router) { }

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
    this._loginService.getLogin(this.getCookie('username'), this.getCookie('password')).subscribe((data:any) => {
      console.log(data);
    },
    error => {
      this.router.navigateByUrl('/login');
    }
    );
    this._OpeningHoursService.getOpeningHours().subscribe(
      res => {
        this.openingHours = res['openingHours'];
      }
    )
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
}