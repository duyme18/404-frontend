import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryHome} from './category-home';
import {Observable} from 'rxjs';
import {SearchCategoryHomeByName} from '../category/category-home/search-category-home-by-name';

@Injectable({
  providedIn: 'root'
})
export class CategoryHomeService {
  private readonly API_CATEGORY_HOME_URL = 'http://localhost:8080/api/auth/category-home/';

  constructor(private http: HttpClient) {
  }

  getCategoryHomeList(): Observable<CategoryHome[]> {
    return this.http.get<CategoryHome[]>(this.API_CATEGORY_HOME_URL);
  }

  createCategoryHome(categoryHome: CategoryHome): Observable<CategoryHome> {
    return this.http.post<CategoryHome>(this.API_CATEGORY_HOME_URL, categoryHome);
  }

  updateCategoryHome(categoryHome: CategoryHome): Observable<CategoryHome> {
    return this.http.put<CategoryHome>(this.API_CATEGORY_HOME_URL + categoryHome.id, categoryHome);
  }

  deleteCategoryHome(id: string): Observable<CategoryHome> {
    return this.http.delete<CategoryHome>(this.API_CATEGORY_HOME_URL + id);
  }

  getAllHomeByCategoryHomeId(id: string): Observable<CategoryHome> {
    return this.http.get<CategoryHome>(this.API_CATEGORY_HOME_URL + 'home/' + id);
  }

  searchCategoryHomeByName(name: SearchCategoryHomeByName): Observable<CategoryHome[]> {
    return this.http.post<CategoryHome[]>(this.API_CATEGORY_HOME_URL + 'search-by-name', name);
  }
}

