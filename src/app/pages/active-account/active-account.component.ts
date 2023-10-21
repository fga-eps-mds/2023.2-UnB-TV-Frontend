import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
        email: ['', [Validators.required]],
        code: [, [Validators.required]],
      },
    );
  }

  activeAccount() {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.userService.activeAccount(this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
          if(data.status === 'error'){
            alert(data.message);
            this.navigator('/login');
          }
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

  resendCode() {
    if (this.userForm.value.email) {
      this.userService.resendCode(this.userForm.value.email).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      alert('Você deve preencher o email.');
    }
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
