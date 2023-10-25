import { environment } from './../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EDUPLAY_API_URL, UNB_ID } from 'src/app/app.constant';
import { IVideo } from 'src/shared/model/video.model';
import { IEduplayVideosByInstitution } from 'src/shared/model/eduplay-by-institution.model';
import { IVideoVersion } from 'src/shared/model/video-version.model';

type VideoResponseType = HttpResponse<IVideo>;
type VideoArrayResponseType = HttpResponse<IVideo[]>;
type EduplayByInstitutionResponseType =
  HttpResponse<IEduplayVideosByInstitution>;
type VideoVersionResponseType = HttpResponse<IVideoVersion>;

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public resourceUrl = EDUPLAY_API_URL + 'video';
  public eduplayClientKey = environment.EDUPLAY_CLIENT_KEY;
  public unbId = UNB_ID;

  constructor(private http: HttpClient) {}

  findAll(): Observable<EduplayByInstitutionResponseType> {
    let headers = new HttpHeaders({ clientkey: this.eduplayClientKey });
    return this.http.get<IEduplayVideosByInstitution>(
      `${this.resourceUrl}?institution=${this.unbId}`,
      { headers: headers, observe: 'response' }
    );
  }

  findVideoVersionByVideoId(
    idVideo: number
  ): Observable<VideoVersionResponseType> {
    let headers = new HttpHeaders({ clientkey: this.eduplayClientKey });

    return this.http.get<IVideoVersion>(
      `${this.resourceUrl}/versions/${idVideo}`,
      { headers: headers, observe: 'response' }
    );
  }
}
