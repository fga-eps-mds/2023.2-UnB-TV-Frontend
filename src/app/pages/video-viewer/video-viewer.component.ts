import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import {
  IVideoVersion,
  VideoVersion,
} from 'src/shared/model/video-version.model';
import {
  IVideoDetails,
  VideoDetails,
} from 'src/shared/model/video-details.model';
import { VideoService } from '../../services/video.service';
import { IVideo, Video } from 'src/shared/model/video.model';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})
export class VideoViewerComponent implements OnInit {
  videoVersion: IVideoVersion = new VideoVersion();
  videoMP4: IVideoDetails = new VideoDetails();
  videoTitle: string = '';
  videoDescription: string = '';
  limiteCaracteres = 100;
  mostrarCompleta = false;
  video: IVideo = new Video();

  expandirDescricao() {
    this.mostrarCompleta = !this.mostrarCompleta;
  }

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: number }) => {
      this.videoService
        .findVideoVersionByVideoId(params['idVideo'])
        .subscribe((res: HttpResponse<IVideoVersion>) => {
          this.videoVersion = !!res.body ? res.body : this.videoVersion;

          const videoMP4Found = this.videoVersion.videoVersionList?.find(
            (video) => video.fileFormat === 'MP4'
          );

          this.videoMP4 = !!videoMP4Found ? videoMP4Found : this.videoMP4;

          if (params['idVideo']) {
            this.videoService.findDescriptionByVideoId(params['idVideo']).subscribe(
              (descriptionRes: HttpResponse<{description: string}>) => {
                this.videoDescription = descriptionRes.body?.description || '';
              }
            );
          }
        });
    });

    this.route.params.subscribe((params: { [x: string]: number }) => {
      this.videoService
        .findVideoById(params['idVideo'])
        .subscribe((res: HttpResponse<IVideo>) => {
          this.video = !!res?.body ? res.body : this.video;
        });
    });

    this.route.queryParams.subscribe((params: { [x: string]: string }) => {
      this.videoTitle = params['title'];
    });
  }
}
