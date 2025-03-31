import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, MatButtonModule, MatToolbarModule, NavbarComponent, MatProgressSpinnerModule],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
})
export class AppComponent {
   title = 'RIU-Frontend-FernandoLamas';

   loadingService = inject(LoadingService);
}
