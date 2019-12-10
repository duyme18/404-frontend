import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryHome} from '../model/category-home';
import {Observable} from 'rxjs';
import {SearchCategoryHomeByName} from '../category/category-home/search-category-home-by-name';
import {Home} from '../model/home';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryHomeService {
  private readonly categoryHomeUrl = environment.categoryHomeUrl;

  constructor(private http: HttpClient) {
  }

  getCategoryHomeList(): Observable<CategoryHome[]> {
    return this.http.get<CategoryHome[]>(this.categoryHomeUrl);
  }

  createCategoryHome(categoryHome: CategoryHome): Observable<CategoryHome> {
    return this.http.post<CategoryHome>(this.categoryHomeUrl, categoryHome);
  }

  updateCategoryHome(categoryHome: CategoryHome): Observable<CategoryHome> {
    return this.http.put<CategoryHome>(this.categoryHomeUrl + categoryHome.id, categoryHome);
  }

  deleteCategoryHome(id: string): Observable<CategoryHome> {
    return this.http.delete<CategoryHome>(this.categoryHomeUrl + id);
  }

  getAllHomeByCategoryHomeId(id: string): Observable<Home[]> {
    return this.http.get<Home[]>(this.categoryHomeUrl + 'home/' + id);
  }

  searchCategoryHomeByName(name: SearchCategoryHomeByName): Observable<CategoryHome[]> {
    return this.http.post<CategoryHome[]>(this.categoryHomeUrl + 'search-by-name', name);
  }
}

