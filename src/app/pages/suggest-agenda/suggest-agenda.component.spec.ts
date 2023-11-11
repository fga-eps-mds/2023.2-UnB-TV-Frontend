import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuggestAgendaComponent } from './suggest-agenda.component';
import { EmailService } from 'src/app/services/email.service';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';


const mockData = "email has been sent"
class EmailServiceMock {
  constructor() { }
  findAll() {
    return of(mockData);
  }
}


describe('SuggestAgendaComponent', () => {
  let component: SuggestAgendaComponent;
  let fixture: ComponentFixture<SuggestAgendaComponent>;
  let emailService: EmailService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestAgendaComponent ],
      imports: [HttpClientTestingModule,
        ReactiveFormsModule],
      providers: [{ provide: EmailService, useValue: new EmailServiceMock, FormBuilder}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestAgendaComponent);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form on initialization', () => {
    fixture.detectChanges();
    expect(component.suggestAgendaForm).toBeTruthy();
  });

  it('should call suggestAgendaComponent method when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'sendSuggestAgenda').and.callThrough();
    const form = component.suggestAgendaForm;
    form.setValue({ descricao: 'Descrição', responsavel: 'Usuário Teste', telefoneResponsavel: '999999999', tema: '', quando: '',  local: '', emailContato: ''});

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.sendSuggestAgenda).toHaveBeenCalled();
  });

});
