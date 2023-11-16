import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundComponent } from './background.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackgroundComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isMenuOpened to false', () => {
    expect(component.isMenuOpened).toBe(false);
  });

  it('should toggle isMenuOpened when toggleMenu is called', () => {
    expect(component.isMenuOpened).toBe(false);

    component.toggleMenu();

    expect(component.isMenuOpened).toBe(true);

    component.toggleMenu();

    expect(component.isMenuOpened).toBe(false);
  });
});
