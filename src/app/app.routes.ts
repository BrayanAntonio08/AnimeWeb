import { Routes } from '@angular/router';
import { sessionGuard } from './core/guards/session.guard';

export const routes: Routes = [
    {path:'', loadChildren:() => import('./modules/page/page.routes').then(m => m.PAGE_ROUTES)},
    {
        path:'auth', 
        loadChildren:() => import('./modules/auth/auth.routes')
        .then(m => m.AUTH_ROUTES),
        canActivate: [sessionGuard]
    },
];
