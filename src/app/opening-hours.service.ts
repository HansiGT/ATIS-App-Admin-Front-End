import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {

  constructor(private _http: HttpClient) { }

  getOpeningHours(){
    var url = 'https://workspace.cm.tm.kit.edu/opening-hours';
    return this._http.get(url);
  }

  postOpeningHours(json) {
    return this._http.post('https://workspace.cm.tm.kit.edu/addOpeningHours/id/1', json, httpOptions);
  }
}