import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

export interface CreateUserDto {username: string, email: string, tel?: string, password: string};

@Injectable()
export class UserService {

  currentUser: IUser;
  get isLogged() {
    return (!!this.currentUser);
  }

  constructor(private storage: StorageService, private httpClient: HttpClient) {
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient
    .get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
    .pipe(tap(user => this.currentUser = user));
  }

}

