import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDaysComponent } from './grid-days.component';

describe('GridDaysComponent', () => {
  let component: GridDaysComponent;
  let fixture: ComponentFixture<GridDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
