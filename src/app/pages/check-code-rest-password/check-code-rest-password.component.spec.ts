import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCodeRestPasswordComponent } from './check-code-rest-password.component';

describe('CheckCodeRestPasswordComponent', () => {
  let component: CheckCodeRestPasswordComponent;
  let fixture: ComponentFixture<CheckCodeRestPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCodeRestPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckCodeRestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
