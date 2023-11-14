import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacaoComponent } from './programacao.component';

describe('ProgramacaoComponent', () => {
  let component: ProgramacaoComponent;
  let fixture: ComponentFixture<ProgramacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
