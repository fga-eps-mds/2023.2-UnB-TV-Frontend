import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare var gapi: any;

interface ServerResponse {
  access_token: string;
  is_new_user: boolean;
  user_id: string;
}

interface GoogleIdentityResponse {
  credential: string;
}

interface GoogleIdentityResponse {
  credential: string;
  clientId: string;
}

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css'],
})
export class LoginSocialComponent implements OnInit {
  private user: SocialUser | null = null;
  private loggedIn: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router,
    private Service: AuthService
  ) {}

  ngOnInit(): void {
    window['handleCredentialResponse'] =
      this.handleCredentialResponse.bind(this);
    this.loadGoogleButton();
  }

  loadGoogleButton(): void {
    const googleScript = document.createElement('script');
    googleScript.src = 'https://accounts.google.com/gsi/client';
    googleScript.async = true;
    googleScript.defer = true;
    document.body.appendChild(googleScript);
  }

  handleCredentialResponse(response: any) {
    const jwt = response.credential;
    const payload = jwt.split('.')[1];
    const decodedPayload = atob(payload);
    const userInformation = JSON.parse(decodedPayload);

    const user: SocialUser = new SocialUser();
    user.name = userInformation.name;
    user.email = userInformation.email;

    this.sendUserDataToServer(user);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      if (user) {
        this.sendUserDataToServer(user);
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  private sendUserDataToServer(user: SocialUser) {
    const userSocialData = {
      name: user.name,
      email: user.email,
    };

    this.Service.loginSocialUser(userSocialData).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);

        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);

          if (response.is_new_user) {
            this.router.navigate([`/editUser/${response.user_id}`]);
          } else {
            this.router.navigate(['/catalog']);
          }
        }
      },
      (error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      }
    );
  }
}
