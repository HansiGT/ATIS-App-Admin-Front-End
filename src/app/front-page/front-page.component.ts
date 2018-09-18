import { Component, OnInit } from '@angular/core';
import { OpeningHoursService } from '../opening-hours.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

/*
each tile has text that it will display, a link to the page that the text describes
a size (rows, cols) and a color. Maybe there will also be a logo/icon
*/
export interface Tile {
  text: string;
  routerLink: string;
  imgSrc: string;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  /*
  all tiles that will appear on the frontpage
  */
  tiles: Tile[] = [

    {
      text: 'Öffnungszeiten',
      routerLink: '/opening-hours',
      imgSrc: 'access_time',
      cols: 1,
      rows: 1,
      color: '#3f51b5'
    },

    {
      text: 'Reservierungen',
      routerLink: '/reservation',
      imgSrc: 'event_available',
      cols: 1,
      rows: 1,
      color: '#3f51b5'
    },
    {
      text: 'Layout Editor',
      routerLink: '/layout-editor',
      imgSrc: 'view_compact',
      cols: 1,
      rows: 1,
      color: '#3f51b5'
    }
  ];
  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this._loginService.getLogin(this.getCookie('username'), this.getCookie('password')).subscribe((data:any) => {
      console.log(data);
    },
    error => {
      this.router.navigateByUrl('/login');
    }
    );
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
