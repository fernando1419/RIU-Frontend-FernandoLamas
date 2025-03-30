import { Routes } from '@angular/router';

export const routes: Routes = [
   // { path: '', component: SuperheroListComponent },
   { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
   {
      path: 'superheroes',
      loadComponent: () => import('src/app/components/superheroes/superhero-list/superhero-list.component').then(m => m.SuperheroListComponent),
   },
   {
      path: 'superheroes/add',
      loadComponent: () => import('src/app/components/superheroes/superhero-add/superhero-add.component').then(m => m.SuperheroAddComponent),
   },
   {
      path: 'superheroes/edit/:id',
      loadComponent: () => import('src/app/components/superheroes/superhero-edit/superhero-edit.component').then(m => m.SuperheroEditComponent),
   },
   { path: '**', redirectTo: '/' }, // 404
];
