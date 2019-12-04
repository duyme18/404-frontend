import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImageHome} from './image-home';
import {IComment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class ImageHomeService {

  private readonly API_IMAGE_HOME_URL = 'http://localhost:8080/api/auth/imageHome';

  constructor(private httpClient: HttpClient) {
  }

  public getImageId(id: string): Observable<ImageHome> {
    return this.httpClient.get<ImageHome>(this.API_IMAGE_HOME_URL + id);
  }

  public getList(): Observable<ImageHome[]> {
    return this.httpClient.get<ImageHome[]>(this.API_IMAGE_HOME_URL + '/home');
  }

  public addImage(imageHome: ImageHome): Observable<ImageHome> {
    return this.httpClient.post<ImageHome>(this.API_IMAGE_HOME_URL, imageHome);
  }

  public updateImage(imageHome: ImageHome, id: string): Observable<ImageHome> {
    return this.httpClient.put<ImageHome>(this.API_IMAGE_HOME_URL +  '/' + id, imageHome);
  }

  public deleteImage(id: string): Observable<ImageHome> {
    return this.httpClient.delete<ImageHome>(this.API_IMAGE_HOME_URL + '/' + id);
  }

  public getAllByHome(id: number): Observable<ImageHome[]> {
    return this.httpClient.get<ImageHome[]>(this.API_IMAGE_HOME_URL + '/home/' + id);
  }
}
