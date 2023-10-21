import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from './video.service';
import { HttpResponse } from '@angular/common/http';
import {
  IVideoVersion,
  VideoVersion,
} from 'src/shared/model/video-version.model';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})
export class VideoViewerComponent implements OnInit {
  videoVersion: IVideoVersion = new VideoVersion();

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.videoService
        .findVideoVersionByVideoId(params['idVideo'])
        .subscribe((res: HttpResponse<IVideoVersion>) => {
          this.videoVersion = !!res.body ? res.body : this.videoVersion;
          console.log(this.videoVersion);
        });
    });
  }
}
