import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { SuperheroListComponent } from 'src/app/components/superheroes/superhero-list/superhero-list.component';
@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, MatButtonModule, MatToolbarModule, SuperheroListComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
})
export class AppComponent {
   title = 'RIU-Frontend-FernandoLamas';
}
