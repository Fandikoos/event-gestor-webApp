import { Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";

export default [
    {
        path: '',
        loadComponent: () => import('./components/event-list-for-users/event-list-for-users.component').then(c => c.EventListForUsersComponent),
    },
    {
        path: 'event-details/:id',
        loadComponent: () => import('./components/event-detail/event-detail.component').then(c => c.EventDetailComponent),
    },
    {
        path: 'myProfile/:id',
        loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [AuthGuard],
    }

] as Routes