import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var Hls: any;

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent implements OnInit {
  @ViewChild('video', { static: true }) videoplayer!: ElementRef;
  liveStreamURL: string = "https://cdn.eduplay.rnp.br/route/CFwapWeR7WSI/index.m3u8?s=aHR0cHM6Ly9tZWRpYS5lZHVwbGF5.LnJucC5ici9tZWRpYS9DRndhcFdlUjdXU0kvaW5kZXgubTN1OD94PTEmbT01UUNXazRITHo3aDNlWUlGdlNKTlRn&x=1&p=0&m=8EQ5xOzxul_mqRVecMP-xw";

  constructor() { }

  ngOnInit(): void {
    this.setupVideoPlayer();
  }

  setupVideoPlayer(): void {
    const video = this.videoplayer.nativeElement;
    const hls = new Hls();
    if (Hls.isSupported()) {
      hls.loadSource(this.liveStreamURL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.liveStreamURL;
      video.addEventListener("canplay", function () {
        video.play();
      });
    }
  }

}
