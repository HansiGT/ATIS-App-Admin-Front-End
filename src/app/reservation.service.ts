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
export class ReservationService {

  constructor(private _http: HttpClient) { }

  getReservation() {
    return this._http.get('https://reservation.cm.tm.kit.edu/reservation');
  }

  postReservation(json) {
    return this._http.post('https://reservation.cm.tm.kit.edu/reservation', json, httpOptions);
  }
}
