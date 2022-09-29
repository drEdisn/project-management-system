import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private route: Router
  ) { }

  canActivate(): boolean {
    return this.checkRedirect();
  }

  checkRedirect() {
    if (!this.storageService.hasToken()) {
      this.route.navigate(['/not-found']);
      return false;
    }
    return true;
  }
}
