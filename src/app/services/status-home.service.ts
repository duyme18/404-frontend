import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatusHome} from '../model/status-home';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusHomeService {
  private readonly statusHomeUrl = environment.statusHomeUrl;

  constructor(private http: HttpClient) {
  }

  getStatusHomeList(): Observable<StatusHome[]> {
    return this.http.get<StatusHome[]>(this.statusHomeUrl);
  }

  createStatusHome(statusHome: StatusHome): Observable<StatusHome> {
    return this.http.post<StatusHome>(this.statusHomeUrl, statusHome);
  }

  updateStatusHome(statusHome: StatusHome): Observable<StatusHome> {
    return this.http.put<StatusHome>(this.statusHomeUrl + statusHome.id, statusHome);
  }

  deleteStatusHome(id: string): Observable<StatusHome> {
    return this.http.delete<StatusHome>(this.statusHomeUrl + id);
  }

  getAllHomeByStatusHomeId(id: string): Observable<StatusHome> {
    return this.http.get<StatusHome>(this.statusHomeUrl + 'home/' + id);
  }
}
