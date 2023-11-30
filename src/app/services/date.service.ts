import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getCurrentDate(): Date {
    return new Date();
  }

  getCurrentTime(): string {
    const currentDate = this.getCurrentDate();
    const hours = this.padZero(currentDate.getHours());
    const minutes = this.padZero(currentDate.getMinutes());
    return `${hours}:${minutes}`;
  }

  // garantir que os minutos e horas sejam sempre representados com dois dígitos
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
