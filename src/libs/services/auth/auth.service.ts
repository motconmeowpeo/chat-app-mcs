import { Injectable } from '@angular/core';
import { store } from './auth.store';
import { select } from '@ngneat/elf';
import { IAuth, ICreateUser, ILogin, IToken, IUser } from 'src/libs/models';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = store.pipe(select((state) => state.user));
  accessToken$ = store.pipe(select((state) => state.accessToken));

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  signUp(payload: Partial<ICreateUser>): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${environment.apiAuth}/sign-up`,
      payload
    );
  }

  verifyCode(email: string, code: string): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiAuth}/verify`, {
      code,
      email,
    });
  }

  signIn(payload: Partial<ILogin>): Observable<IAuth> {
    return this.httpClient
      .post<IToken>(`${environment.apiAuth}/sign-in`, payload)
      .pipe(
        map(({ accessToken }) => {
          return {
            accessToken,
            user: this.jwtService.decodeToken<IUser>(String(accessToken)),
          };
        }),
        tap((user) => {
          store.update((state) => ({ ...state, ...user }));
        })
      );
  }

  logOut() {
    store.reset();
  }
}
