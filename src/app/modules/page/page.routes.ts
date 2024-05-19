import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ManagementComponent } from './management/management.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { activeGuard } from '../../core/guards/active.guard';
import { FavouritesComponent } from './favourites/favourites.component';

export const PAGE_ROUTES: Routes = [
    {
        path:'', 
        component: LayoutComponent, 
        children: [
            {path: '', component: HomeComponent},
            {path: 'details', component: DetailComponent},
            {path: 'management', component: ManagementComponent, canActivate: [AdminGuard]},
            {path: 'favourites', component: FavouritesComponent, canActivate: [activeGuard]},
            
        ]
    }
];