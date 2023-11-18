import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';

class AuthServiceMock {
  constructor() { }
  updatePassword() {
    return of({ success: true });
  }
}

class AlertServiceMock {
  constructor() { }
  showMessage() {
    return of({ success: true });
  }
  errorMessage() {
    return of({ success: true });
  }
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ResetPasswordComponent],
      providers: [
        { provide: AlertService, useValue: new AlertServiceMock() },
        { provide: AuthService, useValue: new AuthServiceMock() },
        { provide: FormBuilder },
        MessageService
      ],
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create the userForm correctly', () => {
    fixture.detectChanges();

    expect(component.userForm).toBeTruthy();
    expect(component.userForm.controls['email']).toBeTruthy();
    expect(component.userForm.controls['code']).toBeTruthy();
    expect(component.userForm.controls['password']).toBeTruthy();
    expect(component.userForm.controls['confirmPassword']).toBeTruthy();
  });

  it('should call changePassword', () => {
    fixture.detectChanges();
    spyOn(component, 'changePassword').and.callThrough();
    spyOn(window, 'alert');
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', code: '123456', password: 'password', confirmPassword: 'password' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.changePassword).toHaveBeenCalled();
  });

  it('should show an alert on error', () => {
    const alertSpy = spyOn(alertService, 'showMessage').and.callThrough();
    spyOn(component, 'changePassword').and.callThrough();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    expect(alertSpy).toHaveBeenCalled();
  });

  it('should call changePassword and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', code: '123456', password: 'password', confirmPassword: 'password' });
    const mySpy = spyOn(authService, 'updatePassword').and.returnValue(throwError(() => new Error('Erro')));
    component.changePassword();
    expect(mySpy).toHaveBeenCalled();
  });
});
