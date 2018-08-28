import { Component, Output, EventEmitter } from '@angular/core';
import { PredictionService } from '../prediction.service';

const now = new Date();


@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker.component.html',
  providers: [PredictionService]
})

export class NgbDatepickerPopup {
  @Output() myClick = new EventEmitter();

  model: any;
  weekDayNumber: number = 0;

  constructor(private predictionService: PredictionService) {
    this.model = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  ngOnInit() {
  }

  getPrediction() {
    var d = new Date(this.model.year, this.model.month - 1, this.model.day);
    this.weekDayNumber = d.getDay();
    this.myClick.emit(this.weekDayNumber);
  }

}
