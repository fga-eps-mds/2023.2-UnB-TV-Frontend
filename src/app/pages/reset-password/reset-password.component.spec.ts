import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class AuthServiceMock {
  constructor() { }
  updatePassword() {
    return of({ success: true });
  }
}


describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ResetPasswordComponent],
      providers: [
        { provide: AuthService, useValue: new AuthServiceMock() },
        { provide: FormBuilder },
      ],
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    authService = TestBed.inject(AuthService);
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
    const alertSpy = spyOn(window, 'alert');
    spyOn(component, 'changePassword').and.callThrough();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
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
