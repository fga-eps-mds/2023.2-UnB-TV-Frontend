import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  videoUrl!: SafeResourceUrl;
  idVideo!: number;

  expandDescription() {
    this.showDescription = !this.showDescription;
  }

  extractVideoUrl(embedCode: string): string | null {
    const regex = /<iframe.*?src=["'](.*?)["']/;
    const match = embedCode.match(regex);
    return match ? match[1] : null;
  }

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.idVideo = this.route.snapshot.params['idVideo'];
    this.findVideoById();
  }

  findVideoById = () => {
    this.videoService.findVideoById(this.idVideo).subscribe({
      next: (data: HttpResponse<IVideo>) => {
        this.video = data.body ? data.body : this.video;

        const embedCode = this.video.embed as string;
        const url = this.extractVideoUrl(embedCode);
       if (url) {
          this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        } 
        this.videoDescription = this.video.description
          ? this.video.description
          : '';
      },
    });
  };
}
