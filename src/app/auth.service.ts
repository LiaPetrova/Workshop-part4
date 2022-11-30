import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces';
import { CreateUserDto } from './core/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined);

  currentUser$ = this._currentUser.asObservable();

  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private httpClient: HttpClient) { }

  authenticate(): Observable<IUser> {
    return this.httpClient
    .get<IUser>(`${environment.apiUrl}/users/profile`, {withCredentials: true})
    .pipe(tap(currentProfile => this.hadleLogin(currentProfile)), catchError((err) => {
      return EMPTY;
    }));
  }

  login$(userdata: {email: string, password: string}): Observable<IUser> {
    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/login`, userdata, {withCredentials: true, observe: 'response'})
    .pipe(
      map(response => response.body),
    )
  }

  logout$(): Observable<void> {
    return this.httpClient
    .post<void>(`${environment.apiUrl}/logout`, {}, {withCredentials: true});
  }

  register$( userdata: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userdata, {withCredentials: true});
  }

  hadleLogin(newUser: IUser) {
     this._currentUser.next(newUser);
    console.log(newUser); 
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }
}
