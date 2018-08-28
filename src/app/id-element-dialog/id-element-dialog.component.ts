import { Component, OnInit, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-id-element-dialog',
  templateUrl: './id-element-dialog.component.html',
  styleUrls: ['./id-element-dialog.component.css']
})
export class IdElementDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IdElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
   this.dialogRef.close();
  }


}
