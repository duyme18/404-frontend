import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatusHome} from './status-home';

@Injectable({
  providedIn: 'root'
})
export class StatusHomeService {
  private readonly API_STATUS_HOME_URL = 'http://localhost:8080/api/auth/status-h/';

  constructor(private http: HttpClient) {
  }

  getStatusHomeList(): Observable<StatusHome[]> {
    return this.http.get<StatusHome[]>(this.API_STATUS_HOME_URL);
  }

  createStatusHome(statusHome: StatusHome): Observable<StatusHome> {
    return this.http.post<StatusHome>(this.API_STATUS_HOME_URL, statusHome);
  }

  updateStatusHome(statusHome: StatusHome): Observable<StatusHome> {
    return this.http.put<StatusHome>(this.API_STATUS_HOME_URL + statusHome.id, statusHome);
  }

  deleteStatusHome(id: string): Observable<StatusHome> {
    return this.http.delete<StatusHome>(this.API_STATUS_HOME_URL + id);
  }

  getAllHomeByStatusHomeId(id: string): Observable<StatusHome> {
    return this.http.get<StatusHome>(this.API_STATUS_HOME_URL + 'home/' + id);
  }
}
