import { provideHttpClient, withFetch } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

import { SuperheroListComponent } from 'src/app/components/superheroes/superhero-list/superhero-list.component';

class MockSuperheroesService {
   getAllHeroes() { // it must be called exactly 'getAllHeroes' as it is called in the real service.
      return of([
         { id: 1, name: 'Batman', realName: 'Bruce Wayne', powers: ['Stealth'], universe: 'DC', firstAppearance: 'Batman #1' },
         { id: 2, name: 'Iron Man', realName: 'Tony Stark', powers: ['Genius'], universe: 'Marvel', firstAppearance: 'Iron Man #1' },
      ]);
   }
}

describe('SuperheroListComponent', () => {
   let fixture: ComponentFixture<SuperheroListComponent>;
   let component: SuperheroListComponent;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            SuperheroListComponent,
            RouterLink,
            MatTableModule,
            MatPaginatorModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatButtonModule,
            MatChipsModule,
            FormsModule,
            NoopAnimationsModule,
         ],
         providers: [
            provideRouter([]), // replaces RouterTestingModule from Angular 17+
            provideHttpClient(withFetch()),  // inject HttpClient for tests
            {
               provide: ActivatedRoute,
               useValue: { paramMap: of({ get: () => '1' }) }, // Mock for ActivatedRoute
            },
            { provide: SuperheroApiService, useClass: MockSuperheroesService }, // replace my service with mock.
         ],
      }).compileComponents();

      fixture = TestBed.createComponent(SuperheroListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => { expect(component).toBeTruthy(); });

   it('should use the mocked service instead of the real service', () => {
      const injectedService = component.superheroApiService;
      console.log({ injectedService }); // LOG: Object{injectedService: MockSuperheroesService{}}

      expect(injectedService instanceof MockSuperheroesService).toBeTrue();
   });

   it('should render an input field for searching heroes', () => {
      const searchInput = fixture.debugElement.query(By.css('input#search-superhero-input[matInput]'));
      expect(searchInput).toBeTruthy();
   });

   it('should render a button for adding a superhero', () => {
      const addButton = fixture.debugElement.query(By.css('button#add-superhero-button[routerLink="/superheroes/add"]'));
      expect(addButton).toBeTruthy();
   });

   it('should display data in the table loaded from service', () => {
      const rows = fixture.debugElement.queryAll(By.css('table#superheroes-table tr'));
      expect(rows.length).toBe(3); // 1 header + 2 records

      const heroNames = fixture.debugElement.queryAll(By.css('td'));
      expect(heroNames.some(td => td.nativeElement.textContent.includes('Batman'))).toBeTrue();
      expect(heroNames.some(td => td.nativeElement.textContent.includes('Iron Man'))).toBeTrue();
   });

   it(`should render a table for displaying superheroes, containing 1 row and 8 columns with names: "Picture, Name, Real Name, Powers, 
      Universe, First Appearance, Team, Actions"`, () => {
      const table = fixture.debugElement.query(By.directive(MatTable));
      expect(table).toBeTruthy();

      const tableRows = fixture.debugElement.queryAll(By.css('table#superheroes-table tr'));
      expect(tableRows.length).toBe(3);

      const columnHeaders = fixture.debugElement.queryAll(By.css('table#superheroes-table th'));
      expect(columnHeaders.length).toBe(8);

      const expectedColumnNames = ['Picture', 'Name', 'Real Name', 'Powers', 'Universe', 'First Appearance', 'Team', 'Actions'];
      const headerTexts = columnHeaders.map(header => header.nativeElement.textContent.trim());
      expect(headerTexts).toEqual(expectedColumnNames);
   });

   it('should render a table with a paginator for navigating between pages', () => {
      const table = fixture.debugElement.query(By.directive(MatTable));
      expect(table).toBeTruthy();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator).toBeTruthy();
   });

   it('should render an edit button for each data row of the table', () => {
      const editButtons = fixture.debugElement.queryAll(By.css('button[mat-mini-fab][color="primary"][aria-label="Edits a superhero"]'));
      expect(editButtons.length).toBe(2); // 1 edit button per row
   });

   it('should render a delete button for each data row of the table', () => {
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[mat-mini-fab][color="primary"][aria-label="Deletes a superhero"]'));
      expect(deleteButtons.length).toBe(2); // 1 delete button per row
   });

   it('should have the correct routerLink for adding a superhero', () => {
      const addButton = fixture.debugElement.query(By.css('button#add-superhero-button'));
      expect(addButton.attributes['routerLink']).toBe('/superheroes/add');
   });

   it('should have the correct routerLink for editing a superhero', () => {
      const editButtons = fixture.debugElement.queryAll(By.css('button[aria-label="Edits a superhero"]'));
      expect(editButtons[0]).toBeTruthy(); // edit button1
      expect(editButtons[1]).toBeTruthy(); // edit button2

      const routerLink1 = editButtons[0].attributes['ng-reflect-router-link'];
      expect(routerLink1).toEqual('/superheroes/edit,1');

      const routerLink2 = editButtons[1].attributes['ng-reflect-router-link'];
      expect(routerLink2).toEqual('/superheroes/edit,2');
   });

   it('should call deleteHero() method when user clicks on the delete button', () => {
      spyOn(component, 'deleteHero');

      const deleteButtons = fixture.debugElement.queryAll(By.css('button[aria-label="Deletes a superhero"]'));
      expect(deleteButtons).toBeTruthy();
      expect(deleteButtons.length).toBe(2);

      deleteButtons[0].nativeElement.click();
      expect(component.deleteHero).toHaveBeenCalled();
   });

   it('should filter superheroes when user types in the search field', () => {
      component.filterValue = 'Bat';
      component.filterHeroes();
      fixture.detectChanges();
      const rows = fixture.debugElement.queryAll(By.css('table#superheroes-table tr'));

      expect(rows.some(row => row.nativeElement.textContent.includes('Batman'))).toBeTrue();
      expect(rows.length).toBe(2); // 1 header + 1 record
   });

   it('should clear the filter when user clicks on the clear button', () => {
      component.filterValue = 'Bat';
      fixture.detectChanges();

      spyOn(component, 'clearFilter');

      const clearButton = fixture.debugElement.query(By.css('button#clear-search-button'));
      clearButton.nativeElement.click();

      expect(component.clearFilter).toHaveBeenCalled();
   });
});
