import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Booking} from './booking';
import {Home} from './home';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_BOOKING_URL = 'http://localhost:8080/api/auth/booking';

  constructor(private http: HttpClient) {
  }

  getBookingList(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.API_BOOKING_URL);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.API_BOOKING_URL, booking);
  }

  deleteBookingById(id: number): Observable<Booking> {
    return this.http.delete<Booking>(this.API_BOOKING_URL + '/' + id);
  }

  findBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.API_BOOKING_URL + '/' + id);
  }


}
