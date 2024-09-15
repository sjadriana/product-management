import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { provideTranslate } from './app.translate';
import { NgModule } from '@angular/core';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideHttpClient(), // HTTP client provider
    provideTranslate(), // Import TranslateModule configuration
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
