import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    private apiUrl = 'http://localhost:8095/events';

    private httpService = inject(HttpClient);

    getAllEvents(): Observable<Event[]>{
      return this.httpService.get<Event[]>(this.apiUrl);
    }
}
