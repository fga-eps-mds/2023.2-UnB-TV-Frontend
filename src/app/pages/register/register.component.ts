import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helper/must-match.validator';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


type ErrorResponseType = HttpErrorResponse;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  vinculo: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getVinculo();
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        connection: [[], [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, {
      validator: MustMatch('password', 'confirmPassword'),
    }
    );
  }

  getVinculo() {
    this.userService.getVinculo().subscribe({
      next: (data) => {
        this.vinculo = data.map((name: any) => {
          return {
            name: name,
          }
        });
      },
      error: (error: ErrorResponseType) => {
        this.alertService.errorMessage(error.error);
      },
    });
  }

  register() {
    if (this.userForm.valid) {
      const data = { ...this.userForm.value, connection: this.userForm.value.connection.name };
      this.authService.registerUser(data).subscribe({
        next: (data) => {
          this.alertService.showMessage(
            'success',
            'Sucesso',
            'Usuário cadastrado com sucesso!'
          );
          this.navigator('/activeAccount');
        },
        error: (error: ErrorResponseType) => {
          console.log(error.error);
          this.alertService.errorMessage(error.error);
        },
      });
    } else {
      this.alertService.showMessage(
        'info',
        'Alerta',
        'Preencha todos os campos corretamente!'
      );
    }
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
