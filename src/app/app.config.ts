import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

const config: SocketIoConfig = { url: 'http://localhost:17002', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      SocketIoModule.forRoot(config),
      JwtModule.forRoot({ config: { tokenGetter: () => '' } }),
      HttpClientModule
    ),
  ],
};
