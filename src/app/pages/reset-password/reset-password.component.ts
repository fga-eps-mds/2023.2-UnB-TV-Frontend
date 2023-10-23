import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from 'src/app/helper/must-match.validator';

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
    private authService: AuthService
  ) {}

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
          console.log(data);
          alert('Senha alterada com sucesso!');
          this.navigator('/login');
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
