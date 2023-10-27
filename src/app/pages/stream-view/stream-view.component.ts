import { Component } from '@angular/core';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css']
})
export class StreamViewComponent {
  liveStreamURL: string = "https://cdn.eduplay.rnp.br/route/CFwapWeR7WSI/index.m3u8?s=aHR0cHM6Ly9tZWRpYS5lZHVwbGF5.LnJucC5ici9tZWRpYS9DRndhcFdlUjdXU0kvaW5kZXgubTN1OD94PTEmbT01UUNXazRITHo3aDNlWUlGdlNKTlRn&x=1&p=0&m=8EQ5xOzxul_mqRVecMP-xw";
}
