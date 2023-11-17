import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from 'src/app/helper/must-match.validator';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        code: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  changePassword() {
    if (this.userForm.valid) {
      this.authService.updatePassword(this.userForm.value).subscribe({
        next: (data) => {
          this.alertService.showMessage("success", "Sucesso", "Senha alterada com sucesso!");
          this.navigator('/login');
        },
        error: (error) => {
          this.alertService.showMessage("error", "Erro", "Os campos estão incorretos, preencha os campos correctamente.");
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
