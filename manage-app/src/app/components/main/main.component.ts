import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: [
    './styles/main.component.scss',
    './styles/_hero.scss',
    './styles/_links.scss',
    './styles/_info.scss',
    './styles/_course.scss'
  ]
})
export class MainComponent {

}
