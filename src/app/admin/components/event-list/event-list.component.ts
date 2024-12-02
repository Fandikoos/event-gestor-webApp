import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { eventModel } from '../../../core/models/event.model';
import { EventsService } from '../../services/events.service';
import { AdminAuthService } from '../../../user/services/admin-auth.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  //El comunModule sirve para importar las directivas y tal hacerlo con todos los componentes
  imports: [CommonModule, RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export default class EventListComponent implements OnInit{

  eventList: eventModel[] = [];
  private eventService = inject(EventsService);
  private authAdminService = inject(AdminAuthService);
  private router = inject(Router);
  adminId = signal(0);


  ngOnInit(): void {
    this.adminId.set(this.authAdminService.getUser().id);
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getEventsByAdmin(this.adminId()).subscribe(
      (response) => {
        this.eventList = response;
      }
    )
  }

  deleteEvent(eventId: any): void {
    if (eventId === undefined) {
        console.error("Event id is undefined");
        return;
    }

    if (confirm("Are you sure that you want to delete this event?")) {
        this.eventService.deleteEvent(eventId).subscribe({
            next: () => {
                console.log(`The event with id: ${eventId} has been removed correctly`);
                // Ajustar el filtrado para eliminar el evento por id
                this.eventList = this.eventList.filter(event => event.id !== eventId);
                console.log(this.eventList); 
            },
            error: (err) => {
                console.error("Error removing this event", err);
            }
        });
    }
  }

}
