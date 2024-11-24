import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { eventModel } from '../../../core/models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  // Importamos ReactiveFormsModule
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-modify-event',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './modify-event.component.html',
  styleUrl: './modify-event.component.css'
})
export class ModifyEventComponent implements OnInit {

  event: eventModel = {
    id: 0,
    name: '',
    date: '',
    address: '',
    lat: 0,
    lng: 0,
    description: '',
    category: '',
    participants: 0,
    price: '',
    eventImage: null
  };

  selectedFile: File | null = null;

  private eventService = inject(EventsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.eventService.getEventById(eventId).subscribe({
      next: (response: eventModel) => {
        this.event = response; // Asignamos los datos al evento actual.
      },
      error: (err) => {
        console.error('Error obteniendo el evento', err);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.event.name);
    formData.append('date', this.event.date);
    formData.append('address', this.event.address);
    formData.append('lat', this.event.lat.toString());
    formData.append('lng', this.event.lng.toString());
    formData.append('description', this.event.description);
    formData.append('category', this.event.category);
    formData.append('participants', this.event.participants.toString());
    formData.append('price', this.event.price);

    if (this.selectedFile) {
      formData.append('eventImage', this.selectedFile);
    }

    this.eventService.modifyEvent(this.event.id, formData).subscribe({
      next: (response) => {
        console.log('Evento modificado con éxito:', response);
        this.router.navigate(['admin']);
      },
      error: (err) => {
        console.error('Error al modificar el evento', err);
      }
    });
  }
}

