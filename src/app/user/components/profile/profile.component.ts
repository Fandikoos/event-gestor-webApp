import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { authService } from '../../services/auth.service';
import { Event, Registration, User } from '../../model/interfaces';
import { EventsUserService } from '../../services/events-users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RegistrationService } from '../../services/registration.service';
import { forkJoin, map, Observable } from 'rxjs';
import { userInfo } from 'os';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProfileComponent {

  private authService = inject(authService);
  private registrationService = inject(RegistrationService);
  private eventService = inject(EventsUserService);

  user = signal<User | null>(null);
  userEventsId: number[] = [];
  eventsById: Event[] = [];
  eventByIdSignal = signal<Event[]>([]);

  constructor(){
    const userInfo = this.authService.getUser();
    this.user.set(userInfo);
    console.log(userInfo.id);

    this.registrationService.getAllRegistrationsByUserId(userInfo.id).subscribe((response) => {
      this.userEventsId = response.map(registration => registration.eventId); 
      console.log(this.userEventsId);
      
      this.eventService.getEventsByIds(this.userEventsId).subscribe((events) => {
        this.eventsById = events;
        console.log(this.eventsById);
        this.eventByIdSignal.set(this.eventsById);
      })
    });

  }
}
