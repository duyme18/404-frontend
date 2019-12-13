import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchAll} from '../model/search-all';
import {Observable} from 'rxjs';
import {Home} from '../model/home';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchAllService {

  private readonly searchAllUrl = environment.searchAllUrl;

  constructor(private http: HttpClient) {
  }

  searchALl(bedroomQuantity: number,
            bathroomQuantity: number,
            address: string,
            priceMin: number,
            priceMax: number): Observable<Home[]> {
    return this.http.get<Home[]>(this.searchAllUrl
      + bedroomQuantity + '/'
      + bathroomQuantity + '/'
      + address + '/'
      + priceMin + '/'
      + priceMax);
  }
}
