import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [
          { path: 'editUser', component: EditUserComponent },
        ]
      )],
      declarations: [ProfileComponent],
      providers: [{ provide: UserService, useValue: new UserServiceMock() }, MessageService, ConfirmationService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
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

  // it('should call navigator method when "Editar perfil" is clicked', () => {
  //   component.user = mockData;
  //   spyOn(component, 'navigatorEdit').and.callThrough();
  //   const editProfilebutton = fixture.nativeElement.querySelector('.text-white');
  //   fixture.detectChanges();
  //   // editProfilebutton.click();
  //   expect(true).toBe(true);
  // });

});
