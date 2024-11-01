import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private apiUrl = 'http://localhost:8095/events';

    private httpService = inject(HttpClient);

    getAllEvents(): Observable<eventModel[]>{
      return this.httpService.get<eventModel[]>(this.apiUrl);
    }

    //En la api se espera recibir un FormData en vez de JSON por el tema de la imagen y tal
    addEvent(eventData: FormData): Observable<eventModel>{
      return this.httpService.post<eventModel>(this.apiUrl, eventData);
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
}
