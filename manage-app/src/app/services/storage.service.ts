import { Injectable } from '@angular/core';
import { User } from '../modules/interfacies';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public token: string | null = localStorage.getItem('token');
  public user: User | null = JSON.parse(localStorage.getItem('user') as string);
  public password: string | null = localStorage.getItem(`${this.token}`);

  setToken(value: string) {
    localStorage.setItem('token', value);
    this.token = value;
  }

  serPassword(value: string) {
    localStorage.setItem(`${this.token}`, value);
  }

  logoutUser() {
    localStorage.clear();
    this.token = null;
    this.user = null;
    this.password = null;
  }

  hasToken() {
    return this.token !== null ? true : false;
  }

  setUser(body: User) {
    this.user = body;
    localStorage.setItem('user', JSON.stringify(body));
  }

}
