import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EDUPLAY_API_URL, UNB_ID } from 'src/app/app.constant';
import { IVideo } from 'src/shared/model/video.model';
import { EDUPLAY_CLIENT_KEY } from 'src/app/secret/eduplay.credentials';
import { IEduplayVideosByInstitution } from 'src/shared/model/eduplay-by-institution.model';

type VideoResponseType = HttpResponse<IVideo>;
type VideoArrayResponseType = HttpResponse<IVideo[]>;
type EduplayByInstitutionResponseType = HttpResponse<IEduplayVideosByInstitution>;



@Injectable({
  providedIn: 'root'
})

export class VideoService {

  public resourceUrl = EDUPLAY_API_URL + 'video';
  public eduplayClientKey = EDUPLAY_CLIENT_KEY;
  public unbId = UNB_ID;

  constructor(private http: HttpClient) { }

  findAll(): Observable<EduplayByInstitutionResponseType> {
    let headers = new HttpHeaders({ 'clientkey': this.eduplayClientKey });
    return this.http.get<IEduplayVideosByInstitution>(`${this.resourceUrl}?institution=${this.unbId}`, { headers: headers, observe: 'response' })
  }

  // findById(id: number): Observable<unknown> {
    
  // } 

}
