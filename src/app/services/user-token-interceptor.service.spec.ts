import { TestBed } from '@angular/core/testing';
import { UserTokenInterceptor } from './user-token-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
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
    localStorage.setItem('token', 'testtoken');
    userService.getAllUsers().subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${userService.apiURL}/users`);
    expect(req.request.headers.has('Authorization')).toEqual(true);
  });
});
