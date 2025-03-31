import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

export const heroEditGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
   const superheroApiService = inject(SuperheroApiService);
   const router = inject(Router);
   const snackBar = inject(MatSnackBar);

   const heroId = route.paramMap.get('id');

   if (!heroId) {
      showErrorMessage('Invalid hero ID.', snackBar);
      router.navigate(['/superheroes']);
      return of(false);
   }

   return superheroApiService.getHeroById(heroId).pipe(
      map(hero => {
         if (hero) { return true; }
         showErrorMessage('Hero not found.', snackBar);
         router.navigate(['/superheroes']);
         return false;
      }),
      catchError(() => {
         showErrorMessage('Failed to get hero.', snackBar);
         router.navigate(['/superheroes']);
         return of(false);
      }),
   );
};

const showErrorMessage = (message: string, snackBar: MatSnackBar) => {
   snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
   });
};
