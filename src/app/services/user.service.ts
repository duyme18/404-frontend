import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from './booking';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/auth/user/';
  constructor(private http: HttpClient) { }

  getBookingByUser(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.userUrl + userId + '/booking' );
  }
}
