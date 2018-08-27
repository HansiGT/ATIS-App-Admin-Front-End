import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-opening-hours-dialog',
  templateUrl: './opening-hours-dialog.component.html',
  styleUrls: ['./opening-hours-dialog.component.css']
})
export class OpeningHoursDialogComponent implements OnInit {
  from = "";
  until = "";

  constructor() { }

  ngOnInit() {
  }

  julianStinks() {
    console.log(this.from,this.until);
  }

}
