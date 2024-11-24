import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  getAdminByUsernameAndPassword(user: string, password: string): Observable<Admin>{
    return this.http.get<Admin>(`${environment.apiUrlAdmin}/login?name=${user}&password=${password}`)
  }

}
