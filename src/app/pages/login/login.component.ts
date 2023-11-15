import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helper/must-match.validator';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    },
    );
  }

  login() {
    if (this.userForm.valid) {
      this.authService
        .loginUser(this.userForm.value).subscribe({
          next: (data) => {
            localStorage.setItem('token', data.access_token);
            this.navigator('/profile');
          },
          error: (error) => {
            this.alertService.showMessage("error", "Erro", error.error);
          },
        });
    } else {
      this.alertService.showMessage("info", "Alerta", "Preencha todos os campos corretamente!");
    }
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
