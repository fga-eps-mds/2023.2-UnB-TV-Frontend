import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updateUser(id: any, body: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/users/${id}`, body);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiURL}/users/${id}`);
  }

  updateUserRole(id: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/users/role/${id}`, {});
}
}