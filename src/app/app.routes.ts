import { Routes } from '@angular/router';
import { EventListComponent } from './components/events/event-list/event-list.component';

export const routes: Routes = [
    { path:'events', component: EventListComponent},
    { path: '**',redirectTo: '', pathMatch: 'full'}
];
