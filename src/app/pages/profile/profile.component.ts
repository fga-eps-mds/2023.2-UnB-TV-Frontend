import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(1).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
        this.navigator('/home');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  navigator(rota: string): void {
    this.router.navigate([rota]);
  }
}
