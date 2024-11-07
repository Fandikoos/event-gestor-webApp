import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CarouselComponent } from "../../../shared/carousel/carousel.component";
import { MapComponent } from "../../../shared/map/map.component";
import { EventsUserService } from '../../services/events-users.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-list-for-users',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    MapComponent
],
  templateUrl: './event-list-for-users.component.html',
  styleUrl: './event-list-for-users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListForUsersComponent{

  private eventService = inject(EventsUserService);
  private events$ = this.eventService.getAllEvents();
  public events = toSignal(this.events$);
  
}
