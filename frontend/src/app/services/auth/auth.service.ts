import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { UserLogin } from '../../interfaces/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserRegister } from '../../interfaces/UserRegister';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public constructor(private httpClient : HttpClient) { }
  private isLogged = false;

  public isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    return this.isLogged;
  }

  public login(user: UserLogin): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/user/login', user, { responseType: 'text' as 'json', headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((response) => {
        this.isLogged = true;
        console.log(response);
        localStorage.setItem('token', response);
      }),
      map(() => "Success"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public register(user: UserRegister): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8080/user/register', user, { responseType: 'text' as 'json', headers: { 'Content-Type': 'application/json' } }).pipe(
      map(() => "Account created"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public isAdmin(): Observable<boolean> {
    return this.httpClient.get<boolean>('http://localhost:8080/user/isAdmin').pipe(
      map((response) => {
        if(response){
          localStorage.setItem('isAdmin', 'true');
        }else{
          localStorage.setItem('isAdmin', 'false');
        }

        return response;
      }), catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  
  public logout(): void {
    this.isLogged = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  public changePassword(newPassword: string): Observable<string> {
    console.log(newPassword);
    
    return this.httpClient.put<string>('http://localhost:8080/user/password', { password :newPassword }, { responseType: 'text' as 'json', headers: { 'Content-Type': 'application/json' } }).pipe(
      map(() => "Password changed"),
      catchError(() => {
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }
}
