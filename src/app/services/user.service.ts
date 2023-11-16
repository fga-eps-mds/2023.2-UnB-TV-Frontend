import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface IGetAllUsers {
  name?: string;
  email?: string;
  nameEmail?: string;
  connection?: string;
  offset?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    return this.http.get(`${this.apiURL}/users/${id}`);
  }

  getAllUsers({ name, email, nameEmail, connection, offset, limit }: IGetAllUsers): Observable<any> {
    const params = {
      ...(name && { name__like: name }),
      ...(email && { email__like: email }),
      ...(nameEmail && { name_or_email: nameEmail }),
      ...(connection && { connection }),
      ...(offset && { offset: offset.toString() }),
      ...(limit && { limit: limit.toString() }),
    };

    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();

    return this.http.get(`${this.apiURL}/users${queryString && '?' + queryString}`, {observe: 'response'});
  }

  getRoles() {
    const access_token = localStorage.getItem("token");
    const payload: any = jwt_decode(access_token as string);
    const userRole: string = payload.role;
    return userRole;
  }

  updateUser(id: any, body: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/users/${id}`, body);
  }

  updateUserRole(id: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/users/role/${id}`, {});
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiURL}/users/${id}`);
  }
}