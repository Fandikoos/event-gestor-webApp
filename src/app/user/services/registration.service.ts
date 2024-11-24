import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registration } from '../model/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { env } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private http = inject(HttpClient);

  postRegistration(eventId: number, userId: number): Observable<Registration>{
    const body = { eventId, userId };
    return this.http.post<Registration>(environment.apiUrlRegistrations, body);
  }

  getAllRegistrationsByUserId(userId: number){
    return this.http.get<Registration[]>(`${environment.apiUrlRegistrations}/user/${userId}`);
  }

  checkUserInEvent(eventId: number, userId: number): Observable<boolean>{
    return this.http.get<boolean>(`${environment.apiUrlRegistrations}/check?eventId=${eventId}&userId=${userId}`);
  }

  deleteRegistrationByUser(registrationId: number){
    return this.http.delete(`${environment.apiUrlRegistrations}/${registrationId}`);
  }

  getAllRegistrations(): Observable<Registration>{
    return this.http.get<Registration>(`${environment.apiUrlRegistrations}`)
  }
}
