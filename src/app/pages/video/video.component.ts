import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { IVideo } from 'src/shared/model/video.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IEduplayVideosByInstitution } from 'src/shared/model/eduplay-by-institution.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  videosEduplay: IVideo[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.findAll().subscribe(
      (res: HttpResponse<IEduplayVideosByInstitution>) => {
        this.videosEduplay = !!res.body?.videoList ? res.body.videoList : [];
        console.log('this.videosEduplay', this.videosEduplay);
      },
      (error: HttpErrorResponse) => {
        console.log('error', error.message);
      },
      () => {}
    );
  }

  onTumbnailClick(id: number): void {
  
  }
}
