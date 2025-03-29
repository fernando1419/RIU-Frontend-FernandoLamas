import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-list',
   standalone: true,
   imports: [MatTableModule, MatPaginator, MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatInputModule, FormsModule],
   templateUrl: './superhero-list.component.html',
   styleUrl: './superhero-list.component.scss',
})
export class SuperheroListComponent implements OnInit, AfterViewInit {
   displayedColumns: string[] = ['picture', 'name', 'realName', 'powers', 'universe', 'firstAppearance', 'team', 'actions'];

   dataSource = new MatTableDataSource<Superhero>([]);

   superheroApiService = inject(SuperheroApiService);

   protected filterValue: string = '';

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
}
