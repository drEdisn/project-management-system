import { ScrollAnimationDirective } from './../../directives/scroll-animation.directive';
import { RouterModule } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, ScrollAnimationDirective],
  templateUrl: './main.component.html',
  styleUrls: [
    './styles/main.component.scss',
    './styles/_hero.scss',
    './styles/_links.scss',
    './styles/_info.scss',
    './styles/_course.scss',
    './styles/_creater.scss'
  ],
})
export class MainComponent {

  constructor(
    public storageService: StorageService,
    private translate: TranslateService
  ) {}
  
  ngOnInit() {
    const current = this.translate.currentLang;
    setTimeout(() => this.storageService.textWrite.textWriting(current), 1000);
  }
}
