import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public storageService: StorageService
  ) {}

  logout() {
    this.storageService.logoutUser();
    this.router.navigate(['/']);
  }
}