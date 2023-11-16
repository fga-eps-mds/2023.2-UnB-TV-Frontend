import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../../shared/model/comment.model';

type CommentResponseType = HttpResponse<IComment[]>;

@Injectable({
  providedIn: 'root'
})
export class VideoCommentService {

  public apiURLVideo = environment.videoAPIURL;
  public apiURLUsers = environment.usersAPIURL;

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiURLUsers}/users/${id}`, { headers: headers, observe: 'response' });
  }

  getComments(video_id: any): Observable<CommentResponseType> {
    return this.http.get<IComment[]>(`${this.apiURLVideo}/comments/${video_id}`, { observe: 'response' });
  }

  postComment(body: any): Observable<any> {
    return this.http.post(`${this.apiURLVideo}/comments`, body);
  }

  updateComment(id: any, body: any): Observable<any> {
    return this.http.patch(`${this.apiURLVideo}/comments/${id}`, body);
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${this.apiURLVideo}/comments/${id}`);
  }
}
