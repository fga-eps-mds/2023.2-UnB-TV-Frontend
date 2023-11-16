import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  providers: [MessageService]
})
export class BackgroundComponent implements OnInit {
  isMenuOpened: boolean = false;
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile'
      }
    ]
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

}
