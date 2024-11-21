import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, Inject, inject, input, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingsService } from '../../../services/ratings.service';
import { Rating } from '../../../model/interfaces';
import { authService } from '../../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventsUserService } from '../../../services/events-users.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-rate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './postRate.component.html',
  styleUrl: './postRate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostRateComponent {

  ratingForm: FormGroup;
  private ratingService = inject(RatingsService);
  private authService = inject(authService);
  private eventService = inject(EventsUserService);
  private route = inject(ActivatedRoute);

  eventId: any;

  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<PostRateComponent>, 
    private dialog: MatDialog, @Optional() @Inject(MAT_DIALOG_DATA) public data: any){

    this.ratingForm = this.fb.group({
      customerService: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      eventQuality: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      organizationSpeed: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      valueForMoney: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    })
  }

  postRate() {
    const userId = this.authService.getUser()?.id;

    
    if (!userId) {
      //his.errorMessageRegister.set('You must be logged in to rate the event');
      return;
    }
  
    this.eventId = this.data.eventId;

    // Validar si hay evento seleccionado
    if (!this.eventId) {
      //this.errorMessageRegister.set('Event not found');
      return;
    }
  
    // Suponiendo que obtienes los valores de rating de algún formulario en tu vista
    const customerService = this.ratingForm.value.customerService;
    const eventQuality = this.ratingForm.value.eventQuality;
    const organizationSpeed = this.ratingForm.value.organizationSpeed;
    const valueForMoney = this.ratingForm.value.valueForMoney;
  
    // Crear el objeto Rating a enviar
    const rating: Rating = {
      userId: userId,
      eventId: this.eventId,
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
        console.log('okey');
      },
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
