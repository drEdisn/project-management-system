import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoaderService } from './../../services/loader.service';
import { SearchService } from './../../services/search.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuInOut', [
      state('start', style({
        transform: 'translateX(-90%)',
        opacity: 0,
        height: '0%'
      })),
      state('end', style({
        transform: 'translateX(0%)',
        opacity: 1,
        height: 'calc(100% - 5rem)'
      })),
      transition('start => end', [
        animate('1s ease', style({
          height: 'calc(100% - 5rem)',
          opacity: 1,
        })),
        animate('1s ease', style({
          height: 'calc(100% - 5rem)',
          opacity: 1,
          transform: 'translateX(0%)'
        })),
      ]),
      transition('end => start', [
        animate('1s ease', style({
          transform: 'translateX(-90%)',
          opacity: 1,
        })),
        animate('1s ease', style({
          height: '0%',
          opacity: 0,
          transform: 'translateX(-90%)',
        })),
      ])
    ])
  ]
})
export class HeaderComponent {

  public isFocus = false;
  public isMenu = 'start';
  public searchString = '';

  constructor(
    public storageService: StorageService,
    public translate: TranslateService,
    public searchService: SearchService,
    public loaderService: LoaderService,
    public route: Router,
  ) {}

  logout() {
    this.storageService.logoutUser();
  }

  changeLang(event: Event) {
    const opt = event.target as HTMLSelectElement;
    this.translate.use(opt.value);
    this.storageService.textWrite.textWriting(opt.value);
  }

  search() {
    this.searchService.filter(this.searchString);
  }

  changeFocusOn() {
    this.isFocus = true;
    this.getAllTasks();
  }

  changeFocusOff() {
    setTimeout(() => this.isFocus = false, 500);
  }

  getAllTasks() {
    this.searchService.getAllTasks();
  }

  menuOff() {
    this.isMenu = 'start';
  }

  menuSwitch(e: Event) {
    e.stopPropagation();
    this.isMenu = this.isMenu === 'start' ? 'end' : 'start';
  }

  falsyClick(e: Event) {
    e.stopPropagation();
  }
}