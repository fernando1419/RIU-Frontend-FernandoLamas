import { Routes } from '@angular/router';
import { heroNotFoundGuard } from 'src/app/guards/hero-not-found.guard';

export const routes: Routes = [
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
      canActivate: [heroNotFoundGuard],
   },
   {
      path: 'superheroes/:id',
      loadComponent: () => import('src/app/components/superheroes/superhero-show/superhero-show.component').then(m => m.SuperheroShowComponent),
      canActivate: [heroNotFoundGuard],
   },
   {
      path: 'about',
      loadComponent: () => import('src/app/pages/about/about.component').then(m => m.AboutComponent),
   },
   {
      path: '**',
      loadComponent: () => import('src/app/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
   },
];
