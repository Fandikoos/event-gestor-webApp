import { Routes } from '@angular/router';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { ModifyEventComponent } from './components/events/modify-event/modify-event.component';

export const routes: Routes = [
    { path:'events', component: EventListComponent},
    { path:'events/add-event', component:AddEventComponent},
    { path:'events/modify-event/:id', component:ModifyEventComponent},
    { path: '**',redirectTo: 'events', pathMatch: 'full'}
];
