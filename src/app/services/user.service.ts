import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from './booking';
import {Observable} from 'rxjs';
import {User} from './user';
import {SearchHomeByAddress} from '../home-management/home-list/search-home-by-address';
import {Home} from './home';
import {SearchUserByName} from '../user-manage/search-user-by-name';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/auth/user/';

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
