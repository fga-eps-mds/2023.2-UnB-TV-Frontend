import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    expect(component.userForm.valid).toBeFalse();
  });

  it('should call login method when the form is submitted', () => {
    spyOn(component, 'login');
    const form = component.userForm;
    form.setValue({ email: 'test@example.com', password: 'password' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.login).toHaveBeenCalled();
  });

  it('should call navigator method when "Esqueceu a senha?" is clicked', () => {
    spyOn(component, 'navigator');
    const forgotPasswordLink =
      fixture.nativeElement.querySelector('.text-gray-400');
    forgotPasswordLink.click();

    expect(component.navigator).toHaveBeenCalledWith('/sendCodeResetPassword');

    it('should call navigator method when "Cadastre-se" is clicked', () => {
      spyOn(component, 'navigator');
      const registerLink =
        fixture.nativeElement.querySelector('.text-blue-brand');
      registerLink.click();

      expect(component.navigator).toHaveBeenCalledWith('/register');
    });
  });
});
