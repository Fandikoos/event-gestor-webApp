import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { EventsUserService } from '../../services/events-users.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CarouselComponent } from "../../../shared/carousel/carousel.component";
import { MapComponent } from "../../../shared/map/map.component";
import { RegistrationService } from '../../services/registration.service';
import { authService } from '../../services/auth.service';
import { RatingsComponent } from "./ratings/ratings/ratings.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingsService } from '../../services/ratings.service';
import { Rating } from '../../model/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostRateComponent } from '../modals/postRate/postRate.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RatingsComponent,
    CarouselComponent,
    ReactiveFormsModule,
    MatDialogModule,
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

  isRegistered = signal<boolean>(false);

  constructor(private fb: FormBuilder, private dialog: MatDialog){
    //Effect se ejecuta para cambiar la logica cuando cambien los signals Es una forma de observar señales y reaccionar automáticamente a sus cambios. Los effects no devuelven valores; solo se usan para ejecutar efectos secundarios (como llamadas a servicios o cambios en el DOM). El effect se ejecuta automaticamente cada vez que cambia una signal dentro del effect
    effect(() => {
      const userId = this.authService.getUser().id; // Señal constante del usuario id
      const eventId = this.event()?.id;  //Señal reactiva del event id
  
      if (userId && eventId) {
        this.registrationService.checkUserInEvent(eventId, userId).subscribe(
          (response) => this.isRegistered.set(response),
        );
      }
    });

    
  }

  //Metodo para registrar un usuario en un evento
  onRegister(){
    const userId = this.authService.getUser().id;
    if(!userId){
      this.errorMessageRegister.set('You must be logged to register in event');
      return;
    }

    if(this.isRegistered()){
      this.errorMessageRegister.set('You are already registered for this event');
      return;
    }

    if(this.event()){
      this.registrationService.postRegistration(this.event()!.id, userId).subscribe(
        (response) => {
          this.successMessageRegister.set('You have successfully registered for the event!');
          this.errorMessageRegister.set(null);
          this.isRegistered.set(true);
        },
      )
    }

  }

  checkIfUserIsRegistered(){
    const userId = this.authService.getUser().id;
    if(userId && this.event()?.id){
      this.registrationService.checkUserInEvent(this.event()!.id, userId).subscribe(
        (response) => {
          this.isRegistered.set(response);
        }
      )
    }

  }

  openDialog(eventId: number){
    this.dialog.open(PostRateComponent, {
      height : '85%',
      width: '85%',
      data: {
        eventId: eventId,
      }
    })
  }

  


}
