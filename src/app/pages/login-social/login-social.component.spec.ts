import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSocialComponent } from './login-social.component';
import { SocialAuthService, SocialUser, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent { }

describe('LoginSocialComponent', () => {
  let component: LoginSocialComponent;
  let fixture: ComponentFixture<LoginSocialComponent>;
  let mockSocialAuthService: jasmine.SpyObj<SocialAuthService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockSocialAuthService = jasmine.createSpyObj('SocialAuthService', ['signIn', 'signOut']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['loginSocialUser']);
    mockAuthService.loginSocialUser.and.returnValue(of({
      access_token: 'mock-token',
      is_new_user: false,
      user_id: 'mock-user-id'
    }));

    await TestBed.configureTestingModule({
      declarations: [LoginSocialComponent, DummyComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'catalog', component: DummyComponent },
          { path: 'editUser/:id', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: SocialAuthService, useValue: mockSocialAuthService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn when signing in with Facebook', async () => {
    const user = new SocialUser();
    user.provider = 'FACEBOOK';
    user.id = '1234567890';
    user.name = 'Test User';
    user.email = 'test@example.com';

    mockSocialAuthService.signIn.and.returnValue(Promise.resolve(user));
    await component.signInWithFB();

    expect(mockSocialAuthService.signIn).toHaveBeenCalledWith(FacebookLoginProvider.PROVIDER_ID);
  });

  it('should process JWT response correctly', () => {
    const payload = { name: 'Test User', email: 'test@example.com' };
    const encodedPayload = btoa(JSON.stringify(payload));
    const testResponse = {
      credential: `header.${encodedPayload}.signature`
    };

    component.handleCredentialResponse(testResponse);
  });

  it('should handle Facebook login and send user data to server', async () => {
    const user = new SocialUser();
    user.provider = 'FACEBOOK';
    user.id = '1234567890';
    user.name = 'Test User';
    user.email = 'test@example.com';

    mockSocialAuthService.signIn.and.returnValue(Promise.resolve(user));
    await component.signInWithFB();

    expect(mockSocialAuthService.signIn).toHaveBeenCalledWith(FacebookLoginProvider.PROVIDER_ID);
    expect(mockAuthService.loginSocialUser).toHaveBeenCalledWith({ name: user.name, email: user.email });
  });
});
