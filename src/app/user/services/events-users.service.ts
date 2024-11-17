import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Event } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventsUserService {

  private http = inject(HttpClient);
  private url = 'http://localhost:8095/events';

  getAllEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.url)
  }

  getEventById(eventId: number):Observable<Event>{
    return this.http.get<Event>(`${this.url}/${eventId}`);
  }

  getEventByCategory(category: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.url}/category/${category}`);
  }

  // Método para obtener eventos por una lista de IDs
  getEventsByIds(eventIds: number[]): Observable<Event[]> {
    return this.http.post<Event[]>(`${this.url}/multiple`, eventIds);
  }
}
