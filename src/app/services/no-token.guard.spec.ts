import { TestBed } from '@angular/core/testing';

import { NoTokenGuard } from './no-token.guard';

describe('NoTokenGuard', () => {
  let guard: NoTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
