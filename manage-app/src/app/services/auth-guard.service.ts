import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService) { }
  canActivate(): boolean {
    return this.storageService.hasToken();
  }
}
