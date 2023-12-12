import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

type ErrorResponseType = HttpErrorResponse;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId: any;
  userData: any;
  vinculo: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    console.log(userId);
    this.userId = userId;

    this.getUser();
    this.getVinculo();
    this.initializeForm();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData) {
          this.initializeForm();
        }
      },
      error: (error: ErrorResponseType) => {
        this.alertService.errorMessage(error.error);
      },
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: [this.userData ? this.userData.name : '', [Validators.required]],
      email: [
        this.userData ? this.userData.email : '',
        [Validators.email, Validators.required],
      ],
      connection: [
        this.userData ? this.userData.connection : '',
        [Validators.required],
      ],
    });

    if (this.userData && this.userData.connection) {
      this.userForm.get('connection')?.setValue(this.userData.connection);
    }
  }

  getVinculo() {
    this.userService.getVinculo().subscribe({
      next: (data) => {
        this.vinculo = data.map((name: any) => {
          return {
            name: name,
          };
        });
      },
      error: (error: ErrorResponseType) => {
        this.alertService.errorMessage(error.error);
      },
    });
  }

  updateUser() {
    if (this.userForm && this.userForm.valid) {
      const data = {
        ...this.userForm.value,
        connection: this.userForm.value.connection.name,
      };
      this.userService.updateUser(this.userId, data).subscribe({
        next: (data) => {
          console.log(data);
          this.alertService.showMessage(
            'success',
            'Sucesso',
            'Usuário atualizado com sucesso!'
          );
          this.navigator('/catalog');
        },
        error: (error: ErrorResponseType) => {
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
