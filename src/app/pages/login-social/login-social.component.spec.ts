import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSocialComponent } from './login-social.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginSocialComponent', () => {
  let component: LoginSocialComponent;
  let fixture: ComponentFixture<LoginSocialComponent>;

  const mockSocialAuthService = jasmine.createSpyObj('SocialAuthService', ['signIn', 'signOut']);
  mockSocialAuthService.authState = of({ 
    email: 'test@example.com',
    name: 'Test User',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSocialComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SocialAuthService, useValue: mockSocialAuthService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
