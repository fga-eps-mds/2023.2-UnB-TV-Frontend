import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

type ErrorResponseType = HttpErrorResponse;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;
  userId: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setUserIdFromToken(localStorage.getItem('token') as string);
    this.getUser();
  }

  setUserIdFromToken(token: string) {
    const decodedToken: any = jwt_decode(token);
    this.userId = decodedToken.id;
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error: ErrorResponseType) => {
        console.log(error);
        this.alertService.errorMessage(error.error);
      },
    });
  }

  logoutUser() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja sair?',
      header: 'Confirmação',
      key: 'myDialog',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.logout();
      },
      reject: () => {
      },
    });
  }

  deleteUser() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar esse usuário?',
      header: 'Confirmação',
      key: 'myDialog',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(this.userId).subscribe({
          next: (data) => {
            this.alertService.showMessage(
              'sucess',
              'Sucesso',
              'Usuário deletado com sucesso!'
            );
            this.authService.logout();
          },
          error: (error: ErrorResponseType) => {
            console.log(error);
            this.alertService.errorMessage(error.error);
          },
        });
      },
      reject: () => {
      },
    });

  }

  navigatorEdit(): void {
    this.router.navigate([`/editUser/${this.user.id}`]);
  }
}
