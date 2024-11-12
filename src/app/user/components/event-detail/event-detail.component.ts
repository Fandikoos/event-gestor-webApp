import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EventsUserService } from '../../services/events-users.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CarouselComponent } from "../../../shared/carousel/carousel.component";
import { MapComponent } from "../../../shared/map/map.component";
import { RegistrationService } from '../../services/registration.service';
import { authService } from '../../services/auth.service';

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
  private registrationService = inject(RegistrationService);
  private route = inject(ActivatedRoute);
  private authService = inject(authService);

  errorMessageRegister = signal<string | null>(null);
  successMessageRegister = signal<string | null>(null);

  public event = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.eventService.getEventById(id) )
    )
  )

  //Metodo para registrar un usuario en un evento
  onRegister(){
    const userId = this.authService.getUser().id;
    if(!userId){
      this.errorMessageRegister.set('You must be logged to register in event');
      return;
    }
    console.log(userId);
    console.log(this.event());
    if(this.event()){
      this.registrationService.postRegistration(this.event()!.id, userId).subscribe(
        (response) => {
          this.successMessageRegister.set('You have successfully registered for the event!');
          this.errorMessageRegister.set(null)
          console.log('Succesfully registration');
        },
        (error) => {
          this.errorMessageRegister.set('An error occurred while registering. Please try again.');
          this.successMessageRegister.set(null);
          console.error('Error register user', error);
        }
      )
    }

  }


}
