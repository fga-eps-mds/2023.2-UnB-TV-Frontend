import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IVideoVersion,
  VideoVersion,
} from 'src/shared/model/video-version.model';
import {
  IVideoDetails,
  VideoDetails,
} from 'src/shared/model/video-details.model';
import { VideoService } from './video.service';
@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})
export class VideoViewerComponent implements OnInit {
  videoVersion: IVideoVersion = new VideoVersion();
  videoMP4: IVideoDetails = new VideoDetails();
  videoUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.videoService
        .findVideoVersionByVideoId(params['idVideo'])
        .subscribe((res: HttpResponse<IVideoVersion>) => {
          this.videoVersion = !!res.body ? res.body : this.videoVersion;

          const videoMP4Found = this.videoVersion.videoVersionList?.find(
            (video) => video.fileFormat === 'MP4'
          );

          if (!!videoMP4Found) {
            this.videoMP4 = videoMP4Found;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.videoMP4.url as string
            );
          }
        });
    });
  }
}
