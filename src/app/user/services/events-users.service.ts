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


}
