import { TestBed } from '@angular/core/testing';

import { WithTokenGuard } from './with-token.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoComponent } from '../pages/video/video.component';

describe('WithTokenGuard', () => {
  let guard: WithTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'videos', component: VideoComponent }]
      )], providers: [WithTokenGuard], declarations: [VideoComponent]
    });
    guard = TestBed.inject(WithTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
