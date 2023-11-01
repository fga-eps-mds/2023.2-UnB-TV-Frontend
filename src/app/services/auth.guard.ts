// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot): boolean {
    const roles: string[]= route.data?.roles;
    console.log(roles)
    const role = localStorage.getItem("role") || ""
    console.log(role)
    if (this.authService.isAuthenticated()) {
      if (roles) {
      
      return roles.includes(role)
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
