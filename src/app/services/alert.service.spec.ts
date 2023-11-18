import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MessageServiceMock {
  constructor() { }
  add() {
    return of({ success: true });
  }
}

describe('AlertService', () => {
  let service: AlertService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: new MessageServiceMock() }],
    });
    service = TestBed.inject(AlertService);
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call errorMessage', () => {
    const myspy = spyOn(messageService, 'add');
    service.errorMessage({ detail: 'error' });
    expect(myspy).toHaveBeenCalled();
  });
});
