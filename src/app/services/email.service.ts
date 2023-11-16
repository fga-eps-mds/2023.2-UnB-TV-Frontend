import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmailData } from 'src/shared/model/email.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private adminAPIUrl = environment.adminAPIURL + '/pauta/email';  // Ajuste conforme necessário

  constructor(private http: HttpClient) { }

  sendEmail(email: IEmailData): Observable<any> {
    return this.http.post(this.adminAPIUrl, email);
  }
}