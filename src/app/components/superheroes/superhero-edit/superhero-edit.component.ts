import { Component, computed, effect, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroPartialFormComponent } from 'src/app/components/superheroes/superhero-partial-form/superhero-partial-form.component';
import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-edit',
   standalone: true,
   imports: [SuperheroPartialFormComponent],
   templateUrl: './superhero-edit.component.html',
   styleUrl: './superhero-edit.component.scss',
})
export class SuperheroEditComponent {
   // protected heroId: number | string | null = null;
   heroId = computed(() => this.route.snapshot.paramMap.get('id')); // because json-server generates ids like: "1aDfa"
   protected heroDataFromDB: Superhero | null = null;

   private route = inject(ActivatedRoute);
   private router = inject(Router);
   snackBar: MatSnackBar = inject(MatSnackBar);

   private superheroApiService = inject(SuperheroApiService);

   constructor() {
      effect(() => {
         const id = this.heroId();
         if (id) {
            this.superheroApiService.getHeroById(id).subscribe({
               next: (hero) => this.heroDataFromDB = hero,
               error: (err) => console.error('Error fetching hero:', err),
            });
         }
      }, { allowSignalWrites: true });
   }

   updateHero(editedHeroData: Superhero) {
      if (this.heroDataFromDB) {
         this.superheroApiService.updateHero(this.heroDataFromDB.id, editedHeroData).subscribe({
            next: () => {
               this.snackBar.open(`Hero edited successfully!`, 'Close', {
                  duration: 5000,
                  horizontalPosition: 'end',
                  verticalPosition: 'bottom',
                  panelClass: ['success-snackbar'],
               });
               this.router.navigate(['/superheroes']); // update successful
            },
            error: (err) => {
               this.snackBar.open('Error when trying to edit hero', 'close', {
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
}
