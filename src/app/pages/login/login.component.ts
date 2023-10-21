import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router) { }

  username: string = '';
  password: string = '';

  login() {
    console.log(this.username);
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
