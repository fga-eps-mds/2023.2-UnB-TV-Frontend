import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
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
import { MessageService } from 'primeng/api';
import { VideoComponent } from '../video/video.component';

const mockUserReturn = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI",
  "token_type": "bearer"
};

class AuthServiceMock {
  constructor() { }

  loginUser() {
    return throwError({ error: { message: 'Erro' } });
  }
}

class MessageServiceMock {
  messages: any[] = [];

  add(message: any) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let alertService: AlertService;
  let messageService: MessageServiceMock; // Use the mock class

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes(
        [
          { path: 'profile', component: ProfileComponent },
          { path: 'sendCodeResetPassword', component: CheckCodeRestPasswordComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'videos', component: VideoComponent }
        ]
      )],
      providers: [
        FormBuilder,
        AuthService,
        AlertService,
        { provide: MessageService, useClass: MessageServiceMock }, // Provide the mock class
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    messageService = TestBed.inject(MessageService) as unknown as MessageServiceMock; // Inject the mock class
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

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    tick();

    expect(component.login).toHaveBeenCalled();
  }));

  it('should call alert when form is submitted with invalid data', fakeAsync(() => {
    spyOn(component, 'login').and.callThrough();
    const alertSpy = spyOn(alertService, 'showMessage');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    tick();

    expect(alertSpy).toHaveBeenCalledWith('info', 'Alerta', 'Preencha todos os campos corretamente!');
  }));

  it('should call navigator method when "Esqueceu a senha?" is clicked', () => {
    spyOn(component, 'navigator').and.callThrough();
    const forgotPasswordLink = fixture.nativeElement.querySelector('.text-gray-400');
    forgotPasswordLink.click();

    expect(component.navigator).toHaveBeenCalledWith('/sendCodeResetPassword');
  });

  it('should call navigator method when "Cadastre-se" is clicked', () => {
    spyOn(component, 'navigator').and.callThrough();
    const registerLink = fixture.nativeElement.querySelector('.text-blue-brand');
    registerLink.click();

    expect(component.navigator).toHaveBeenCalledWith('/register');
  });

  it('should call login and handle error', fakeAsync(() => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });

    const mySpy = spyOn(authService, 'loginUser').and.returnValue(throwError({ error: { message: 'Erro' } }));

    component.login();
    tick();

    expect(mySpy).toHaveBeenCalled();
  }));
});
