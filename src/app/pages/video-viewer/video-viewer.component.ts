import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { VideoService } from '../../services/video.service';
import { IVideo, Video } from 'src/shared/model/video.model';

@Component({
  selector: 'app-video-viewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.css'],
})
export class VideoViewerComponent implements OnInit {
  videoDescription: string = '';
  limiteCaracteres = 100;
  mostrarCompleta = false;
  video: IVideo = new Video();
  videoUrl!: SafeHtml;

  expandirDescricao() {
    this.mostrarCompleta = !this.mostrarCompleta;
  }

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: number }) => {
      this.videoService
        .findVideoById(params['idVideo'])
        .subscribe((res: HttpResponse<IVideo>) => {
          this.video = !!res?.body ? res.body : this.video;

          this.videoUrl = this.domSanitizer.bypassSecurityTrustHtml(
            this.video.embed as string
          );
          this.videoDescription = this.video.description
            ? this.video.description
            : '';
        });
    });
  }
}
