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
}
