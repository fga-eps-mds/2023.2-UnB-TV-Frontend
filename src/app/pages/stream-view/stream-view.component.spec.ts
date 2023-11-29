import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamViewComponent } from './stream-view.component';

describe('StreamViewComponent', () => {
  let component: StreamViewComponent;
  let fixture: ComponentFixture<StreamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Weekday formatting', () => {
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
      const mockDate = new Date('2023-11-26T10:00:00.000');
      component.date = mockDate;

      expect(component.todaysDate).toBe('26/11/2023');
      expect(component.weekDay).toBe('Domingo');
    });
  });
});
