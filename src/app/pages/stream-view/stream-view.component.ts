import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { GridService } from 'src/app/services/grid.service';
import { Schedule } from 'src/shared/model/schedule.model';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
})
export class StreamViewComponent {
  date!: Date;
  weekDay: string = '';
  todaysDate: string = '';
  currentTime: string = '';
  currentProgram: boolean = false;
  highlightedIndex: number | null = null;
  schedules: Schedule[] = [];

  constructor(
    private gridService: GridService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.date = this.dateService.getCurrentDate();
    this.currentTime = this.dateService.getCurrentTime();
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
        this.schedules = data[weekdayKey] || [];
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.checkCurrentProgram(this.currentTime, this.schedules);
      },
    });
  }

  checkCurrentProgram(currentTime: string, schedules: Schedule[]): void {
    const currentTimeObj =
      this.dateService.convertTimeStringToDate(currentTime);

    for (let i = 1; i < schedules.length; i++) {
      const previousTimeObj = this.dateService.convertTimeStringToDate(
        schedules[i - 1].time as string
      );
      const nextTimeObj = this.dateService.convertTimeStringToDate(
        schedules[i].time as string
      );

      if (currentTimeObj >= previousTimeObj && currentTimeObj < nextTimeObj) {
        this.highlightedIndex = i - 1;
        this.currentProgram = true;
      }
    }
  }
}
