import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usersAPIURL = environment.usersAPIURL;

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/login`, user);
  }

  activeAccount(emailCode: any): Observable<any> {
    return this.http.patch(`${this.usersAPIURL}/auth/activate-account`, emailCode);
  }

  resendCode(email: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/resend-code`, email);
  }

  sendEmailPassword(email: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/reset-password/request`, email);
  }

  verifyCodePassword(info: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/reset-password/verify`, info);
  }

  updatePassword(user: any): Observable<any> {
    return this.http.patch(`${this.usersAPIURL}/auth/reset-password/change`, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
