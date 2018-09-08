import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface OHday {

  day: string;
  from: string;
  to: string;

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
          "startTime": day.from,
          "endTime": day.to
        })
      }
    });
    this.dialogRef.close(json);
  }

  cancel() {
    this.dialogRef.close();
  }

}