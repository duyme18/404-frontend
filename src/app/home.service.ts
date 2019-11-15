import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Home} from './home';
import {CategoryHome} from './category-home';
import {CategoryRoom} from './category-room';
import {StatusHome} from './status-home';
import {FileForm} from './file-form';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {
  }

  public getHomeId(id: string): Observable<Home> {
    return this.httpClient.get<Home>(this.API_URL + '/home/' + id);
  }

  public getList(): Observable<Home[]> {
    return this.httpClient.get<Home[]>(this.API_URL + '/home');
  }

  public addHome(home: Home): Observable<Home> {
    return this.httpClient.post<Home>(this.API_URL + '/home', home);
  }

  public addFile(file: FormData, id: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.httpClient.post<FileForm>(this.API_URL + '/file/' + id, file, {headers});
  }

  public getCategoryHomeList(): Observable<CategoryHome[]> {
    return this.httpClient.get<CategoryHome[]>(this.API_URL + '/category-home');
  }

  public getCategoryRoomList(): Observable<CategoryRoom[]> {
    return this.httpClient.get<CategoryRoom[]>(this.API_URL + '/category-room');
  }

  public getStatusHomeList(): Observable<StatusHome[]> {
    return this.httpClient.get<StatusHome[]>(this.API_URL + '/status-home');
  }
}
