import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'loginsocial', component: LoginComponent }]
      )], 
      providers: [AuthGuard], 
      declarations: [LoginComponent]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for a logged in user', () => {
    localStorage.setItem('token', 'testtoken');
    expect(guard.canActivate()).toBe(true);
  });

  it('should navigate to loginsocial for a logged out user', () => {
    localStorage.removeItem('token');
    const navigateSpy = spyOn(router, 'navigate');
    guard.canActivate();
    expect(navigateSpy).toHaveBeenCalledWith(['/loginsocial']);
  });
});
