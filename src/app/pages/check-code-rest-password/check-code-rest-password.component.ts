import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-check-code-rest-password',
  templateUrl: './check-code-rest-password.component.html',
  styleUrls: ['./check-code-rest-password.component.css']
})
export class CheckCodeRestPasswordComponent {
  userForm!: FormGroup;
  activeCode: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.activeCode = false;

    this.userForm = this.fb.group({
        email: [[], [Validators.required]],
        code: [, [Validators.required]],
      },
    );
  }

  sendEmail() {
    if (this.userForm.value.email) {
      this.authService.sendEmailPassword({email: this.userForm.value.email}).subscribe({
        next: (data) => {
          this.alertService.showMessage("success", "Sucesso", "Email enviado para realizar a troca de senha.");
          this.activeCode = true;
        },
        error: (error) => {
          this.alertService.showMessage("error", "Erro", "Email inválido!");
        },
      });
    } else {
      this.alertService.showMessage("info", "Alerta", "Preencha todos os campos corretamente!");
    }
  }

  checkCode() {
    if (this.userForm.valid) {
      this.authService.verifyCodePassword(this.userForm.value).subscribe({
        next: (data) => {
          this.alertService.showMessage("success", "Sucesso", "Código válido!");
          this.navigator('/changePassword');
        },
        error: (error: HttpErrorResponse) => {
          this.alertService.errorMessage(error.error);
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
