import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryRoom} from '../model/category-room';
import {Observable} from 'rxjs';
import {SearchCategoryRoomByName} from '../category/category-room/search-category-room-by-name';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryRoomService {
  private readonly categoryRoomUrl = environment.categoryRoomUrl;

  constructor(private http: HttpClient) {
  }

  getListCategoryRoom(): Observable<CategoryRoom[]> {
    return this.http.get<CategoryRoom[]>(this.categoryRoomUrl);
  }

  createCategoryRoom(categoryRoom: CategoryRoom): Observable<CategoryRoom> {
    return this.http.post<CategoryRoom>(this.categoryRoomUrl, categoryRoom);
  }

  updateCategoryRoom(categoryRoom: CategoryRoom): Observable<CategoryRoom> {
    return this.http.put<CategoryRoom>(this.categoryRoomUrl + categoryRoom.id, categoryRoom);
  }

  deleteCategoryRoom(id: string): Observable<CategoryRoom> {
    return this.http.delete<CategoryRoom>(this.categoryRoomUrl + id);
  }

  getAllHomeByCategoryRoomId(id: string): Observable<CategoryRoom> {
    return this.http.get<CategoryRoom>(this.categoryRoomUrl + 'home/' + id);
  }

  searchCategoryRoomByName(name: SearchCategoryRoomByName): Observable<CategoryRoom[]> {
    return this.http.post<CategoryRoom[]>(this.categoryRoomUrl + 'search-by-name', name);
  }
}
