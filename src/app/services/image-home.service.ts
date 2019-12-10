import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImageHome} from '../model/image-home';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageHomeService {

  private readonly imageHomeUrl = environment.imageHomeUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getImageId(id: string): Observable<ImageHome> {
    return this.httpClient.get<ImageHome>(this.imageHomeUrl + id);
  }

  public getList(): Observable<ImageHome[]> {
    return this.httpClient.get<ImageHome[]>(this.imageHomeUrl + '/home');
  }

  public addImage(imageHome: ImageHome): Observable<ImageHome> {
    return this.httpClient.post<ImageHome>(this.imageHomeUrl, imageHome);
  }

  public updateImage(imageHome: ImageHome, id: string): Observable<ImageHome> {
    return this.httpClient.put<ImageHome>(this.imageHomeUrl +  '/' + id, imageHome);
  }

  public deleteImage(id: string): Observable<ImageHome> {
    return this.httpClient.delete<ImageHome>(this.imageHomeUrl + '/' + id);
  }

  public getAllByHome(id: number): Observable<ImageHome[]> {
    return this.httpClient.get<ImageHome[]>(this.imageHomeUrl + '/home/' + id);
  }
}
