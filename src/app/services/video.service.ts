import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  EDUPLAY_API_URL,
  UNB_ID,
  VIDEOS_LIMIT,
  VIDEOS_ORDER,
} from 'src/app/app.constant';
import { IVideo } from 'src/shared/model/video.model';
import { IEduplayVideosByInstitution } from 'src/shared/model/eduplay-by-institution.model';
import { EDUPLAY_CLIENT_KEY } from '../environment/environment';

type VideoResponseType = HttpResponse<IVideo>;
type EduplayByInstitutionResponseType =
  HttpResponse<IEduplayVideosByInstitution>;

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  public resourceUrl = EDUPLAY_API_URL + 'video';
  public eduplayClientKey = EDUPLAY_CLIENT_KEY;
  public unbId = UNB_ID;
  public limit = VIDEOS_LIMIT;
  public order = VIDEOS_ORDER;
  private selectedCatalogProgram = new BehaviorSubject<IVideo[]>([]);

  constructor(private http: HttpClient) {}

  findAll(): Observable<EduplayByInstitutionResponseType> {
    let headers = new HttpHeaders({ clientkey: this.eduplayClientKey });
    return this.http.get<IEduplayVideosByInstitution>(
      `${this.resourceUrl}?institution=${this.unbId}&limit=${this.limit}&order=${this.order}`,
      { headers: headers, observe: 'response' }
    );
  }

  findVideoById(idVideo: number): Observable<VideoResponseType> {
    let headers = new HttpHeaders({ clientkey: this.eduplayClientKey });

    return this.http.get<IVideo>(`${this.resourceUrl}/${idVideo}`, {
      headers: headers,
      observe: 'response',
    });
  }

  setVideosCatalog(videos: IVideo[]) {
    this.selectedCatalogProgram.next(videos);
  }

  getVideosCatalog(): Observable<IVideo[]> {
    return this.selectedCatalogProgram.asObservable();
  }
}
