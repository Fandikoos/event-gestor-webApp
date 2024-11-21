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

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RatingsComponent,
    CarouselComponent,
    ReactiveFormsModule,
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
  private ratingService = inject(RatingsService)

  errorMessageRegister = signal<string | null>(null);
  successMessageRegister = signal<string | null>(null);

  ratingForm: FormGroup;

  public event = toSignal(
    this.route.params.pipe(
      switchMap( ({id}) => this.eventService.getEventById(id) )
    )
  )

  isRegistered = signal<boolean>(false);

  constructor(private fb: FormBuilder){
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

    this.ratingForm = this.fb.group({
      customerService: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      eventQuality: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      organizationSpeed: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      valueForMoney: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    })
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

  postRate() {
    const userId = this.authService.getUser()?.id;
    
    if (!userId) {
      this.errorMessageRegister.set('You must be logged in to rate the event');
      return;
    }
  
    const eventId = this.event()?.id;
  
    // Validar si hay evento seleccionado
    if (!eventId) {
      this.errorMessageRegister.set('Event not found');
      return;
    }
  
    // Suponiendo que obtienes los valores de rating de algún formulario en tu vista
    const customerService = this.ratingForm.value.customerService;
    const eventQuality = this.ratingForm.value.eventQuality;
    const organizationSpeed = this.ratingForm.value.organizationSpeed;
    const valueForMoney = this.ratingForm.value.valueForMoney;
  
    // Validar que todos los valores de rating estén presentes
    if (customerService == null || eventQuality == null || organizationSpeed == null || valueForMoney == null) {
      this.errorMessageRegister.set('Please provide a rating for all categories');
      return;
    }
  
    // Crear el objeto Rating a enviar
    const rating: Rating = {
      userId: userId,
      eventId: eventId,
      customerService: customerService,
      eventQuality: eventQuality,
      organizationSpeed: organizationSpeed,
      valueForMoney: valueForMoney,
      averageRating: 0
    };
  
    // Llamada al servicio postRating
    this.ratingService.postRating(rating).subscribe({
      next: (response) => {
        // Manejar respuesta exitosa
        this.successMessageRegister.set('Your rating has been submitted successfully!')
        this.errorMessageRegister.set(null);
      },
      error: (err) => {
        // Manejar errores
        this.errorMessageRegister.set('There was an error submitting your rating. Please try again.');
        this.successMessageRegister.set(null);
      }
    });
  }
  

  submitRating() {
    if (this.ratingForm.valid) {
      this.postRate();
    } else {
      // Manejar formulario inválido
      console.log('Formulario no válido');
    }
  }


}
