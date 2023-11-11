import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateComponent } from './participate.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParticipateComponent', () => {
  let component: ParticipateComponent;
  let fixture: ComponentFixture<ParticipateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipateComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
