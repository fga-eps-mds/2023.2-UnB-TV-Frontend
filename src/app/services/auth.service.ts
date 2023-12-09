import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usersAPIURL = environment.usersAPIURL;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/login`, user);
  }

  loginSocialUser(userSocialData: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/login/social`, userSocialData);
  }

  activeAccount(emailCode: any): Observable<any> {
    return this.http.patch(`${this.usersAPIURL}/auth/activate-account`, emailCode);
  }

  resendCode(email: any): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/resend-code`, { email });
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
  
  refreshToken(): Observable<any> {
    return this.http.post(`${this.usersAPIURL}/auth/refresh`, null);
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/loginsocial']);
  }
}
