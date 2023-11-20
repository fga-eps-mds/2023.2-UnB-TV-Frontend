import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-days',
  templateUrl: './grid-days.component.html',
  styleUrls: ['./grid-days.component.css']
})

export class GridDaysComponent {
  days: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  constructor(
    private route: Router) { 

  }
  redirect(day: string) {
    this.route.navigate(['/grid-days/'+ day]);

  }
}


