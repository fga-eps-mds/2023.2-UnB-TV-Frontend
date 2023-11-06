import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckCodeRestPasswordComponent } from './check-code-rest-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckCodeRestPasswordComponent', () => {
  let component: CheckCodeRestPasswordComponent;
  let fixture: ComponentFixture<CheckCodeRestPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [AuthService],
      declarations: [CheckCodeRestPasswordComponent]
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
