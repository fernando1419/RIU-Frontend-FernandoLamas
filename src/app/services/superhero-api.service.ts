import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Superhero } from 'src/app/models/superhero.interface';

const API_URL: string = 'http://localhost:3000/superheroes';

@Injectable({
   providedIn: 'root',
})
export class SuperheroApiService {
   public superheroes = signal<Superhero[]>([]);

   public errorMessage = signal<string | null>(null);

   constructor(private http: HttpClient) { }

   getAllHeroes(): Observable<Superhero[]> {
      return this.http.get<Superhero[]>(API_URL).pipe(
         catchError((error) => this.handleError(error)),
         tap((heroes) => this.superheroes.set(heroes)),
      );
   }

   getHeroById(id: number): Observable<Superhero> {
      return this.http.get<Superhero>(`${API_URL}/${id}`).pipe(
         catchError(error => this.handleError(error)),
      );
   }

   addHero(hero: Superhero): Observable<Superhero> {
      return this.http.post<Superhero>(API_URL, hero).pipe(
         catchError((error) => this.handleError(error)),
         tap(() => this.refreshHeroes()),
      );
   }

   private refreshHeroes() {
      this.getAllHeroes().subscribe();
   }

   private handleError(error: HttpErrorResponse) {
      console.error('API Error:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      if (error.status === 400) {
         errorMessage = 'Bad Request. Please check your input.';
      } else if (error.status === 404) {
         errorMessage = 'Not Found. The resource you are looking for does not exist.';
      } else if (error.status >= 500) {
         errorMessage = 'Server Error. Please try again later.';
      }

      this.errorMessage.set(errorMessage);

      return throwError(() => new HttpErrorResponse({
         error: errorMessage,
         status: error.status,
         statusText: error.statusText,
         url: error.url ?? undefined,
      }));
   }
}
