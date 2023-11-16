import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc2NhbmRyYWRleDFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNzAwMTAwMDQxfQ.aDhw1xkK55bhUQCm6tSxX4LYxq8hP_b3T8gYUS449F8"
  let userToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc2NhbmRyYWRleDFAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJleHAiOjE3NjAwMTIxNTB9.dtKlfCqAuwaIUygAZnylw1nc1IXuJAnY8R_H1pGPlv0";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'login', component: LoginComponent }]
      )], 
      providers: [AdminGuard], 
      declarations: [LoginComponent]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false for a user with role ADMIN', () => {
    localStorage.setItem('token', adminToken);
    expect(guard.canActivate()).toBe(true);
  }
  );

  it('should return false for a user with role USER', () => {
    localStorage.setItem('token', userToken);
    expect(guard.canActivate()).toBe(false);
  }
  );

});
