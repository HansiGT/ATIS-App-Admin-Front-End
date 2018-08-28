import { Component, OnInit, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-opening-hours-dialog',
  templateUrl: './opening-hours-dialog.component.html',
  styleUrls: ['./opening-hours-dialog.component.css']
})
export class OpeningHoursDialogComponent implements OnInit {
  mondayfrom = "";
  mondayuntil = "";
  tuesdayfrom = "";
  tuesdayuntil = "";
  wednesdayfrom = "";
  wednesdayuntil = "";
  thursdayfrom = "";
  thursdayuntil = "";
  fridayfrom = "";
  fridayuntil = "";
  saturdayfrom = "";
  saturdayuntil = "";
  sundayfrom = "";
  sundayuntil = "";

  constructor(public dialogRef: MatDialogRef<OpeningHoursDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save() {
    var json = {"openingHours":[]};
    if (this.mondayfrom != "" && this.mondayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"MONDAY","startTime":this.mondayfrom,"endTime":this.mondayuntil})
    };
    if (this.tuesdayfrom != "" && this.tuesdayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"TUESDAY","startTime":this.tuesdayfrom,"endTime":this.tuesdayuntil})
    };
    if (this.wednesdayfrom != "" && this.wednesdayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"WEDNESDAY","startTime":this.wednesdayfrom,"endTime":this.wednesdayuntil})
    };
    if (this.thursdayfrom != "" && this.thursdayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"THURSDAY","startTime":this.thursdayfrom,"endTime":this.thursdayuntil})
    };
    if (this.fridayfrom != "" && this.fridayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"FRIDAY","startTime":this.fridayfrom,"endTime":this.fridayuntil})
    };
    if (this.saturdayfrom != "" && this.saturdayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"SATURDAY","startTime":this.saturdayfrom,"endTime":this.saturdayuntil})
    };
    if (this.sundayfrom != "" && this.sundayuntil != ""){
      json['openingHours'].push({"dayOfWeek":"SUNDAY","startTime":this.sundayfrom,"endTime":this.sundayuntil})
    };
    this.dialogRef.close(json);
  }

  cancel() {
    this.dialogRef.close();
  }

}