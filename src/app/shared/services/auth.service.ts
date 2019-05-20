import { Injectable } from '@angular/core';
import { User } from './../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authtoken: any = null
  refreshtoken: any = null

  constructor( private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user)
  }

  login(user: User): Observable<{authtoken: string, refreshtoken: string}> {
    return this.http.post<{authtoken: string, refreshtoken: string}>('api/auth/login', user)
    .pipe(
      tap(({authtoken, refreshtoken}) => {
        console.log('authtoken :', authtoken);
        console.log('refreshtoken :', refreshtoken);
        localStorage.setItem('auth-token', authtoken)
        localStorage.setItem('refresh-token', refreshtoken)
      })
    )
  }

  refresh(refreshtoken: string): Observable<{authtoken: string, refreshtoken: string}> {
    return this.http.post<{authtoken: string, refreshtoken: string}>('api/auth/refresh', refreshtoken)
  }

}
