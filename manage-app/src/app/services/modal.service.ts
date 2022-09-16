import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isVisible: boolean = false;
  public text: string = '';
  public isColor: boolean = false;

  open(value: string, isColor = false) {
    this.isVisible = true;
    this.text = value;
    this.isColor = isColor;
  }

  close() {
    this.isVisible = false;
  }
}
