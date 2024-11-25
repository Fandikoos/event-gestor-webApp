import { CommonModule } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { authService } from '../../services/auth.service';
import { Event, Registration, User } from '../../model/interfaces';
import { EventsUserService } from '../../services/events-users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RegistrationService } from '../../services/registration.service';
import { forkJoin, map, Observable } from 'rxjs';
import { userInfo } from 'os';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModifyUserComponent } from '../modals/modify-user/modify-user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  private authService = inject(authService);
  private registrationService = inject(RegistrationService);
  private eventService = inject(EventsUserService);
  private matDialogRef = inject(MatDialog);

  user = signal<User>({
    id: 0,
    name: '',
    email: '',
    phone: ''
  });
  userEventsId: number[] = [];
  eventByIdSignal = signal<Event[]>([]);

  registrationsByUser: Registration[] = [];

  constructor(){
    afterNextRender(() => {
      const userInfo = this.authService.getUser();
      this.user.set(userInfo);
  
      this.registrationService.getAllRegistrationsByUserId(userInfo.id).subscribe((response) => {
        this.registrationsByUser = response;
  
        this.userEventsId = response.map(registration => registration.eventId); 
        
        this.eventService.getEventsByIds(this.userEventsId).subscribe((events) => {
          this.eventByIdSignal.set(events);
          console.log(this.eventByIdSignal());
        })
      });
    })

  }

  cancelRegistration(registrationId: number){
      this.registrationService.deleteRegistrationByUser(registrationId).subscribe(() => {
        this.registrationsByUser = this.registrationsByUser.filter(registration => registration.id !== registrationId);

        this.userEventsId = this.registrationsByUser.map(registration => registration.eventId);
        this.eventService.getEventsByIds(this.userEventsId).subscribe((events) => {
          this.eventByIdSignal.set(events);
        });
      })
  }

  openModifyUser(user: User){
    this.matDialogRef.open(ModifyUserComponent, {
      height: '500px',
      width: '500px',
      data: {user},
    });
  }
}
