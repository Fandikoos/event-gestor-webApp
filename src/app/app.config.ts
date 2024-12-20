import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { interceptorInterceptor } from './core/interceptor/interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([interceptorInterceptor])), provideAnimationsAsync(),
    ]
};


