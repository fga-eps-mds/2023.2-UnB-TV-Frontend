import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  providers: [MessageService],
})
export class BackgroundComponent implements OnInit {
  items: MenuItem[] = [];
  mobileDevide: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Perfil',
        routerLink: '/profile',
      },
    ];
    this.identifiesUserDevice();
  }

  identifiesUserDevice(): void {
    if (
      RegExp(/Android/i).exec(navigator.userAgent) ||
      RegExp(/iPhone/i).exec(navigator.userAgent) ||
      RegExp(/iPad/i).exec(navigator.userAgent) ||
      RegExp(/iPod/i).exec(navigator.userAgent) ||
      RegExp(/BlackBerry/i).exec(navigator.userAgent) ||
      RegExp(/Windows Phone/i).exec(navigator.userAgent)
    ) {
      this.mobileDevide = true; // está utilizando dispositivo móvel
    } else {
      this.mobileDevide = false;
    }
  }
  getActualRoute(): string {
    return window.location.pathname;
  }
}
