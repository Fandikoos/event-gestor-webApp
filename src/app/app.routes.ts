import { Routes } from '@angular/router';
import { AuthAdminGuard } from './authAdmin.guard';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
        canActivate: [AuthAdminGuard],
    },
    {
        path: '',
        loadChildren: () => import('./user/user.routes'),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }

];
