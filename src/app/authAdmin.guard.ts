import { Router, type CanActivate, type CanActivateFn } from '@angular/router';
import { AdminAuthService } from './user/services/admin-auth.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  
  private authService = inject(AdminAuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if(this.authService.isAdminAuth()){
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

