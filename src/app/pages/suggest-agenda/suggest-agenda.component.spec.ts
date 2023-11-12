import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { EmailService } from 'src/app/services/email.service';
import { SuggestAgendaComponent } from './suggest-agenda.component';


const mockData = "email has been sent"
class EmailServiceMock {
  constructor() { }
  sendEmail() {
    return of(mockData);
  }
}


describe('SuggestAgendaComponent', () => {
  let component: SuggestAgendaComponent;
  let fixture: ComponentFixture<SuggestAgendaComponent>;
  let emailService: EmailService;
  let emailServiceMock: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    emailServiceMock = jasmine.createSpyObj('EmailService', ['sendEmail']);
    await TestBed.configureTestingModule({
      declarations: [SuggestAgendaComponent],
      imports: [HttpClientTestingModule,
        ReactiveFormsModule],
      providers: [FormBuilder, { provide: EmailService, useValue: new EmailServiceMock() }]
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
    form.setValue({ descricao: 'Descrição', responsavel: 'Usuário Teste', telefoneResponsavel: '999999999', tema: '', quando: '', local: '', emailContato: '' });

    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();

    expect(component.sendSuggestAgenda).toHaveBeenCalled();
  });

  it('should call onRequiredFieldsChange when responsavel input value changes', () => {
    fixture.detectChanges();
    spyOn(component, 'onRequiredFieldsChange');

    const input = fixture.debugElement.query(By.css('input[name="responsavel"]')).nativeElement;
    input.value = 'novo valor';
    input.dispatchEvent(new Event('change'));

    expect(component.onRequiredFieldsChange).toHaveBeenCalled();
  });

  it('should call sendEmail', () => {
    fixture.detectChanges();
    const mySpy = spyOn(emailService, 'sendEmail').and.callThrough();
    // spyOn(component, 'sendSuggestAgenda').and.callThrough();
    const form = component.suggestAgendaForm;
    form.setValue({ descricao: 'Descrição', responsavel: 'Usuário Teste', telefoneResponsavel: '999999999', tema: '', quando: '', local: '', emailContato: '' })
    component.sendSuggestAgenda();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should call sendEmail and return an error', () => {
    fixture.detectChanges();
    const mySpy = spyOn(emailService, 'sendEmail').and.returnValue(throwError(() => new Error('Erro')));
    const form = component.suggestAgendaForm;
    form.setValue({ descricao: 'Descrição', responsavel: 'Usuário Teste', telefoneResponsavel: '999999999', tema: '', quando: '', local: '', emailContato: '' })
    component.sendSuggestAgenda();
    expect(mySpy).toHaveBeenCalled();
  });

});
