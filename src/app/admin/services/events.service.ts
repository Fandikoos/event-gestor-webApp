import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eventModel } from '../../core/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private apiUrl = 'http://localhost:8095/events';
    private apiUrlAdmin = 'http://localhost:8095/admins';

    private httpService = inject(HttpClient);

    getAllEvents(): Observable<eventModel[]>{
      return this.httpService.get<eventModel[]>(this.apiUrl);
    }

    //En la api se espera recibir un FormData en vez de JSON por el tema de la imagen y tal
    addEvent(adminId: number ,eventData: FormData): Observable<eventModel>{
      return this.httpService.post<eventModel>(`${this.apiUrlAdmin}/${adminId}/events`, eventData);
    }

    deleteEvent(eventId: number): Observable<any>{
      return this.httpService.delete(`${this.apiUrl}/${eventId}`);
    }

    getEventById(eventId: number): Observable<eventModel>{
      return this.httpService.get<eventModel>(`${this.apiUrl}/${eventId}`);
    }

    modifyEvent(eventId: number, eventData: FormData): Observable<eventModel>{
      return this.httpService.put<eventModel>(`${this.apiUrl}/${eventId}`, eventData);
    }

    getEventsByAdmin(adminId: number): Observable<eventModel[]> {
      return this.httpService.get<eventModel[]>(`${this.apiUrlAdmin}/${adminId}/events`);
    }
}
