import { Component } from '@angular/core';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
})
export class StreamViewComponent {
  date: Date = new Date();
  weekDay: string = '';
  todaysDate: string = '';

  ngOnInit(): void {
    this.getTodaysDateInfos();
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
}
