import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(
    private messageService: MessageService,
  ) { }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      key: 'myToast',
      detail: detail
    });
  }

  errorMessage(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', key: 'myToast', detail: `${message}` });
  }

  infoMessage(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', key: 'myToast', detail: `${message}` });
  }

  warnMessage(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', key: 'myToast', detail: `${message}` });
  }
}
