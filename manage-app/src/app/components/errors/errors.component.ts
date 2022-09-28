import { TranslateModule } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent {

  @Input() isLite: boolean = false;
  @Input() bottom: string = 'bottom: -1.6rem;';
  @Input() touched!: boolean;
  @Input() errors!: any;
}
