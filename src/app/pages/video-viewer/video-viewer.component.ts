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


@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})

export class VideoViewerComponent implements OnInit {
  videoVersion!: IVideoVersion;
  videoMP4: IVideoDetails = new VideoDetails();
  videoTitle: string = '';
  idVideo!: number;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
  ) { }

  ngOnInit(): void {
    this.idVideo = this.route.snapshot.params['idVideo'];
    this.findVideo();
    this.videoTitle = this.route.snapshot.queryParams['title'];

  }

  findVideo = () => {
    this.videoService.findVideoVersionByVideoId(this.idVideo)
      .subscribe({
        next: (data: HttpResponse<IVideoVersion>) => {
          this.videoVersion = data.body ? data.body : this.videoVersion;
          const videoMP4Found = this.videoVersion.videoVersionList?.find(
            (video) => video.fileFormat === 'MP4'
          );

          this.videoMP4 = !!videoMP4Found ? videoMP4Found : this.videoMP4;
        }
      });
  }
}
