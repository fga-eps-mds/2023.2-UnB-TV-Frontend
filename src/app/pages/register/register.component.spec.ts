import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveAccountComponent } from '../active-account/active-account.component';

const mockData: any = {
  "name": "Mario",
  "email": "mario@gmail.com",
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'activateAccount', component: ActiveAccountComponent },
          ]
        )
      ],
      providers: [{ provide: AuthService, useValue: new AuthServiceMock() }, FormBuilder],
      declarations: [RegisterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
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
    const alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.register).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
  });

  it('should call alert when form is not valid', () => {
    spyOn(component, 'register').and.callThrough();
    const alertSpy = spyOn(window, 'alert');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(alertSpy).toHaveBeenCalledWith('Preencha todos os campos corretamente!');
  });

  it('should call register and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(authService, 'registerUser').and.returnValue(throwError(() => new Error('Erro')));
    component.register();
    expect(mySpy).toHaveBeenCalled();
  });

});
