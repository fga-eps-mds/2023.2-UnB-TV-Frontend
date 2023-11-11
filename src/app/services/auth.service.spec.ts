import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [AuthService] });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const userResponse: any = {
      "name": "Mario",
      "connection": "ALUNO",
      "email": "mario@gmail.com",
      "password": "123456",
    }
    service.registerUser(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should login a user', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
      "password": "123456",
    }

    service.loginUser(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should activate a user account', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
      "code": "901472",
    }
    service.activeAccount(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/activate-account`);
    expect(req.request.method).toBe('PATCH');
    req.flush(userResponse);
  });

  it('should resend a code', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
    }
    service.resendCode(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/resend-code`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should send an email to reset password', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
    }
    service.sendEmailPassword(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/reset-password/request`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should verify code to reset password', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
      "code": "901472",
    }
    service.verifyCodePassword(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/reset-password/verify`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should update password', () => {
    const userResponse: any = {
      "email": "mario@gmail.com",
      "password": "123456",
      "code": "901472",
    }
    service.updatePassword(userResponse).subscribe(res => {
      expect(res).toEqual(userResponse);
    });
    const req = httpMock.expectOne(`${service.apiURL}/auth/reset-password/change`);
    expect(req.request.method).toBe('PATCH');
    req.flush(userResponse);
  });

  it('should logout', () => {
    localStorage.setItem('token', 'testtoken');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

});
