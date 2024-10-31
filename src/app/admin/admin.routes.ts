import { Routes } from "@angular/router";

export default [
    {
        path: 'events',
        loadComponent: () => import('./components/event-list/event-list.component').then(c => c.default),
    },
    {
        path: 'add-event',
        loadComponent: () => import('./components/add-event/add-event.component').then(c => c.AddEventComponent),
    },
    {
        path: 'modify-event/:id',
        loadComponent: () => import('./components/modify-event/modify-event.component').then(c => c.ModifyEventComponent),
    },
] as Routes