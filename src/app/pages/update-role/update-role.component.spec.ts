import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { UpdateRoleComponent } from './update-role.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockData = [
  {
    "connection": "PROFESSOR",
    "id": 1,
    "name": "Luisa",
    "email": "email1@email.com",
    "role": "USER",
    "is_active": null,
  },
  {
    "connection": "ESTUDANTE",
    "id": 2,
    "name": "Renato",
    "email": "email2@email.com",
    "role": "ADMIN",
    "is_active": true,
  },
  {
    "connection": "SERVIDOR",
    "id": 3,
    "name": "Paolla",
    "email": "email3@email.com",
    "role": "USER",
    "is_active": true,
  }
]

class UserServiceMock {
  constructor() { }
  getAllUsers() {
    return of(mockData);
  }
  updateUserRole() {
    return of({});
  }
}

describe('UpdateRoleComponent', () => {
  let component: UpdateRoleComponent;
  let fixture: ComponentFixture<UpdateRoleComponent>;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRoleComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, FormsModule, BrowserAnimationsModule],
      providers: [{ provide: UserService, useValue: new UserServiceMock() }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateRoleComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    let adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc2NhbmRyYWRleDFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzAwMTAwMDQxfQ.aDhw1xkK55bhUQCm6tSxX4LYxq8hP_b3T8gYUS449F8"
    localStorage.setItem("token", adminToken)

    component.users = mockData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get all users', () => {
    const mySpy = spyOn(userService, 'getAllUsers').and.callThrough();
    component.getAllUsers();
    expect(mySpy).toHaveBeenCalled();
  });


  it('should get all users and data headers is null', () => {
    const mySpy = spyOn(userService, 'getAllUsers').and.returnValue(of({ headers: null, body: [] }));
    component.getAllUsers();
    expect(mySpy).toHaveBeenCalled();
    expect(component.users).toEqual([]);
  });



  it('should get all users and return error', () => {
    const mySpy = spyOn(userService, 'getAllUsers').and.returnValue(throwError(() => new Error('Erro')));
    component.getAllUsers();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should update pageSize and pageIndex onPaginateChange', () => {
    const event: PageEvent = {
      length: 50,
      pageIndex: 1,
      pageSize: 10,
      previousPageIndex: 0
    };

    component.onPaginateChange(event);

    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.pageIndex).toEqual(event.pageIndex);
  });

  it('should filter users from get users', () => {
    const mySpy = spyOn(userService, 'getAllUsers').and.callThrough();
    component.filterUser();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should update user role', () => {
    const mySpy = spyOn(userService, 'updateUserRole').and.callThrough();
    component.updateUserRole(1);
    expect(mySpy).toHaveBeenCalled();
  });

  it('should update user role and return error', () => {
    const mySpy = spyOn(userService, 'updateUserRole').and.returnValue(throwError(() => new Error('Erro')));
    component.updateUserRole(1);
    expect(mySpy).toHaveBeenCalled();
  });


});
