import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withPreloading(PreloadAllModules)), // pre-loads all LAZY-LOADED routes in background after application starts.
      provideClientHydration(),
      provideAnimationsAsync(),
      provideHttpClient(),
      provideHttpClient(withFetch()), // fixes Angular NG02801 warning.
   ],
};
