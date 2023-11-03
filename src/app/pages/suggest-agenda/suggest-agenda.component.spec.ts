import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuggestAgendaComponent } from './suggest-agenda.component';
import { EmailService } from 'src/app/services/email.service';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

describe('SuggestAgendaComponent', () => {
  let component: SuggestAgendaComponent;
  let fixture: ComponentFixture<SuggestAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestAgendaComponent ],
      imports: [HttpClientTestingModule,
        ReactiveFormsModule],
      providers: [{ provide: EmailService, FormBuilder}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
