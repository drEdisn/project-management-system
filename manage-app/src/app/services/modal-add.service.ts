import { PartString } from 'src/app/modules/types';
import { ApiIds, Tasks } from 'src/app/modules/interfacies';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {

  public isVisible = false;
  public boardId: PartString;
  public columnId: PartString;
  public taskId: PartString;
  public value!: string;

  constructor() { }

  open(value: string, {boardId, columnId, taskId}: ApiIds) {
    this.boardId = boardId;
    this.columnId = columnId;
    this.taskId = taskId;
    this.value = value;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
