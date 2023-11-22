import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GridService {
  public videoServiceApiURL = environment.videoAPIURL;

  constructor(private http: HttpClient) { }

  getSchedule(day?: string): Observable<any> {
    return this.http.get(`${this.videoServiceApiURL}/schedule${day ? '?day=' + day : ''}`)
  }
}
