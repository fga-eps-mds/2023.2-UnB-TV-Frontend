import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from '../profile/profile.component';
import { CheckCodeRestPasswordComponent } from '../check-code-rest-password/check-code-rest-password.component';
import { RegisterComponent } from '../register/register.component';
import { of, throwError } from 'rxjs';

const mockUserReturn = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI",
  "token_type": "bearer"
}

class AuthServiceMock {
  constructor() { }
  loginUser() {
    return of(mockUserReturn);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [
          { path: 'profile', component: ProfileComponent },
          { path: 'sendCodeResetPassword', component: CheckCodeRestPasswordComponent },
          { path: 'register', component: RegisterComponent }
        ]
      )],
      providers: [FormBuilder, { provide: AuthService, useValue: new AuthServiceMock() }],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    fixture.detectChanges();
    expect(component.userForm).toBeTruthy();
  });

  it('should call login method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'login').and.callThrough();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.login).toHaveBeenCalled();
  });

  it('should call alert when form is not valid', () => {
    spyOn(component, 'login').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
  });

  it('should call navigator method when "Esqueceu a senha?" is clicked', () => {
    spyOn(component, 'navigator').and.callThrough();
    const forgotPasswordLink =
      fixture.nativeElement.querySelector('.text-gray-400');
    forgotPasswordLink.click();

    expect(component.navigator).toHaveBeenCalledWith('/sendCodeResetPassword');

  });

  it('should call navigator method when "Cadastre-se" is clicked', () => {
    spyOn(component, 'navigator').and.callThrough();
    const registerLink =
      fixture.nativeElement.querySelector('.text-blue-brand');
    registerLink.click();

    expect(component.navigator).toHaveBeenCalledWith('/register');
  });

  it('should call login and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });
    const mySpy = spyOn(authService, 'loginUser').and.returnValue(throwError(() => new Error('Erro')));
    component.login();
    expect(mySpy).toHaveBeenCalled();
  });
});
