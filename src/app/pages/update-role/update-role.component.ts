import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent {
  users: any = [];
  userId: number = 0;
  filterInputValue: string = "";
  total: number = 0;
  
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserid();
    this.getAllUsers();
  };

  updateUserRole(id: number, email: string, value: any) {
    const body = { email: email, role: value };
    console.log(body);
    this.userService.updateUserRole(id, body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (erro) => {
        console.error('Erro', erro);
      },
    });
  };

  getUserid() {
    const decodedToken: any = jwt_decode(
      localStorage.getItem('token') as string
    );
    this.userId = decodedToken.id;
  };

  filterUser() {
    this.getAllUsers()
  };

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getAllUsers();
  };

  getAllUsers() {
    this.userService.getAllUsers({ nameEmail: this.filterInputValue, limit: this.pageSize, offset: (this.pageIndex * this.pageSize) }).subscribe({
      next: (data: Response) => {
        this.users = data.body;
        if (data.headers.has("x-total-count")) {
          const totalCountHeader = data.headers.get("x-total-count");

          if (totalCountHeader !== null) {
            this.total = Number.parseInt(totalCountHeader, 10); 
          }
        }
      },
      error: (erro) => {
        console.error('Erro', erro);
      },
    });
  }
}
