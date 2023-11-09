import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})

export class LoginSocialComponent  {

  constructor(private router: Router) {}

  loginWithGoogle() {
    
    window.location.href = 'http://localhost:8000/auth/login';
  }

  loginWithFacebook() {
    
    window.location.href = 'http://localhost:8000/facebook';
  }
}