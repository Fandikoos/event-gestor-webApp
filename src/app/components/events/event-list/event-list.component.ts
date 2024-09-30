import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { error } from 'console';
import { eventModel } from '../../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  //El comunModule sirve para importar las directivas y tal hacerlo con todos los componentes
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{

  eventList: eventModel[] = [];
  private eventService = inject(EventsService);
  private router = inject(Router);


  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (response: eventModel[]) => {
        //console.log(response);
        this.eventList = response;
      },
      error: (error) => {
        console.error('Error getting the event list', error);
      }
    }
    );
  }

}
