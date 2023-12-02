import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface ServerResponse {
  access_token: string;
  is_new_user: boolean;
  user_id: string;
}


@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent {
  private user: SocialUser | null = null;
  private loggedIn: boolean = false;
  

  constructor(
    private authService: SocialAuthService,
    private http: HttpClient,
    private router: Router,
    private Service: AuthService
    
  ) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;

      if (this.loggedIn) {
        console.log('Nome do usuário:', user.name);
        console.log('Email do usuário:', user.email);
      }
    });
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
      email: user.email
    };
  
    this.Service.loginSocialUser(userSocialData).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
  
        if (response && response.access_token) {    
          localStorage.setItem('token', response.access_token);
          
          if (response.is_new_user) {
            this.router.navigate([`/editUser/${response.user_id}`]);
          } else {
            this.router.navigate(['/videos']);
          }
        }
      },
      (error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      }
    );
  }
}
