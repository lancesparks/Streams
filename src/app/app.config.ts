import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideRouter,
  PreloadAllModules,
  withPreloading,
} from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { authInterceptor } from "./services/authService.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
