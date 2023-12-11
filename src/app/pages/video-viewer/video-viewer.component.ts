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

  getVideoUrl(): string {
    return `${this.eduplayVideoUrl}${this.idVideo}`;
  }

  shareVideo() {
    const shareData = {
      title: this.video.title,
      text: this.video.title,
      url: window.location.href,
    };

    if (navigator.canShare()) {
      navigator.share(shareData)
        .then(() => console.log('Compartilhado com sucesso'))
        .catch((error) => console.error('Erro ao compartilhar:', error));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url)
        .then(() => console.log('URL copiada com sucesso'))
        .catch((error) => console.error('Erro ao copiar URL:', error));

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareData.title + ' ' + shareData.url)}`;
        window.location.href = whatsappUrl;
      }
    } else {
      console.warn('A API de compartilhamento não é suportada neste navegador.');
    }
  }
}
