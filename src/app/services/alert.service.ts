import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IError } from 'src/shared/model/http-error.model';


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

  // succesMessage(message: string) {
  //   this.messageService.add({ severity: 'success', summary: 'Sucesso', key: 'myToast', detail: `${message}` });
  // }

  errorMessage(error: IError) {
    this.messageService.add({ severity: 'error', summary: 'Error', key: 'myToast', detail: `${error.detail}` });
  }

  // infoMessage(message: string) {
  //   this.messageService.add({ severity: 'info', summary: 'Info', key: 'myToast', detail: `${message}` });
  // }

  // warnMessage(message: string) {
  //   this.messageService.add({ severity: 'warn', summary: 'Warn', key: 'myToast', detail: `${message}` });
  // }
}
