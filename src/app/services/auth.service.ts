import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

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

  sendEmailPassword(email: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/reset-password/request`, email);
  }

  verifyCodePassword(info: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/reset-password/verify`, info);
  }

  updatePassword(user: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/auth/reset-password/change`, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
