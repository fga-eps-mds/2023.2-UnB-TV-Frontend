import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {
  users: any= []
  userId: number= 0
  constructor(
    private userService: UserService
  ){}

  ngOnInit() : void {
    this.getUserid()
   this.userService.getAllUsers().subscribe({
    next:(data)=>{ 
      this.users= data
      console.log(data)

    },
    error:(erro)=>{ 
    console.error('Erro', erro)
  }

   })
  }
updateUserRole(id:number, email:string, value:any) {
  const body = {email:email, role:value}
  console.log(body)
  this.userService.updateUserRole(id, body).subscribe({
    next:(data)=>{ 
      console.log(data)

    },
    error:(erro)=>{ 
    console.error('Erro', erro)
    }
})
}
getUserid() {
  const decodedToken: any = jwt_decode(localStorage.getItem("token") as string);
  this.userId = decodedToken.id;

}
}
