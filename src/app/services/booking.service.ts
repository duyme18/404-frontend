import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Booking} from '../model/booking';
import {Home} from '../model/home';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly bookingUrl = environment.bookingUrl;

  constructor(private http: HttpClient) {
  }

  getBookingList(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingUrl);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingUrl, booking);
  }

  deleteBookingById(id: number): Observable<Booking> {
    return this.http.delete<Booking>(this.bookingUrl + '/' + id);
  }

  findBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.bookingUrl + '/' + id);
  }


}
