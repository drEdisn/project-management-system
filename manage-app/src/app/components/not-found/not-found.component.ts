import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container not-found">
      <img class="not-found__image" src="./assets/404-error.png" alt="404">
    </div>
  ` ,
  styles: [`
    .not-found {
      min-height: calc(100% - 9.2rem);
      display: flex;
      justify-content: center;
      align-items: center;
      &__image {
        max-width: 600px;
        width: 100%;
      }
    }
  `]
})
export class NotFoundComponent {}
