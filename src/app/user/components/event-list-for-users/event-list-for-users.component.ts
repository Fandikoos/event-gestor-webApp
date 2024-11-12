import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MapComponent } from "../../../shared/map/map.component";
import { EventsUserService } from '../../services/events-users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list-for-users',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RouterLink,
    FormsModule,
],
  templateUrl: './event-list-for-users.component.html',
  styleUrl: './event-list-for-users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListForUsersComponent{

  private eventService = inject(EventsUserService);

  private events$ = this.eventService.getAllEvents();
  public events = toSignal(this.events$);

  // Almacenamos la categoria seleccionada del filtrador
  public selectedCategory = signal<string>('');

  // Computed para recalcular automaticamente cada vez que cambien las otras señales (selcetedCategory y events)
  public filteredEvents = computed(()=> {
    const category = this.selectedCategory();
    const allEvents = this.events();

    if(!allEvents){
      return []
    }
    if(category === ''){
      return allEvents;
    }

    // Filtramos eventos segun la categoria seleccioanda
    return allEvents.filter(event => event.category === category);
  })

  onCategoryChange(event: Event){
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedCategory.set(selectedElement.value);
  }



}
