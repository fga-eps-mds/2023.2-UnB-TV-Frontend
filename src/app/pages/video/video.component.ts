import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { IVideo } from 'src/shared/model/video.model';
import { UNB_TV_CHANNEL_ID } from 'src/app/app.constant';
import { VideosCatalog } from 'src/shared/model/catalog.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  unbTvChannelId = UNB_TV_CHANNEL_ID;
  videosEduplay: IVideo[] = [];
  unbTvVideos: IVideo[] = [];
  catalog: VideosCatalog = new VideosCatalog();

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.videoService.findAll().subscribe({
      next: (data) => {
        this.videosEduplay = data.body?.videoList ?? [];
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.filterVideosByChannel(this.videosEduplay);
        this.videosCatalog(this.unbTvVideos);
      },
    });
  }

  filterVideosByChannel(videos: IVideo[]): void {
    videos.forEach((video) => {
      const channel = video?.channels;

      if (channel)
        if (channel[0].id === this.unbTvChannelId) this.unbTvVideos.push(video);
    });
  }

  videosCatalog(videos: IVideo[]): void {
    videos.forEach((video) => {
      let keywords = video.keywords;
      if (keywords) {
        keywords = keywords.toLowerCase();
        if (keywords.includes('arte') || keywords.includes('cultura')) {
          this.catalog.artAndCulture?.push(video);
          return;
        } else if (keywords.includes('entrevista')) {
          this.catalog.interviews?.push(video);
          return;
        } else if (keywords.includes('cinema')) {
          this.catalog.cinema?.push(video);
          return;
        } else if (
          keywords.includes('documentais') ||
          keywords.includes('documentarios')
        ) {
          this.catalog.documentaries.push(video);
          return;
        } else if (
          keywords.includes('pesquisa') ||
          keywords.includes('ciência') ||
          keywords.includes('ciências')
        ) {
          this.catalog.researchAndScience?.push(video);
        } else if (keywords.includes('jornalismo')) {
          this.catalog.journalism.push(video);
          return;
        } else if (
          keywords.includes('culinária') ||
          keywords.includes('variedades')
        ) {
          this.catalog.cookingAndVarieties.push(video);
          return;
        } else if (
          keywords.includes('séries especiais') ||
          keywords.includes('eleições') ||
          keywords.includes('floresta de gente') ||
          keywords.includes('guia do calouro') ||
          keywords.includes('memórias') ||
          keywords.includes('arquitetura')
        ) {
          this.catalog.specialSeries.push(video);
          return;
        } else {
          this.catalog.unbtv.push(video);
        }
      }
    });
  }
}
