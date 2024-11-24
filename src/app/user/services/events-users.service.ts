import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Event } from '../model/interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventsUserService {

  private http = inject(HttpClient);

  getAllEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(environment.apiUrlEvents)
  }

  getEventById(eventId: number):Observable<Event>{
    return this.http.get<Event>(`${environment.apiUrlEvents}/${eventId}`);
  }

  getEventByCategory(category: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.apiUrlEvents}/category/${category}`);
  }

  // Método para obtener eventos por una lista de IDs
  getEventsByIds(eventIds: number[]): Observable<Event[]> {
    return this.http.post<Event[]>(`${environment.apiUrlEvents}/multiple`, eventIds);
  }
}
