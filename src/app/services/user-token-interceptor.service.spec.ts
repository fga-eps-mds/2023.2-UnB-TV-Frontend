import { TestBed } from '@angular/core/testing';

import { UserTokenInterceptor } from './user-token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: UserTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
