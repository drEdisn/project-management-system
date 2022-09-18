import { Tasks } from 'src/app/modules/interfacies';
import { Injectable } from '@angular/core';
import { ModalAdd } from '../modules/types';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {

  public isVisible = false;
  public isChange = false;
  public boardId: string | undefined;
  public columnId: string | undefined;
  public taskId: string | undefined;
  public value!: ModalAdd;

  constructor() { }

  open(value: ModalAdd, boardId: string, isChange?: boolean, columnId?: string, taskId?: string) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.taskId = taskId;
    this.value = value;
    this.isChange = isChange as boolean;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
