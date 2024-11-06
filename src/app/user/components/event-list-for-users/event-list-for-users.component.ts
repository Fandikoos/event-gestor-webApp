import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../../admin/services/events.service';
import { eventModel } from '../../../core/models/event.model';
import { HeaderUserComponent } from "../header-user/header-user.component";
import { CarouselComponent } from "../../../shared/carousel/carousel.component";
import { MapComponent } from "../../../shared/map/map.component";

@Component({
  selector: 'app-event-list-for-users',
  standalone: true,
  imports: [
    CommonModule,
    HeaderUserComponent,
    CarouselComponent,
    MapComponent
],
  templateUrl: './event-list-for-users.component.html',
  styleUrl: './event-list-for-users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListForUsersComponent implements OnInit{

  private eventsService = inject(EventsService);
  events: eventModel[] = [];

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventsService.getAllEvents().subscribe(
      (response) => {
        this.events = response;
      },
    )
  }

  
}
