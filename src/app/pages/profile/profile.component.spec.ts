import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

const mockData: any = {
  "id": 1,
  "name": "Mario",
  "connection": "ALUNO",
  "email": "mario@gmail.com",
  "role": "USER",
  "is_active": true
}

class UserServiceMock {
  constructor() { }
  getUser() {
    return of(mockData);
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

class AuthServiceMock {
  logout() { }
  refreshToken() { }
  showRenewTokenDialog() { }
}

class ConfirmationServiceMock {
  confirm() { }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;
  let alertService: AlertService;
  let authService: AuthService;
  let confirmationService: ConfirmationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'editUser', component: EditUserComponent },
        ]
      )],
      declarations: [ProfileComponent],
      providers: [
        { provide: AlertService, useValue: new AlertServiceMock() },
        { provide: UserService, useValue: new UserServiceMock() },
        { provide: AuthService, useValue: new AuthServiceMock() },
        { provide: ConfirmationService, useValue: new ConfirmationServiceMock() },
        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    alertService = TestBed.inject(AlertService);
    authService = TestBed.inject(AuthService);
    confirmationService = TestBed.inject(ConfirmationService);
    router = TestBed.inject(Router);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
  });

  it('should create', () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI')

    component.user = mockData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getUser', () => {
    const mySpy = spyOn(userService, 'getUser').and.callThrough();
    component.getUser();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call getUser and return an error', () => {
    const mySpy = spyOn(userService, 'getUser').and.returnValue(throwError(() => new Error('Erro')));
    component.getUser();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call confirm of confirmationService when logout is clicked', () => {
    spyOn(component, 'logoutUser').and.callThrough();
    const mySpy = spyOn(confirmationService, 'confirm');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#logout'
    );
    submitButton.click();

    expect(mySpy).toHaveBeenCalled();
  });

  it('should call confirm of confirmationService when deleteUser is clicked', () => {
    spyOn(component, 'deleteUser').and.callThrough();
    const mySpy = spyOn(confirmationService, 'confirm');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#deleteUser'
    );
    submitButton.click();

    expect(mySpy).toHaveBeenCalled();
  });

  it('should call refreshToken and set token in localStorage', () => {
    spyOn(authService, 'refreshToken').and.returnValue(of({ access_token: 'new_access_token' }));
  
    component.renewToken();
  
    expect(authService.refreshToken).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toEqual('new_access_token');
  });

  it('should handle error when renewing token', () => {
    spyOn(authService, 'refreshToken').and.returnValue(throwError('error'));
    spyOn(console, 'error');
  
    component.renewToken();
  
    expect(authService.refreshToken).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Failed to refresh token:', 'error');
  });
  it('should show renew token dialog', () => {
    const confirmSpy = spyOn(confirmationService, 'confirm').and.callFake((params: any) => {
      params.accept();
      params.reject();
  
      // Return a mock ConfirmationService instance
      return {} as ConfirmationService;
    });
    const renewTokenSpy = spyOn(component, 'renewToken');
    const logoutSpy = spyOn(authService, 'logout');
  
    component.showRenewTokenDialog();
  
    expect(confirmSpy).toHaveBeenCalledWith({
      message: 'Deseja se manter logado?',
      header: 'Confirmação',
      key: 'myDialog',
      icon: 'pi pi-exclamation-triangle',
      accept: jasmine.any(Function),
      reject: jasmine.any(Function),
    });
    expect(renewTokenSpy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should call navigatorEdit when editUser is clicked', () => {
    spyOn(component, 'navigatorEdit').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#editUser'
    );
    submitButton.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/editUser/1']);
  });


});
