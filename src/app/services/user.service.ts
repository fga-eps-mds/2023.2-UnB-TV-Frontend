import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersAPIURL = environment.usersAPIURL;

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    return this.http.get(`${this.usersAPIURL}/users/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.usersAPIURL}/users`);
  }

  updateUser(id: any, body: any): Observable<any> {
    return this.http.patch(`${this.usersAPIURL}/users/${id}`, body);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.usersAPIURL}/users/${id}`);
  }

  getVinculo(): Observable<any> {
    return this.http.get(`${this.usersAPIURL}/auth/vinculo`);
  }
}
