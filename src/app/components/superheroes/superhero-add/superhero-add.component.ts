import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuperheroPartialFormComponent } from 'src/app/components/superheroes/superhero-partial-form/superhero-partial-form.component';
import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-add',
   standalone: true,
   imports: [SuperheroPartialFormComponent],
   templateUrl: './superhero-add.component.html',
   styleUrls: ['./superhero-add.component.scss'],
})
export class SuperheroAddComponent {
   superheroApiService = inject(SuperheroApiService);
   router = inject(Router);
   snackBar: MatSnackBar = inject(MatSnackBar);

   saveHero(newHeroData: Superhero) {
      this.superheroApiService.addHero(newHeroData).subscribe({
         next: () => {
            this.snackBar.open(`Hero added successfully!`, 'Close', {
               duration: 5000,
               horizontalPosition: 'end',
               verticalPosition: 'bottom',
               panelClass: ['success-snackbar'],
            });
            this.router.navigate(['/superheroes']);
         },
         error: (err) => {
            this.snackBar.open('Error when trying to insert a hero', 'close', {
               duration: 5000,
               horizontalPosition: 'end',
               verticalPosition: 'bottom',
               panelClass: ['error-snackbar'],
            });
            console.error('Error updating hero:', err);
         },
      });
   }
}
