import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VideoService } from '../../services/video.service';
import { IVideo, Video } from 'src/shared/model/video.model';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})
export class VideoViewerComponent implements OnInit {
  videoDescription: string = '';
  characterLimit = 100;
  showDescription = false;
  video: IVideo = new Video();
  idVideo!: number;
  eduplayVideoUrl = "https://eduplay.rnp.br/portal/video/embed/";

  expandDescription() {
    this.showDescription = !this.showDescription;
  }

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
  ) { }

  ngOnInit(): void {
    const iframe = document.getElementById('embeddedVideo') as HTMLIFrameElement;
    this.idVideo = this.route.snapshot.params['idVideo'];
    this.findVideoById();
    iframe.src = this.eduplayVideoUrl + this.idVideo;
  }

  findVideoById = () => {
    this.videoService.findVideoById(this.idVideo).subscribe({
      next: (data: HttpResponse<IVideo>) => {
        this.video = data.body ? data.body : this.video;
        this.videoDescription = this.video.description
          ? this.video.description
          : '';
      },
    });
  };
}
