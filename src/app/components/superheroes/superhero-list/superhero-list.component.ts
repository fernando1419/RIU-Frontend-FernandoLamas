import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
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
   imports: [MatTableModule, MatPaginator, MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatInputModule],
   templateUrl: './superhero-list.component.html',
   styleUrl: './superhero-list.component.scss',
})
export class SuperheroListComponent implements OnInit, AfterViewInit {
   displayedColumns: string[] = ['picture', 'name', 'realName', 'powers', 'universe', 'firstAppearance', 'team', 'actions'];

   dataSource = new MatTableDataSource<Superhero>([]);

   @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

   superheroApiService = inject(SuperheroApiService);

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
         console.log(data);
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
      });
   }
}
