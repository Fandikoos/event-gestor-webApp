import { Routes } from "@angular/router";

export default [
    {
        path: 'events',
        loadComponent: () => import('./components/event-list-for-users/event-list-for-users.component').then(c => c.EventListForUsersComponent),
    },

] as Routes