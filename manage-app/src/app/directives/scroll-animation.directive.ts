import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

interface OffSet {
  top: number
}

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective {

  private element = this.el.nativeElement;
  
  constructor(private el: ElementRef<HTMLElement>) { }

  @HostListener('window:scroll', ['$event']) getHoist() {
    const elementOffset = this.offset(this.element).top;
    const animActive = window.innerHeight - 50;

    if (elementOffset > animActive) {
      this.checkBlock();
    } else {
      return;
    }
  }

  offset(el: HTMLElement): OffSet {
    const rect = el.getBoundingClientRect();
    return { top: rect.top };
  }

  checkBlock() {
    const isBlock = this.element.classList.contains('block');
    if (isBlock) {
      if (this.element.dataset.left) {
        this.animationBlockLeft();
      } else {
        this.animationBlockRight();
      }
    } else {
      this.animation();
    }
  }

  animation() {
    this.createAnimation('translate(0%, 80%)');
  }

  animationBlockLeft() {
    this.createAnimation('translate(-50%, 0%)');
  }

  animationBlockRight() {
    this.createAnimation('translate(50%, 0%)');
  }

  createAnimation(transform: string) {
    this.el.nativeElement.animate(
      [
        {
          transform: transform,
          opacity: '0'
        },
        {
          transform: 'translate(0)',
          opacity: '1'
        },
      ],
      {
        duration: 1000,
        easing: 'ease-in-out',
        iterations: 1,
      }
    );
  }
}