import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CurrentUtilizationService {

  constructor(private _http: HttpClient) { }

  getLayout() {
    var url = 'https://workspace.cm.tm.kit.edu/layout';
    return this._http.get(url);
  }

  getState() {
    var url = 'https://utilization.cm.tm.kit.edu/currentState';
    return this._http.get(url);
  }

  getUtilization() {
    var url = 'https://utilization.cm.tm.kit.edu/currentUtilization';
    return this._http.get(url);
  }

}
