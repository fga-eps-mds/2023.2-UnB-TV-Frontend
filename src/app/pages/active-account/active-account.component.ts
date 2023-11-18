import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert.service";
import { HttpErrorResponse } from '@angular/common/http';

type ErrorResponseType = HttpErrorResponse;

@Component({
  selector: "app-active-account",
  templateUrl: "./active-account.component.html",
  styleUrls: ["./active-account.component.css"],
})
export class ActiveAccountComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ["", [Validators.required]],
      code: [, [Validators.required]],
    });
  }

  activeAccount() {
    if (this.userForm.valid) {
      this.authService.activeAccount(this.userForm.value).subscribe({
        next: (data) => {
          if (data.status === "error") {
            this.alertService.showMessage("error", "Erro", data.message);
            this.navigator("/login");
          } else {
            this.alertService.showMessage("success", "Sucesso", "Email ativado com sucesso!");
            this.navigator("/login");
          }
        },
        error: (error) => {
          console.log(error);
          this.alertService.showMessage("error", "Erro", "Seu email ou código estão inválidos, preencha os campos corretamente.");
        },
      });
    } else {
      this.alertService.showMessage("info", "Alerta", "Preencha todos os campos corretamente!");
    }
  }

  resendCode() {
    if (this.userForm.value.email) {
      console.log(this.userForm.value.email);
      this.authService.resendCode(this.userForm.value.email).subscribe({
        next: (data) => {
          this.alertService.showMessage("success", "Sucesso", "Email reenviado com sucesso!");
        },
        error: (error: ErrorResponseType) => {
          console.log(error);
          this.alertService.errorMessage(error.error);
        },
      });
    } else {
      this.alertService.showMessage("info", "Alerta", "Você deve preencher o email.");
    }
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
