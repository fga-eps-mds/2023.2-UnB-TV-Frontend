import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  users: any = [];
  userId: number = 0;

  filterInputValue: string = "";
  filterConnectionValue: string = ""
  
  total: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserid();
    this.getAllUsers();
  };

  updateUserRole(id: number) {
    this.userService.updateUserRole(id).subscribe({
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
    this.pageIndex = 0;
    this.getAllUsers();
  };

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getAllUsers();
  };

  getAllUsers() {
    this.userService.getAllUsers({ 
      nameEmail: this.filterInputValue,
      connection: this.filterConnectionValue, 
      limit: this.pageSize, 
      offset: (this.pageIndex * this.pageSize) 
    }).subscribe({
      next: (data: Response) => {
        this.users = data.body;
        if (data && data.headers && data.headers.has("x-total-count")) {
          const totalCountHeader = data.headers.get("x-total-count");
          this.total = Number.parseInt(totalCountHeader || '0', 10); 
        }
      },
      error: (erro) => {
        console.error('Erro', erro);
      },
    });
  }
}
