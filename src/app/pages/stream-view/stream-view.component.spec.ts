import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StreamViewComponent } from './stream-view.component';
import { GridService } from 'src/app/services/grid.service';
import { Schedule } from 'src/shared/model/schedule.model';
import { DateService } from 'src/app/services/date.service';

const mockWeekday = 'QUINTA';
const mockSchedules: Schedule[] = [
  {
    time: '08:00',
    activity: 'ZAPPING',
  },
  {
    time: '08:40',
    activity: 'INTERPROGRAMAS',
  },
  {
    time: '09:00',
    activity: 'UnBTV ENTREVISTA',
  },
  {
    time: '09:30',
    activity: 'INTERPROGRAMAS',
  },
  {
    time: '10:00',
    activity: 'EXCLUSIVA',
  },
  {
    time: '10:30',
    activity: 'ALÉM DO LIXO',
  },
  {
    time: '11:00',
    activity: 'VISCERAL BRASIL',
  },
  {
    time: '11:30',
    activity: 'CANAL SAÚDE',
  },
];
const mockGrid = { mockWeekday: mockSchedules };

class GridServiceMock {
  getSchedule() {
    return of(mockGrid);
  }
}

const mockDate = new Date('2023-11-26T10:00:00.000');
class DateServiceMock {
  getCurrentDate(): Date {
    return mockDate;
  }
}

describe('StreamViewComponent', () => {
  let component: StreamViewComponent;
  let fixture: ComponentFixture<StreamViewComponent>;
  let gridService: GridService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamViewComponent],
      providers: [
        { provide: GridService, useValue: new GridServiceMock() },
        { provide: DateService, useValue: new DateServiceMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamViewComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Capitalizing the first letter', () => {
    it('should capitalize the first letter', () => {
      const mockString = 'test';

      const result = component.capitalizeFirstLetter(mockString);

      expect(result).toBe('Test');
    });

    it('should keep the first letter capitalized', () => {
      const mockString = 'Test';

      const result = component.capitalizeFirstLetter(mockString);

      expect(result).toBe('Test');
    });

    it('should return an empty string given an empty input', () => {
      const mockString = '';

      const result = component.capitalizeFirstLetter(mockString);

      expect(result).toBe('');
    });
  });

  describe('Getting date and time information ', () => {
    it('should get the day and weekday', () => {
      expect(component.todaysDate).toBe('26/11/2023');
      expect(component.weekDay).toBe('Domingo');
    });
  });

  describe('Formatting weekday', () => {
    it('should remove "-feira" and convert to uppercase', () => {
      const weekday = 'Quinta-feira';

      const result = component.formatWeekday(weekday);

      expect(result).toBe('QUINTA');
      expect(result).not.toBe('Quinta-feira');
    });

    it('should remain unchanged when there is no "-feira"', () => {
      const weekday = 'Domingo';

      const result = component.formatWeekday(weekday);

      expect(result).toBe('DOMINGO');
      expect(result).not.toBe('Domingo');
    });

    it('should remain unchanged when the string is empty', () => {
      const result = component.formatWeekday('');
      expect(result).toBe('');
    });
  });

  describe("Getting today's schedules", () => {
    it("should call getTodaysSchedule and return today's schedule", () => {
      const mySpy = spyOn(gridService, 'getSchedule').and.callThrough();
      component.getTodaysSchedule();
      expect(mySpy).toHaveBeenCalled();
    });

    it('should call getTodaysSchedule and return an error', () => {
      const mySpy = spyOn(gridService, 'getSchedule').and.returnValue(
        throwError(() => new Error('Erro'))
      );
      component.getTodaysSchedule();
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
