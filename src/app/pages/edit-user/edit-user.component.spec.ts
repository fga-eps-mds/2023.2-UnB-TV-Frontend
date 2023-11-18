import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { AlertService } from 'src/app/services/alert.service';

const mockData: any = {
  "name": "Mario",
  "email": "mario@gmail.com",
  "connection": "ALUNO",
}

class UserServiceMock {
  constructor() { }
  updateUser() {
    return of({ success: true });
  }
  getUser() {
    return of({ success: true });
  }
  getVinculo() {
    return of({ success: true });
  }
}

class AlertServiceMock {
  errorMessage(){ 
  }
  showMessage() {
  }
}

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let userService: UserService;
  let alertService: AlertService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'profile', component: ProfileComponent },
        ]
      ), ReactiveFormsModule, DropdownModule],
      declarations: [EditUserComponent],
      providers: [{ provide: UserService, useValue: new UserServiceMock() }, { provide: AlertService, useValue: new AlertServiceMock() }, FormBuilder, MessageService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateUser method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'updateUser').and.callThrough();
    const form = component.userForm;
    form.setValue(mockData);
    component.userId = mockData.id;

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.updateUser).toHaveBeenCalled();
  });

  it('should call alert when form is not valid1', () => {
    fixture.detectChanges();
    const mySpy = spyOn(alertService, 'showMessage');
    component.updateUser();
    expect(mySpy).toHaveBeenCalledWith('info',
      'Alerta',
      'Preencha todos os campos corretamente!');
  });

  it('should call updateUser and return an error', () => {
    fixture.detectChanges();
    const form = component.userForm;
    form.setValue(mockData);
    const mySpy = spyOn(userService, 'updateUser').and.returnValue(throwError(() => new Error('Erro')));
    component.updateUser();
    expect(mySpy).toHaveBeenCalled();
  });

});
