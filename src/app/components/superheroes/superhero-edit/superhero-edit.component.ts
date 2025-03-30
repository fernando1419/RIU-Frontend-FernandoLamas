import { Component, inject, OnInit } from '@angular/core';
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
export class SuperheroEditComponent implements OnInit {
   protected heroDataFromDB: Superhero | null = null;

   superheroApiService = inject(SuperheroApiService);

   ngOnInit(): void {
      const heroId = 10; // TODO: get hero id from route or heroesList
      if (heroId) {
         this.superheroApiService.getHeroById(heroId).subscribe((hero) => {
            this.heroDataFromDB = hero;
            // console.log(this.heroDataFromDB);
         });
      }
   }

   updateHero(editedHeroData: Superhero) {
      // const heroId = this.route.snapshot.paramMap.get('id'); // TODO: get hero id from route or list
      if (this.heroDataFromDB) {
         this.superheroApiService.updateHero(this.heroDataFromDB.id, editedHeroData).subscribe((result) => {
            console.log('Hero updated:', result);
            // this.router.navigate(['/heroes']);
         });
      }
   }
}
