import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { IVideo } from 'src/shared/model/video.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  unbTvVideos: IVideo[] = [];

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideosCatalog().subscribe({
      next: (videos) => {
        this.unbTvVideos = videos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  returnToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
