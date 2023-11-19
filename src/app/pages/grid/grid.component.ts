import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridService } from 'src/app/services/grid.service';

export interface Schedule {
  time: string;
  activity: string;
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {
  day: string = "";
  schedule: Schedule[] = [];
  loadingSchedule: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gridService: GridService,
    private router: Router
  ) {}

  ngOnInit() {
    this.day = this.route.snapshot.params['day'];
    this.getGridByDay();
  }

  getGridByDay(): void {
    this.gridService.getSchedule(this.day).subscribe({
      next: (data) => {
        this.schedule = data[this.day.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
        this.loadingSchedule = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingSchedule = false;
      }
    })
  }
  redirectBack() {
    this.router.navigate(['/grid-days/']);

  } 
}