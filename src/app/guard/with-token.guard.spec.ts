import { TestBed } from '@angular/core/testing';

import { WithTokenGuard } from './with-token.guard';

describe('WithTokenGuard', () => {
  let guard: WithTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WithTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
