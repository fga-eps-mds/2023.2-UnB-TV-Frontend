import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

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
    private userService: UserService
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
      error: (error) => {
        console.error(error);
      },
    });
  }

  navigatorEdit(): void {
    this.router.navigate([`/editUser/${this.user.id}`]);
  }
}
