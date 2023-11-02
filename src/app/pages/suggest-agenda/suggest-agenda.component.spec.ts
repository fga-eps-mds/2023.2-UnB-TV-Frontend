import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAgendaComponent } from './suggest-agenda.component';

describe('SuggestAgendaComponent', () => {
  let component: SuggestAgendaComponent;
  let fixture: ComponentFixture<SuggestAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestAgendaComponent ]
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
