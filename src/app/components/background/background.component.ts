import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  providers: [MessageService]
})
export class BackgroundComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.items = [
      {
        label: 'Perfil',
        routerLink: '/profile'
      }
    ]
  }

}
