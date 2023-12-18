import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { store } from './user.store';
import { selectAllEntities, setEntities } from '@ngneat/elf-entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = store.pipe(selectAllEntities());
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<IUser[]>(`${environment.apiAuth}/get-all`).pipe(
      tap((users) => {
        store.update(setEntities(users));
      })
    );
  }
}
