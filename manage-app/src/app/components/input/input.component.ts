import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
     <div
      class="input-content"
      (click)="changeFocus(true)"
      (focusout)="changeFocus()"
      [class.onfocus]="focus === true"
     >
      <div class="input-text">
        {{nameTitle | titlecase}}
        <span class="star">*</span>
      </div>
      <div class="focus">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    .star {
      color: red;
    }

    .input-content {
      position: relative;
      transition: 0.5s;
      transform-origin: bottom;
      background-color: inherit;
      color: white;
      width: 20rem;
      height: 3rem;
      border: 0.1rem solid $bg;
      border-radius: 0 0.5rem 0 0.5rem;
      &.onfocus .input-text {
          background-color: $header-bg;
          transform:translateY(-1.5rem) scale(80%);
      }
    }
    

    .input {
      position: absolute;
      height: 2rem;
      font-size: 1.2rem;
      z-index: 2;
      bottom: 0.5rem;
      right: 0.8rem;
      left: 0.8rem;
    }

    .input-text {
      position: absolute;
      bottom: 0.6rem;
      font-size: 1.2rem;
      left: 0.5rem;
      z-index: 1;
      transition: 0.3s;
      padding: 0 1rem;
    }
    .focused {
      background-color: $header-bg;
      transform:translateY(-1.5rem) scale(80%);
    }

    .onfocus {
      border: 0.1rem solid white;
    }
`]
})
export class InputComponent {

  @Input() nameTitle!: string | null;
  @Input() value!: any;

  public focus = false;

  changeFocus(isClick = false) {
    const value = this.value[this.nameTitle as string].value as string;
    if (!isClick && value.length === 0) {
      this.focus = !this.focus;
    }
    if (isClick && !this.focus) {
      this.focus = !this.focus;
    }
  }
}
