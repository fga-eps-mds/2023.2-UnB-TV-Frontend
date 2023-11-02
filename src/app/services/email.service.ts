import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmail } from 'src/shared/model/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8000/pauta/email';  // Ajuste conforme necessário

  constructor(private http: HttpClient) {}

  sendEmail(email: IEmail): Observable<any> {
    return this.http.post(this.apiUrl, email);
  }
}