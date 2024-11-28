import { privateDecrypt } from 'crypto';
import { inject, Injectable } from '@angular/core';
import { Router, type ActivatedRouteSnapshot, type CanActivate, type GuardResult, type MaybeAsync, type RouterStateSnapshot } from '@angular/router';
import { authService } from './user/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  private authService = inject(authService);
  private router = inject(Router);

  canActivate(): boolean {
    if(this.authService.isAuth()){
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
