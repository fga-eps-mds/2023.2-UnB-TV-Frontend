import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId: any;
  userData: any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.userId = userId;

    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        connection: ['', [Validators.required]],
      },
    );
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.alertService.showMessage("success", "Sucesso", "Usuário cadastrado com sucesso!");
          this.navigator('/profile');
        },
        error: (error) => {
          console.error(error);
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
