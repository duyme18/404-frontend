import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../model/booking';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {SearchUserByName} from '../user-manage/search-user-by-name';
import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.userUrl;

  constructor(private http: HttpClient) {
  }

  getBookingByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.userUrl + userId + '/booking');
  }

  searchUserByName(name: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.userUrl + 'search-by-name', name);
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
