import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private url = 'http://localhost:8095/users';

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  getClientByUserAndPassword(name: string, password: string): Observable<User>{
    return this.http.get<User>(`${this.url}/login?name=${name}&password=${password}`);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/users/searchUser?id=${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.url, user);
  }

}
