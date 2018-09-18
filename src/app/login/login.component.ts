import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password;
  name;
  hide = true;
  constructor(private _LoginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  checkLogin() {
    this._LoginService.getLogin(this.name,this.password).subscribe((data:any) => {
      console.log(data)
      if(data.test == 1) {
        document.cookie = "username=" + this.name;
        document.cookie = "password=" + this.password;
        this.router.navigateByUrl('/front-page');
      }
    });
  }

}
