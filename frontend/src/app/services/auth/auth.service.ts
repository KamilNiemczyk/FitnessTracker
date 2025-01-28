import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  private isLogged = true;

  public isLoggedIn(): boolean {
    return this.isLogged;
  }
}
