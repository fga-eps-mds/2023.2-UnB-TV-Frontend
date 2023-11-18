import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GridDaysComponent } from './grid-days.component';
import { Router } from '@angular/router';

describe('GridDaysComponent', () => {
  let component: GridDaysComponent;
  let fixture: ComponentFixture<GridDaysComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [
          { path: 'grid-days', component: GridDaysComponent }
        ]
      )],
      declarations: [ GridDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDaysComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call redirect when redirect is clicked', () => {
    spyOn(component, 'redirect').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#redirect'
    );
    submitButton.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/grid-days/Domingo']);
  });
});
