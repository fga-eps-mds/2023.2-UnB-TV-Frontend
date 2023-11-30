import { Component } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { Schedule } from 'src/shared/model/schedule.model';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
})
export class StreamViewComponent {
  date: Date = new Date();
  weekDay: string = '';
  todaysDate: string = '';
  schedules: Schedule[] = [];

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.getTodaysDateInfos();
    this.getTodaysSchedule();
  }

  getTodaysDateInfos(): void {
    const locale: string = 'pt-Br';

    this.weekDay = this.date.toLocaleDateString(locale, { weekday: 'long' });
    this.weekDay = this.capitalizeFirstLetter(this.weekDay);

    this.todaysDate = this.date.toLocaleDateString(locale);
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  formatWeekday(value: string): string {
    return value.replace('-feira', '').toUpperCase();
  }

  getTodaysSchedule(): void {
    this.gridService.getSchedule().subscribe({
      next: (data) => {
        const weekdayKey = this.formatWeekday(this.weekDay);
        this.schedules = data[weekdayKey];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
