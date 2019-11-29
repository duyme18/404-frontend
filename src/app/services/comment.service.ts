import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IComment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly API_COMMENT_URL = 'http://localhost:8080/api/auth/comment/';

  constructor(private http: HttpClient) {
  }

  public getAllCommentByHome(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.API_COMMENT_URL + 'home/' + id);
  }

  public createComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.API_COMMENT_URL, comment);
  }

  public editComment(comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(this.API_COMMENT_URL + comment.id, comment);
  }

  public deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(this.API_COMMENT_URL + id);
  }
}
