import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {

  constructor(private _http: HttpClient) { }

  getOpeningHours(){
    var url = 'https://workspace.cm.tm.kit.edu/opening-hours';
    return this._http.get(url);
  }
}
