import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventsUserService } from '../../services/events-users.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CarouselComponent } from "../../../shared/carousel/carousel.component";
import { MapComponent } from "../../../shared/map/map.component";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent
],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailComponent{
  
  private eventService = inject(EventsUserService);
  private route = inject(ActivatedRoute);

  public event = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.eventService.getEventById(id) )
    )
  )

  constructor(){

  }

}
