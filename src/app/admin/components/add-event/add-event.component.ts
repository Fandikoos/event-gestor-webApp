import { Component, inject } from '@angular/core';
import { eventModel } from '../../../core/models/event.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  newEvent: eventModel = {
    id: 0,
    name: '',
    date: '',
    place: '',
    description: '',
    category: '',
    participants: 0,
    price: '',
    eventImage: null
  };

  private eventApiService = inject(EventsService);
  private router = inject(Router);


  //Metodo para manejar la selección de imagenes para los eventos, recibimos un evento que se dispara cuando se selecciona un archivo file en el html
  onImageSelected(event: Event): void {
    //Event target hace referencia al elemento html que disparo este evento, en este caso un <input> de tipo File y le decimo que formar parte de HTMLInputElement porque es al que ahce referencia
    const input = event.target as HTMLInputElement;

    //Verificamos que ese input.file (que es una propiedad el propio file), no es null y verificamos que al menos hay un archivo que enviar, digamos que inputFiles es un array de archivos
    if (input.files && input.files.length > 0) {

      //De la lista de archivo que se han podido insertar seleccionamos el primer que se encuentra en la posicion 0 del array
      const file = input.files[0];
      this.newEvent.eventImage = file; // Asiganmos al eventImage el file insertado
    }
  }

  onSubmit(): void {
    const formData = new FormData();
  
    // Agregar cada campo del formulario a FormData
    formData.append('name', this.newEvent.name);
    formData.append('date', this.newEvent.date);
    formData.append('place', this.newEvent.place);
    formData.append('description', this.newEvent.description);
    formData.append('category', this.newEvent.category);
    formData.append('participants', this.newEvent.participants.toString());
    formData.append('price', this.newEvent.price);
  
    // Agregar la imagen como archivo si existe
    if (this.newEvent.eventImage) {
      formData.append('eventImage', this.newEvent.eventImage); 
    }
  
    this.eventApiService.addEvent(formData).subscribe({
      next: (response: eventModel) => {
        console.log('Event added successfully', response);
        this.router.navigate(['events']);
      },
      error: (err) => {
        console.error('Error adding the events', err);
      }
    });
  }

}
