import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
    },
    {
        path: '',
        loadChildren: () => import('./user/user.routes'),
    },
    {
        path: '**',
        redirectTo: '/events',
        pathMatch: 'full',
    }

];
