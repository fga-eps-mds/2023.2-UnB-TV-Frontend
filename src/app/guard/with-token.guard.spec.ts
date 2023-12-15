import { TestBed } from '@angular/core/testing';

import { WithTokenGuard } from './with-token.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoComponent } from '../pages/video/video.component';

describe('WithTokenGuard', () => {
  let guard: WithTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'catalog', component: VideoComponent },
        ]),
      ],
      providers: [WithTokenGuard],
      declarations: [VideoComponent],
    });
    guard = TestBed.inject(WithTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false for a logged in user', () => {
    localStorage.setItem('token', 'testtoken');
    expect(guard.canActivate()).toBe(false);
  });

  it('should return true for a logged out user', () => {
    localStorage.removeItem('token');
    expect(guard.canActivate()).toBe(true);
  });
});
