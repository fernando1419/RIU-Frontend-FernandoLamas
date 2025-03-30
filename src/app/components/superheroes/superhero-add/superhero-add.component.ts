import { Component, inject } from '@angular/core';
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

   saveHero(newHeroData: Superhero) {
      console.log('Form submitted', newHeroData);
      this.superheroApiService.addHero(newHeroData).subscribe(response => {
         console.log('Hero added:', response);
         // TODO: redirect to heroes list once routes are done.
      });
   }
}
