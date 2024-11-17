import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '../model/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private http = inject(HttpClient);
  private url = 'http://localhost:8095/registrations';

  postRegistration(eventId: number, userId: number): Observable<Registration>{
    const body = { eventId, userId };
    return this.http.post<Registration>(this.url, body);
  }

  getAllRegistrationsByUserId(userId: number){
    return this.http.get<Registration[]>(`${this.url}/user/${userId}`);
  }
}
