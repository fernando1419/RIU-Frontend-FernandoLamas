import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { loadingInterceptor } from 'src/app/interceptors/loading.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withPreloading(PreloadAllModules)),
      provideAnimationsAsync(),
      provideHttpClient(),
      provideHttpClient(withInterceptors([loadingInterceptor])),
      provideHttpClient(withFetch()), // fixes Angular NG02801 warning.
   ],
};
