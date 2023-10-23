import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    return this.http.get(`${this.apiURL}/users/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiURL}/users`);
  }

  updateUser(id: any, body: any): Observable<any> {
    return this.http.put(`${this.apiURL}/users/${id}`, body);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiURL}/users/${id}`);
  }
}
