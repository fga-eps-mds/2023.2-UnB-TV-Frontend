import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['updatePassword']);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: FormBuilder, useValue: formBuilder },
      ],
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create the userForm correctly', () => {
    component.ngOnInit();

    expect(component.userForm).toBeTruthy();
    expect(component.userForm.controls['email']).toBeTruthy();
    expect(component.userForm.controls['code']).toBeTruthy();
    expect(component.userForm.controls['password']).toBeTruthy();
    expect(component.userForm.controls['confirmPassword']).toBeTruthy();
  });

  it('should call authService.updatePassword and navigate on success', () => {
    const response = { /* mock your response here */ };
    authService.updatePassword.and.callFake(() => of(response));
    const navigateSpy = spyOn(component, 'navigator');

    component.changePassword();

    expect(authService.updatePassword).toHaveBeenCalledWith(component.userForm.value);
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('should show an alert on error', () => {
    authService.updatePassword.and.callFake(() => throwError('Error'));
    const consoleErrorSpy = spyOn(console, 'error');
    const alertSpy = spyOn(window, 'alert');

    component.changePassword();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
  });
});
