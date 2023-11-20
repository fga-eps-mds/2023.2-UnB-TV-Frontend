import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GridComponent } from './grid.component';
import { GridService } from 'src/app/services/grid.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
class GridServiceMock {
  getSchedule() {
    return of({ success: true });
  }
}

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridService: GridService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSpinnerModule, HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'grid-days/:day', component: GridComponent }
        ]
      )],
      declarations: [GridComponent],
      providers: [{ provide: GridService, useValue: new GridServiceMock() }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    gridService = TestBed.inject(GridService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shoud call getGridByDay', () => {
    const mySpy = spyOn(component, 'getGridByDay');
    fixture.detectChanges();
    expect(mySpy).toHaveBeenCalled();
  })

  it('should call getSchedule', () => {
    const mySpy = spyOn(gridService, 'getSchedule').and.callThrough();
    component.day = 'Domingo';
    component.getGridByDay();
    fixture.detectChanges();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call getSchedule and return an error', () => {
    const mySpy = spyOn(gridService, 'getSchedule').and.returnValue(throwError(() => new Error('Erro')));
    component.getGridByDay();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call redirect when redirect is clicked', () => {
    spyOn(component, 'redirectBack').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#redirectBack'
    );
    submitButton.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/grid-days/']);
  });

});
