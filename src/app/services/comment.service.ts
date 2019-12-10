import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IComment} from '../model/comment';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly commentUrl = environment.commentUrl;

  constructor(private http: HttpClient) {
  }

  public getAllCommentByHome(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.commentUrl + 'home/' + id);
  }

  public createComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.commentUrl, comment);
  }

  public editComment(comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(this.commentUrl + comment.id, comment);
  }

  public deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(this.commentUrl + id);
  }
}
