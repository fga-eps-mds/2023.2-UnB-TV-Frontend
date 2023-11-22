import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule, HttpClientModule], providers: [UserService] });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a single user', () => {
    const userResponse: any = {
      "id": 1,
      "name": "Mario",
      "connection": "ALUNO",
      "email": "mario@gmail.com",
      "role": "USER",
      "is_active": true
    }
    service.getUser(1).subscribe(res => {
      expect(res).toEqual(userResponse);

    });
    const req = httpMock.expectOne(`${service.usersAPIURL}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(userResponse);
  });

  it('should return a list of users', async () => {
    const userResponse: any = [
      {
        "id": 1,
        "name": "Mario",
        "connection": "ALUNO",
        "email": "mario@example.com",
        "role": "USER",
        "is_active": true
      },
      {
        "id": 2,
        "name": "Luigi",
        "connection": "ALUNO",
        "email": "luigi@example.com",
        "role": "USER",
        "is_active": true
      }];
    service.getAllUsers({}).subscribe(res => {
      expect(res.body).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.usersAPIURL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(userResponse);
  }
  );

  it('should update a user', () => {
    const userResponse: any = {
      "id": 1,
      "name": "Mario",
      "connection": "ALUNO",
      "email": "mario@gmail.com",
      "role": "USER",
      "is_active": true
    }
    service.updateUser(1, { "name": "Mario", "connection": "PROFESSOR", "email": "mario@gmail.com" }).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.usersAPIURL}/users/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(userResponse);
  }
  );

  it('should delete a user', () => {
    const userResponse: any = {
      "id": 1,
      "name": "Mario",
      "connection": "ALUNO",
      "email": "mario@gmail.com",
      "role": "USER",
      "is_active": true
    }
    service.deleteUser(1).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.usersAPIURL}/users/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(userResponse);
  }
  );

  it('should update user role', () => {
    const userResponse: any = {
      "id": 1,
      "name": "Mario",
      "connection": "ALUNO",
      "email": "mario@gmail.com",
      "role": "USER",
      "is_active": true
    }
    service.updateUserRole(1).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.usersAPIURL}/users/role/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(userResponse);
  })

  afterEach(() => {
    httpMock.verify();
  }
  );

});
