import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckCodeRestPasswordComponent } from './check-code-rest-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

const mockData: any = {
  "email": "mario@gmail.com",
  "code": 123456,
}

class AuthServiceMock {
  constructor() { }
  sendEmailPassword() {
    return of({ success: true });
  }
  verifyCodePassword() {
    return of({ success: true });
  }
}

describe('CheckCodeRestPasswordComponent', () => {
  let component: CheckCodeRestPasswordComponent;
  let fixture: ComponentFixture<CheckCodeRestPasswordComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'changePassword', component: ResetPasswordComponent },
        ]
      ), ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: new AuthServiceMock() }, FormBuilder],
      declarations: [CheckCodeRestPasswordComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckCodeRestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendEmail method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'sendEmail').and.callThrough();
    const form = component.userForm;
    form.setValue(mockData);

    const submitButton = fixture.nativeElement.querySelector(
      '#sendEmail'
    );
    submitButton.click();

    expect(component.sendEmail).toHaveBeenCalled();
  });

  it('should call alert when form is not valid', () => {
    fixture.detectChanges();
    spyOn(component, 'sendEmail').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    const form = component.userForm;
    form.setValue({ "email": '', code: '' });

    const submitButton = fixture.nativeElement.querySelector(
      '#sendEmail'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
  });

  it('should call sendEmail and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(authService, 'sendEmailPassword').and.returnValue(throwError(() => new Error('Erro')));
    component.sendEmail();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call checkCode method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'checkCode').and.callThrough();
    const form = component.userForm;
    form.setValue(mockData);
    component.activeCode = true;
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '#checkCode'
    );
    submitButton.click();

    expect(component.checkCode).toHaveBeenCalled();
  });

  it('should call alert when form is not valid', () => {
    fixture.detectChanges();
    spyOn(component, 'checkCode').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    component.activeCode = true;
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      '#checkCode'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
  });

  it('should call checkCode and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(authService, 'verifyCodePassword').and.returnValue(throwError(() => new Error('Erro')));
    component.checkCode();
    expect(mySpy).toHaveBeenCalled();
  });

});
