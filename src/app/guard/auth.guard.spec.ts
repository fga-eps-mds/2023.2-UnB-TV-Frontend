import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../pages/login/login.component';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'login', component: LoginComponent }]
      )], providers: [AuthGuard], declarations: [LoginComponent]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for a logged in user', () => {
    localStorage.setItem('token', 'testtoken');
    expect(guard.canActivate()).toBe(true);
  }
  );

  it('should return false for a logged out user', () => {
    localStorage.removeItem('token');
    expect(guard.canActivate()).toBe(false);
  }
  );

});
