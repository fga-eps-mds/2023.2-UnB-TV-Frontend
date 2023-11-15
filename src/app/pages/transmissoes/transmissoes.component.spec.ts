import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissoesComponent } from './transmissoes.component';

describe('TransmissoesComponent', () => {
  let component: TransmissoesComponent;
  let fixture: ComponentFixture<TransmissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransmissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
