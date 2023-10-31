import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {
  users: any= []
  constructor(
    private userService: UserService
  ){}

  ngOnInit() : void {
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
}