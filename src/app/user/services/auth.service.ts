import { Injectable } from '@angular/core';
import { User } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class authService {

  // Verifica si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  // Verificar si el usuario esta autenticado
  isAuth(): boolean{
    if(this.isLocalStorageAvailable()){
      // Si el user esta en el local storage devuelve true de ahi los dos !! sino devolvera false
      return !!localStorage.getItem('user');
    }
    return false;
  }

  // Inica sesión y se almacena el token
  login(userData: any): void{
    if(this.isLocalStorageAvailable()){
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }

  // Cierra sesión y se elimina el token
  logout(): void{
    localStorage.removeItem('user');
  }

  getUser(): User{
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
