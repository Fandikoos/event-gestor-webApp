import { Injectable } from '@angular/core';
import { Admin } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  // Verifica si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  // Verificar si el usuario esta autenticado
  isAdminAuth(): boolean{
    if(this.isLocalStorageAvailable()){
      // Si el user esta en el local storage devuelve true de ahi los dos !! sino devolvera false
      return !!localStorage.getItem('admin');
    }
    return false;
  }

  // Inica sesión y se almacena el token
  loginAdmin(adminData: any): void{
    if(this.isLocalStorageAvailable()){
      localStorage.setItem('admin', JSON.stringify(adminData));
    }
  }

  // Cierra sesión y se elimina el token
  logoutAdmin(): void{
    if(this.isLocalStorageAvailable()){
      localStorage.removeItem('admin');
    }
  }

  getUser(): Admin{
    return JSON.parse(localStorage.getItem('admin') || '{}');
  }

}
