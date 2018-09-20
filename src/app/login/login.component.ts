import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _LoginService: LoginService) { }

  ngOnInit() {
  }

  checkLogin() {
    this._LoginService.getLogin().subscribe((data:any) => {console.log(data)});
  }

}
