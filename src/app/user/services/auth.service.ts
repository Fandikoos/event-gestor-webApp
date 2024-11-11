import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authService {

  // Verificar si el usuario esta autenticado
  isAuth(): boolean{
    return !!localStorage.getItem('user');
  }

  // Inica sesión y se almacena el token
  login(userData: any): void{
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Cierra sesión y se elimina el token
  logout(): void{
    localStorage.removeItem('user');
  }

  getUser(): any{
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
