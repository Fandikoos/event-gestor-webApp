import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.apiUrlUsers);
  }

  getClientByUserAndPassword(name: string, password: string): Observable<User>{
    return this.http.get<User>(`${environment.apiUrlUsers}/login?name=${name}&password=${password}`);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${environment.apiUrlUsers}/users/searchUser?id=${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(environment.apiUrlUsers, user);
  }

}
