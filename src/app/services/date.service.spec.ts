import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Getting the current date', () => {
    it('should return a valid current date', () => {
      const currentDate = service.getCurrentDate();

      expect(currentDate instanceof Date).toBe(true);
    });
  });

  describe('Getting the current time', () => {
    it('should return a valid current time in "HH:mm" format', () => {
      const currentTime = service.getCurrentTime();

      const timeRegex = /^\d{2}:\d{2}$/;
      expect(timeRegex.test(currentTime)).toBe(true);
    });
  });

  describe('Formatting the time string', () => {
    it('should pad zero for single-digit hours', () => {
      const paddedValue = service.padZero(5);

      expect(paddedValue).toBe('05');
      expect(typeof paddedValue).toBe('string');
    });

    it('should not pad zero for double-digit hours', () => {
      const paddedValue = service.padZero(15);

      expect(paddedValue).toBe('15');
      expect(typeof paddedValue).toBe('string');
    });
  });

  describe('Converting a time string to Date', () => {
    it('should convert time string to a valid Date object', () => {
      const timeString = '12:30';
      const date = service.convertTimeStringToDate(timeString);

      expect(date instanceof Date).toBe(true);
      expect(date.getHours()).toBe(12);
      expect(date.getMinutes()).toBe(30);
      expect(date.getSeconds()).toBe(0);
    });
  });
});
