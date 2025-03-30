import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';

import { RouterLink } from '@angular/router';
import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-list',
   standalone: true,
   imports: [
      MatTableModule,
      MatPaginator,
      MatButtonModule,
      MatIconModule,
      MatChipsModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      RouterLink,
   ],
   templateUrl: './superhero-list.component.html',
   styleUrl: './superhero-list.component.scss',
})
export class SuperheroListComponent implements OnInit, AfterViewInit {
   displayedColumns: string[] = ['picture', 'name', 'realName', 'powers', 'universe', 'firstAppearance', 'team', 'actions'];
   dataSource = new MatTableDataSource<Superhero>([]);
   superheroApiService = inject(SuperheroApiService);
   protected filterValue: string = '';

   snackBar: MatSnackBar = inject(MatSnackBar);
   dialog: MatDialog = inject(MatDialog);

   @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

   ngOnInit(): void {
      this.fetchSuperheroes();
   }

   ngAfterViewInit(): void {
      if (this.paginator) {
         this.paginator.pageSize = 5;
         this.dataSource.paginator = this.paginator;
      }
   }

   fetchSuperheroes(): void {
      this.superheroApiService.getAllHeroes().subscribe(data => {
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
         this.dataSource.filterPredicate = (heroes: Superhero, filter: string) =>
            heroes.name.toLowerCase().includes(filter); // filter by hero's name.
      });
   }

   protected filterHeroes(): void {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   protected clearFilter(): void {
      this.filterValue = '';
      this.filterHeroes();
   }

   deleteHero(hero: Superhero): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         data: {
            title: 'Delete Hero',
            message: `Are you sure you want to delete hero: "${hero.name}"?`,
            buttonTextCancel: 'No',
            buttonTextConfirm: 'Yes',
         },
      });

      dialogRef.afterClosed().subscribe(result => {
         if (result) {
            this._handleDeletion(hero);
         }
      });
   }

   private _handleDeletion(hero: Superhero): void {
      this.superheroApiService.deleteHero(hero.id).subscribe({
         next: () => {
            this.dataSource.data = this.dataSource.data.filter(h => h.id !== hero.id);
            this.snackBar.open(`${hero.name} deleted successfully!`, 'Close', {
               duration: 5000,
               horizontalPosition: 'end',
               verticalPosition: 'bottom',
               panelClass: ['success-snackbar'],
            });
            setTimeout(() => this.clearFilter(), 1000);
         },
         error: (err) => {
            console.error('Error deleting hero:', err);
            this.snackBar.open(`Error when trying to delete hero: ${hero.name}`, 'close', {
               duration: 5000,
               horizontalPosition: 'end',
               verticalPosition: 'bottom',
               panelClass: ['error-snackbar'],
            });
         },
      });
   }
}
