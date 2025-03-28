import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { ListSuperheroesComponent } from 'src/app/components/superheroes/list-superheroes/list-superheroes.component';
@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, MatButtonModule, MatToolbarModule, ListSuperheroesComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
})
export class AppComponent {
   title = 'RIU-Frontend-FernandoLamas';
}
