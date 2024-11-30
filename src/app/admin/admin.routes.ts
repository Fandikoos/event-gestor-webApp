import { Routes } from "@angular/router";
import { AuthAdminGuard } from "../authAdmin.guard";

export default [
    {
        path: '',
        loadComponent: () => import('./components/event-list/event-list.component').then(c => c.default),
    },
    {
        path: 'add-event',
        loadComponent: () => import('./components/add-event/add-event.component').then(c => c.AddEventComponent),
        canActivate: [AuthAdminGuard],
    },
    {
        path: 'modify-event/:id',
        loadComponent: () => import('./components/modify-event/modify-event.component').then(c => c.ModifyEventComponent),
        canActivate: [AuthAdminGuard],
    },
] as Routes