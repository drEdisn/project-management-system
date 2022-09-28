import { Tasks } from 'src/app/modules/interfacies';
import { PartString } from 'src/app/modules/types';
import { Injectable } from '@angular/core';
import { WarnString } from '../modules/enums';
import { ApiIds } from '../modules/interfacies';



@Injectable({
  providedIn: 'root'
})
export class ModalWarnService {

  public isOpen = false;
  public text!: string;
  public boardId: PartString;
  public columnId: PartString;
  public taskId: PartString;
  public userId: PartString;

  open(warnText: string, {boardId, columnId, taskId, userId}: ApiIds) {
    this.text = warnText;
    this.isOpen = true;
    this.boardId = boardId;
    this.columnId = columnId;
    this.taskId = taskId;
    this.userId = userId;
  }

  close() {
    this.isOpen = false;
    this.boardId = undefined;
    this.columnId = undefined;
    this.taskId = undefined;
    this.userId = undefined;
  }
}
