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
export class LayoutEditorService {

  constructor(private _http: HttpClient) { }

  getLayout(id: number) {
    return this._http.get('https://workspace.cm.tm.kit.edu/layout/id/' + id);
  }

  putLayout(json) {
    return this._http.post('https://workspace.cm.tm.kit.edu/add-layout/id/2', json, httpOptions);
  }
}
