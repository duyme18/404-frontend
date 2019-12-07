import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Home} from './home';
import {CategoryHome} from './category-home';
import {CategoryRoom} from './category-room';
import {StatusHome} from './status-home';
import {FileForm} from './file-form';
import {SearchHomeByAddress} from '../home-management/home-list/search-home-by-address';
import {Booking} from './booking';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly homeUrl = environment.homeUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getHomeId(id: number): Observable<Home> {
    return this.httpClient.get<Home>(this.homeUrl + '/home/' + id);
  }

  public getList(): Observable<Home[]> {
    return this.httpClient.get<Home[]>(this.homeUrl + '/home');
  }

  public addHome(home: Home): Observable<Home> {
    return this.httpClient.post<Home>(this.homeUrl + '/home', home);
  }

  public updateHome(home: Home, id: number): Observable<Home> {
    return this.httpClient.put<Home>(`${this.homeUrl}` + '/home/' + `${id}`, home);
  }

  public deleteHome(id: number): Observable<Home> {
    return this.httpClient.delete<Home>(this.homeUrl + '/home/' + id);
  }

  public addFile(file: FormData, id: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.httpClient.post<FileForm>(this.homeUrl + '/file/' + id, file, {headers});
  }

  public searchHomeByAddress(address: SearchHomeByAddress): Observable<Home[]> {
    return this.httpClient.post<Home[]>(this.homeUrl + '/home/searchByAddress', address);
  }

  public getCategoryHomeList(): Observable<CategoryHome[]> {
    return this.httpClient.get<CategoryHome[]>(this.homeUrl + '/category-home');
  }

  public getCategoryRoomList(): Observable<CategoryRoom[]> {
    return this.httpClient.get<CategoryRoom[]>(this.homeUrl + '/category-room');
  }

  public getStatusHomeList(): Observable<StatusHome[]> {
    return this.httpClient.get<StatusHome[]>(this.homeUrl + '/status-home');
  }

  getAllHomeByBookingId(id: number): Observable<Home> {
    return this.httpClient.get<Home>(this.homeUrl + '/home/booking/' + id);
  }
}
