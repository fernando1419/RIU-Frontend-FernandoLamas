import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, MatButtonModule, MatToolbarModule, NavbarComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
})
export class AppComponent {
   title = 'RIU-Frontend-FernandoLamas';
}
