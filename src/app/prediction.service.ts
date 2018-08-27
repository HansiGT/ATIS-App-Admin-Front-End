import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PredictionService {

  constructor(private _http: HttpClient) { }

  getPrediction(weekDayNumber: number) {
    var weekDayString = '';
    switch (weekDayNumber) {
      case 0:
        weekDayString = 'SUNDAY';
        break;
      case 1:
        weekDayString = 'MONDAY';
        break;
      case 2:
        weekDayString = 'TUESDAY';
        break;
      case 3:
        weekDayString = 'WEDNESDAY';
        break;
      case 4:
        weekDayString = 'THURSDAY';
        break;
      case 5:
        weekDayString = 'FRIDAY';
        break;
      case 6:
        weekDayString = 'SATURDAY';
        break;
    }
    var url = 'https://utilization.cm.tm.kit.edu/prediction/day/' + weekDayString;
    return this._http.get(url);
  }
}
