import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoCommentService {

  private apiURLVideo = environment.apiURLVideo;

  constructor(private http: HttpClient) { }

  getComments(video_id: any): Observable<any> {
    return this.http.get(`${this.apiURLVideo}/comments/${video_id}`);
  }

  postComment(): Observable<any> {
    return this.http.get(`${this.apiURLVideo}/comments`);
  }

  updateComment(id: any, body: any): Observable<any> {
    return this.http.patch(`${this.apiURLVideo}/comments/${id}`, body);
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${this.apiURLVideo}/comments/${id}`);
  }
}
