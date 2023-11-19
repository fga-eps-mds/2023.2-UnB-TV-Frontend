import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveAccountComponent } from '../active-account/active-account.component';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { DropdownModule } from 'primeng/dropdown';

const mockData: any = {
  "name": "Mario",
  "email": "mario@gmail.com",
  "connection": "ALUNO",
  "password": "123456",
  "confirmPassword": "123456",
}

const mockDataError: any = {
  "name": "Mario",
  "email": "",
  "connection": "ALUNO",
  "password": "123456",
  "confirmPassword": "123456",
}

class AuthServiceMock {
  constructor() { }
  registerUser() {
    return of({ success: true });
  }
}

class UserServiceMock {
  constructor() { }
  getVinculo() {
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let alertService: AlertService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, DropdownModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'activateAccount', component: ActiveAccountComponent },
          ]
        )
      ],
      providers: [
        { provide: UserService, useValue: new UserServiceMock() },
        { provide: AuthService, useValue: new AuthServiceMock() },
        { provide: AlertService, useValue: new AlertServiceMock() },
        FormBuilder,
      ],
      declarations: [RegisterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    fixture.detectChanges();
    expect(component.userForm).toBeTruthy();
  });

  it('should call register method when the form is submitted', () => {
    spyOn(component, 'register').and.callThrough();
    const alertSpy = spyOn(alertService, 'showMessage').and.callThrough();
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.register).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
  });

  it('should call register and return message when form is invalid', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockDataError);
    const alertSpy = spyOn(alertService, 'showMessage').and.callThrough();
    const mySpy = spyOn(authService, 'registerUser').and.returnValue(of({ success: true }));
    component.register();
    expect(alertSpy).toHaveBeenCalled();
  });

  it('should call register and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(authService, 'registerUser').and.returnValue(throwError(() => new Error('Erro')));
    component.register();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call getVinculo and return an error', () => {
    fixture.detectChanges();
    const mySpy = spyOn(userService, 'getVinculo').and.returnValue(throwError(() => new Error('Erro')));
    component.getVinculo();
    expect(mySpy).toHaveBeenCalled();
  });

});
