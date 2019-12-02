import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchAll} from '../home-list/search-all';
import {Observable} from 'rxjs';
import {Home} from './home';

@Injectable({
  providedIn: 'root'
})
export class SearchAllService {

  private readonly API_SEARCH_ALL_URL = 'http://localhost:8080/api/auth/home/searchAll/';

  constructor(private http: HttpClient) {
  }

  searchALl(bedroomQuantity: number,
            bathroomQuantity: number,
            address: string,
            priceMin: number,
            priceMax: number): Observable<Home[]> {
    return this.http.get<Home[]>(this.API_SEARCH_ALL_URL
      + bedroomQuantity + '/'
      + bathroomQuantity + '/'
      + address + '/'
      + priceMin + '/'
      + priceMax);
  }
}
