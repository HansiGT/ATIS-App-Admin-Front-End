import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'https://workspace.cm.tm.kit.edu'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {

  constructor(private _http: HttpClient) { }

  getOpeningHours(){
    return this._http.get('https://workspace.cm.tm.kit.edu/opening-hours');
  }

  putOpeningHours(json) {
    return this._http.put('https://workspace.cm.tm.kit.edu/opening-hours', json, httpOptions);
  }
}