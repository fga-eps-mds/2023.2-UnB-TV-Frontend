import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-suggest-agenda',
  templateUrl: './suggest-agenda.component.html',
  styleUrls: ['./suggest-agenda.component.css']
})
export class SuggestAgendaComponent implements OnInit{

  suggestAgendaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ){}

  ngOnInit(): void {
    this.suggestAgendaForm = this.fb.group({
      tema: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      quando: ['', [Validators.required]],
      local: ['', [Validators.required]],
      responsavel: ['', [Validators.required]],
      telefoneResponsavel: ['', [Validators.required]],
      emailContato: ['', [Validators.required]],
    },
  );
  }

  sendSuggestAgenda(): void{
    console.log('this.suggestAgendaForm', this.suggestAgendaForm.tema);
    if (this.suggestAgendaForm.valid) {
      const email = new EmailData();
      email.tema = this.suggestAgendaForm.tema;
      email.descricao = this.suggestAgendaForm.descricao;
      email.local = this.suggestAgendaForm.local;
      email.quando = this.suggestAgendaForm.quando;
      email.responsavel = this.suggestAgendaForm.responsavel;
      email.telefone_responsavel = this.suggestAgendaForm.telefoneResponsavel;
      email.email_contato = this.suggestAgendaForm.emailContato;
      const emailUnB = 'geraldovictor@outlook.com';
      emailData.email = emailUnB;
      this.emailService.sendEmail(emailData).subscribe((res: HttpResponse<string>) => {
        console.log('email enviado com sucesso');
      }, 
      (error: HttpResponseError) => {
        console.log('error', error.message);
      }); 
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

}
