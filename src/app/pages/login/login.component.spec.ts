import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from '../profile/profile.component';
import { CheckCodeRestPasswordComponent } from '../check-code-rest-password/check-code-rest-password.component';
import { RegisterComponent } from '../register/register.component';
import { of, throwError } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { CatalogComponent } from '../catalog/catalog.component';

import { HttpErrorResponse } from '@angular/common/http';
import { ActiveAccountComponent } from '../active-account/active-account.component';

const mockUserReturn = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI',
  token_type: 'bearer',
};

class AuthServiceMock {
  constructor() {}

  loginUser() {
    return of({ success: true });
  }
}

class AlertServiceMock {
  constructor() {}
  showMessage() {
    return of({ success: true });
  }
  errorMessage() {
    return of({ success: true });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'profile', component: ProfileComponent },
          {
            path: 'sendCodeResetPassword',
            component: CheckCodeRestPasswordComponent,
          },
          { path: 'register', component: RegisterComponent },
          { path: 'catalog', component: CatalogComponent },
          { path: 'activeAccount', component: ActiveAccountComponent },
        ]),
      ],
      providers: [
        FormBuilder,
        AuthService,
        AlertService,
        { provide: AlertService, useValue: new AlertServiceMock() }, // Provide the mock class
        { provide: AuthService, useValue: new AuthServiceMock() },
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    fixture.detectChanges();
    expect(component.userForm.valid).toBeFalse();
  });

  it('should call login method when the form is submitted with valid data', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'login').and.callThrough();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    tick();

    expect(component.login).toHaveBeenCalled();
  }));

  it('should call alert when form is submitted with invalid data', fakeAsync(() => {
    spyOn(component, 'login').and.callThrough();
    const alertSpy = spyOn(alertService, 'showMessage');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    tick();

    expect(alertSpy).toHaveBeenCalledWith(
      'info',
      'Alerta',
      'Preencha todos os campos corretamente!'
    );
  }));

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

  it('should call navigator method when "Login com redes sociais" is clicked', () => {
    const navigatorSpy = spyOn(component, 'navigator').and.callThrough();
    const loginSocial =
      fixture.nativeElement.querySelector('#loginSocialButton');
    loginSocial.click();

    expect(navigatorSpy).toHaveBeenCalledWith('/loginsocial');
  });

  it('should call login and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });
    const mySpy = spyOn(authService, 'loginUser').and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            error: { detail: 'A sua conta ainda não foi ativada.' },
          })
      )
    );
    spyOn(component, 'navigator').and.callThrough();
    component.login();
    expect(mySpy).toHaveBeenCalled();
    expect(component.navigator).toHaveBeenCalledWith('/activeAccount');
  });
});
