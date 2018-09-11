import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface OHday {

  day: string;
  from;
  to;

}

@Component({
  selector: 'app-opening-hours-dialog',
  templateUrl: './opening-hours-dialog.component.html',
  styleUrls: ['./opening-hours-dialog.component.css']
})
export class OpeningHoursDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpeningHoursDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.oHweek.forEach(day => {
      this.data.openingHours.forEach(day2 =>{
        if(day.day == day2.dayOfWeek) {
          day.from = day2.startTime;
          day.to = day2.endTime;
        }
      })
    })
  }
  
  //bin mir nnoch nicht 100% sicher wie ich in der .html darauf zugreifen soll
  oHweek: OHday[] = [
    { day: "MONDAY",    from: "", to: "" },
    { day: "TUESDAY",   from: "", to: "" },
    { day: "WEDNESDAY", from: "", to: "" },
    { day: "THURSDAY",  from: "", to: "" },
    { day: "FRIDAY",    from: "", to: "" },
    { day: "SATURDAY",  from: "", to: "" },
    { day: "SUNDAY",    from: "", to: "" },
  ]
  
  save() {
    var json = { "openingHours": [] };
    this.oHweek.forEach(day => {
      if (day.from != "" && day.to != "") {
        json['openingHours'].push({
          "dayOfWeek": day.day,
          "startTime": (day.from.indexOf(":") > 1) ? day.from.substring(0, day.from.indexOf(":") + 3) : ("0" + day.from.substring(0, day.from.indexOf(":") + 3)),
          "endTime": (day.to.indexOf(":") > 1) ? day.to.substring(0, day.to.indexOf(":") + 3) : ("0" + day.to.substring(0, day.to.indexOf(":") + 3)),
        })
      }
    });
    this.dialogRef.close(json);
  }

  cancel() {
    this.dialogRef.close();
  }

}