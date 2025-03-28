import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Superhero, Universe } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

describe('SuperheroApiService', () => {
   let service: SuperheroApiService;
   let httpTesting: HttpTestingController;
   const API_URL: string = 'http://localhost:3000/superheroes';

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

         const req = httpTesting.expectOne(API_URL); // intercepts the request before a real request is made.
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

         const req = httpTesting.expectOne(`${API_URL}/1`);
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

         const req = httpTesting.expectOne(`${API_URL}/${nonExistingHeroId}`);
         expect(req.request.method).toBe('GET');
         req.flush('Not Found', { status: 404, statusText: 'Not Found' });

         expect(service.errorMessage()).toBe('Not Found. The resource you are looking for does not exist.');
      });
   });

   describe('addHero()', () => {
      it('should add a superhero', () => {
         const newHero: Superhero = {
            id: 100,
            name: 'New Superhero',
            realName: 'New Superhero real name',
            biography: 'Billionaire philanthropist who fights crime in Gotham City.',
            powers: ['Martial Arts', 'Stealth', 'High Intelligence', 'Gadgets'],
            universe: Universe.Dc,
            firstAppearance: 'Detective Comics #27',
            team: 'Justice League',
            aliases: ['The Dark Knight'],
            images: {
               xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg',
               sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg',
               md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg',
               lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg',
            },
            updatedAt: null,
            deletedAt: null,
         };

         service.addHero(newHero).subscribe((hero) => {
            expect(hero).toEqual(newHero);
         });

         const postRequest = httpTesting.expectOne(API_URL);
         expect(postRequest.request.method).toBe('POST');
         postRequest.flush(newHero);

         // refresh list after POST:
         const getRequest = httpTesting.expectOne(API_URL);
         expect(getRequest.request.method).toBe('GET');
         getRequest.flush([newHero]);
      });

      it('should return an error when required fields are missing', () => {
         const heroWithoutUniverse: Superhero = {
            name: 'new hero name',
            realName: 'new hero real name',
            powers: ['power1', 'power2'],
            // universe: Universe.Dc,
         } as Superhero;

         service.addHero(heroWithoutUniverse).subscribe({
            next: () => fail('Expected an error, but got a response'),
            error: (error) => {
               expect(error instanceof HttpErrorResponse).toBeTrue();
               expect(error.status).toBe(400);
               expect(error.statusText).toBe('Bad Request');
            },
         });

         const req = httpTesting.expectOne(API_URL);
         expect(req.request.method).toBe('POST');
         expect(req.request.body).toEqual(heroWithoutUniverse);

         req.flush({ message: 'Missing required fields' }, { status: 400, statusText: 'Bad Request' });
      });
   });
});

