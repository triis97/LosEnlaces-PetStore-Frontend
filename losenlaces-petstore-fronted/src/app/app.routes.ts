import { Routes } from '@angular/router';
import { PetDashboardComponent } from './components/pet-dashboard/pet-dashboard.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';

export const routes: Routes = [
    {
        path: 'edit-pet/:name',
        component: EditPetComponent,
        title: 'Pet Form'
    },
    {
        path: 'edit-pet',
        component: EditPetComponent,
        title: 'Pet Form'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: PetDashboardComponent,
        title: 'Pet Dashboard'
    }
];
