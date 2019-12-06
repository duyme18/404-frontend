import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryRoom} from './category-room';
import {Observable} from 'rxjs';
import {CategoryHome} from './category-home';
import {SearchCategoryHomeByName} from '../category/category-home/search-category-home-by-name';
import {SearchCategoryRoomByName} from '../category/category-room/search-category-room-by-name';

@Injectable({
  providedIn: 'root'
})
export class CategoryRoomService {
  private readonly API_CATEGORY_ROOM_URL = 'http://localhost:8080/api/auth/category-room/';

  constructor(private http: HttpClient) {
  }

  getListCategoryRoom(): Observable<CategoryRoom[]> {
    return this.http.get<CategoryRoom[]>(this.API_CATEGORY_ROOM_URL);
  }

  createCategoryRoom(categoryRoom: CategoryRoom): Observable<CategoryRoom> {
    return this.http.post<CategoryRoom>(this.API_CATEGORY_ROOM_URL, categoryRoom);
  }

  updateCategoryRoom(categoryRoom: CategoryRoom): Observable<CategoryRoom> {
    return this.http.put<CategoryRoom>(this.API_CATEGORY_ROOM_URL + categoryRoom.id, categoryRoom);
  }

  deleteCategoryRoom(id: string): Observable<CategoryRoom> {
    return this.http.delete<CategoryRoom>(this.API_CATEGORY_ROOM_URL + id);
  }

  getAllHomeByCategoryRoomId(id: string): Observable<CategoryRoom> {
    return this.http.get<CategoryRoom>(this.API_CATEGORY_ROOM_URL + 'home/' + id);
  }

  searchCategoryRoomByName(name: SearchCategoryRoomByName): Observable<CategoryRoom[]> {
    return this.http.post<CategoryRoom[]>(this.API_CATEGORY_ROOM_URL + 'search-by-name', name);
  }
}
