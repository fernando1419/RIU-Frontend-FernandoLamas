import { Component, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-show',
   standalone: true,
   imports: [MatCardModule, MatButtonModule],
   templateUrl: './superhero-show.component.html',
   styleUrl: './superhero-show.component.scss',
})
export class SuperheroShowComponent {
   private route = inject(ActivatedRoute);
   private superheroApiService = inject(SuperheroApiService);
   router = inject(Router);
   heroId = computed(() => this.route.snapshot.paramMap.get('id'));
   protected hero!: Superhero;

   constructor() {
      effect(() => {
         const id = this.heroId();
         if (id) {
            this.superheroApiService.getHeroById(id).subscribe({
               next: (hero) => this.hero = hero,
               error: (err) => console.error('Error fetching hero:', err),
            });
         }
      }, { allowSignalWrites: true });
   }

   protected navigateToHeroesList(): void {
      this.router.navigate(['/superheroes']);
   }
}
