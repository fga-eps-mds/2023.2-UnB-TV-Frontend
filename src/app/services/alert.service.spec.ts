import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { MessageService } from 'primeng/api';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
