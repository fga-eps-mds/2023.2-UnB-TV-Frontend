import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit{

  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      vinculo: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  register() {
    console.log(this.userForm.value);
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
