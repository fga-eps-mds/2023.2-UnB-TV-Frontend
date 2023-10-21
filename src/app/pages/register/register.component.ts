import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helper/must-match.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        connection: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  register() {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
          alert('Usuário cadastrado com sucesso!');
          this.navigator('/activeAccount');
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
