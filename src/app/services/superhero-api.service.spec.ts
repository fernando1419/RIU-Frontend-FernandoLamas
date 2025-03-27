import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Superhero } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

describe('SuperheroApiService', () => {
   let service: SuperheroApiService;
   let httpTesting: HttpTestingController;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [provideHttpClient(), provideHttpClientTesting(), SuperheroApiService],
      });
      service = TestBed.inject(SuperheroApiService);
      httpTesting = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      httpTesting.verify();
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('getAllHeroes()', () => {
      it('should return a list of superheroes', () => {
         const fakeHeroes: Superhero[] = [
            { id: 1, name: 'Superman', powers: ['Flight', 'Fight'] },
            { id: 2, name: 'Batman', powers: ['Technology'] },
            { id: 3, name: 'Robin', powers: ['Elasticity', 'Genius intellect'] },
         ] as Superhero[];

         service.getAllHeroes().subscribe((heroes) => {
            expect(heroes).toEqual(fakeHeroes);
            expect(heroes.length).toBe(3);
         });

         const req = httpTesting.expectOne('http://localhost:3000/superheroes'); // intercepts the request before a real request is made.
         expect(req.request.method).toBe('GET');
         req.flush(fakeHeroes); // simulates the response from server using fake data.
      });
   });

   describe('getHeroById()', () => {
      it('should return a superhero', () => {
         const fakeHero: Superhero = { id: 1, name: 'Superman', powers: ['Flight', 'Fight'] } as Superhero;

         service.getHeroById(1).subscribe((hero) => {
            expect(hero).toEqual(fakeHero);
         });

         const req = httpTesting.expectOne('http://localhost:3000/superheroes/1');
         expect(req.request.method).toBe('GET');
         req.flush(fakeHero);
      });

      it('should return an error if hero is not found', () => {
         const nonExistingHeroId = 999999;
         service.getHeroById(nonExistingHeroId).subscribe({
            next: () => fail('Expected an error, not a hero'),
            error: (error) => {
               expect(error instanceof HttpErrorResponse).toBeTrue();
               expect(error.status).toBe(404);
               expect(error.statusText).toBe('Not Found');
               expect(error.message).toContain('404 Not Found');
            },
         });

         const req = httpTesting.expectOne(`http://localhost:3000/superheroes/${nonExistingHeroId}`);
         expect(req.request.method).toBe('GET');
         req.flush('Not Found', { status: 404, statusText: 'Not Found' });

         expect(service.errorMessage()).toBe('Not Found. The resource you are looking for does not exist.');
      });
   });
});

