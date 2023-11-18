import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveAccountComponent } from './active-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';

const mockData: any = {
  "email": "mario@gmail.com",
  "code": 123456,
}

class AuthServiceMock {
  constructor() { }
  activeAccount() {
    return of({ success: true });
  }
  resendCode() {
    return of({ success: true });
  }
}

class AlertServiceMock {
  constructor() { }
  showMessage() {
    return of({ success: true });
  }
}

describe('ActiveAccountComponent', () => {
  let component: ActiveAccountComponent;
  let fixture: ComponentFixture<ActiveAccountComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'login', component: LoginComponent },
        ]
      ), ReactiveFormsModule],
      providers: [
        { provide: AlertService, useValue: new AlertServiceMock() },
        { provide: AuthService, useValue: new AuthServiceMock() },
        FormBuilder,
        MessageService],
      declarations: [ActiveAccountComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call activeAccount method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'activeAccount').and.callThrough();
    const form = component.userForm;
    form.setValue(mockData);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.activeAccount).toHaveBeenCalled();
  });

  it('should call AlertServiceShowMessage when form is not valid', () => {
    spyOn(component, 'activeAccount').and.callThrough();
    fixture.detectChanges();
    const alertSpy = spyOn(alertService, 'showMessage').and.callThrough();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalled();
  });

  it('should call activeAccount and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(authService, 'activeAccount').and.returnValue(throwError(() => new Error('Erro')));
    component.activeAccount();
    expect(mySpy).toHaveBeenCalled();
  });

});
