import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiURL;
  private token: string = "";

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbWFpbEBlbWFpbC5jb20iLCJleHAiOjE2OTc5MTcxNDl9.hHxbzKWsPZTgOz8VoH7KKkDQfYxep2FI2rKsBo6yFHY";
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  private getRequestOptions() {
    return { headers: this.getHeaders() };
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/login`, user);
  }

  activeAccount(emailCode: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/auth/activate-account`, emailCode);
  }

  resendCode(email: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/resend-code`, email);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(`${this.apiURL}/users/${id}`);
  }

  getAllUsers(): Observable<any> {
    const requestOptions = this.getRequestOptions();
    return this.http.get(`${this.apiURL}/users`, requestOptions);
  }

  updateUser(id: any, body: any): Observable<any> {
    return this.http.put(`${this.apiURL}/users/${id}`, body);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiURL}/users/${id}`);
  }
}
