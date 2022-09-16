import { StorageService } from './storage.service';
import { Auth } from 'src/app/modules/enums';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../modules/enums';
import { Signup, Signin } from '../modules/interfacies';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  createUser(body: Signup) {
    return this.http.post(`${Api.url}${Auth.signup}`, body);
  }

  loginUser(body: Signin) {
    this.storageService.password = body.password;
    return this.http.post(`${Api.url}${Auth.singin}`, body);
  }

  getUser(id: string) {
    return this.http.get(`${Api.url}${Api.user}${id}`);
  }

  changeUser(id: string, body: Signup) {
    return this.http.put(`${Api.url}${Api.user}${id}`, body);
  }

  removeUser(id: string) {
    this.http.delete(`${Api.url}${Api.user}${id}`);
  }
}
