import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin1:secret1')
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  getLogin() {
    console.log(httpOptions);
    
    return this._http.request("OPTIONS", 'https://workspace.cm.tm.kit.edu/SecureTest', httpOptions);
  }
}