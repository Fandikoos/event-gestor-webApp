import { Routes } from '@angular/router';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';

export const routes: Routes = [
    { path:'events', component: EventListComponent},
    { path:'events/add-event', component:AddEventComponent},
    { path: '**',redirectTo: '', pathMatch: 'full'}
];
