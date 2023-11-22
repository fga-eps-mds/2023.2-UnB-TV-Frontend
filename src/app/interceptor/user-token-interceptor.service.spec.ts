import { TestBed } from '@angular/core/testing';
import { UserTokenInterceptor } from './user-token-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


describe('TokenInterceptorService', () => {
  let service: UserTokenInterceptor;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: HTTP_INTERCEPTORS, useClass: UserTokenInterceptor, multi: true }],
    });
    service = TestBed.inject(UserTokenInterceptor);
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add header Authorization to request', () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2FvMTV2aWN0b3IwOEBnbWFpbC5jb20iLCJleHAiOjE2OTkzMTI5MzV9.1B9qBJt8rErwBKyD5JCdsPozsw86oQ38tdfDuMM2HFI');
    userService.getAllUsers({}).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${userService.usersAPIURL}/users`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
  });
});
