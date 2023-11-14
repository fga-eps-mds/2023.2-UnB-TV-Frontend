import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { EmailData } from 'src/shared/model/email.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-suggest-agenda',
  templateUrl: './suggest-agenda.component.html',
  styleUrls: ['./suggest-agenda.component.css']
})
export class SuggestAgendaComponent implements OnInit {

  suggestAgendaForm!: FormGroup;
  isDescricaoFilled = false;
  isResponsavelFilled = false;
  isTelefoneFilled = false;
  isSendingEmail = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.suggestAgendaForm = this.fb.group({
      tema: [''],
      descricao: ['', [Validators.required]],
      quando: [''],
      local: [''],
      responsavel: ['', [Validators.required]],
      telefoneResponsavel: ['', [Validators.required]],
      emailContato: [''],
    },
    );
  }

  sendSuggestAgenda(): void {
    if (this.suggestAgendaForm.valid) {
      const emailData = new EmailData();
      emailData.tema = this.suggestAgendaForm.value.tema;
      emailData.descricao = this.suggestAgendaForm.value.descricao;
      emailData.local = this.suggestAgendaForm.value.local;
      emailData.quando = this.suggestAgendaForm.value.quando;
      emailData.responsavel = this.suggestAgendaForm.value.responsavel;
      emailData.telefone_responsavel = this.suggestAgendaForm.value.telefoneResponsavel;
      emailData.email_contato = this.suggestAgendaForm.value.emailContato;
      const emailUnB = 'unbtv@unb.br';
      emailData.recipients = [emailUnB];
      this.isSendingEmail = true;
      this.emailService.sendEmail(emailData).subscribe((res: HttpResponse<string>) => {
        alert('Sugestão enviada com sucesso');
      },
        (error: HttpErrorResponse) => {
          alert('error: ' + error.message);
        },
        () => {
          this.isSendingEmail = false;
        });
    } else {
      alert('Preencha os campos obrigatórios!');
    }
  }

  onRequiredFieldsChange(): void {
    this.isDescricaoFilled = !!this.suggestAgendaForm.value.descricao;
    this.isResponsavelFilled = !!this.suggestAgendaForm.value.responsavel;
    this.isTelefoneFilled = !!this.suggestAgendaForm.value.telefoneResponsavel;
  }

}
