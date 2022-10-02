import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from './../../services/storage.service';
import { Tasks } from 'src/app/modules/interfacies';
import { BoardsService } from './../../services/boards.service';
import { ApiService } from './../../services/api.service';
import { ModalWarnService } from './../../services/modal-warn.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal-warn',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './modal-warn.component.html',
  styleUrls: ['./modal-warn.component.scss']
})
export class ModalWarnComponent {

  @Input() tasks!: Map<string, Tasks[]>;
  public boardId = this.modalWarnService.boardId as string;
  public columnId = this.modalWarnService.columnId as string;
  public taskId = this.modalWarnService.taskId as string;

  constructor(
    private boardsService: BoardsService,
    private apiService: ApiService,
    public modalWarnService: ModalWarnService,
    private storageService: StorageService
  ) { }

  removeAccount() {
    this.apiService.removeUser(this.modalWarnService.userId as string).subscribe(() => {
      this.storageService.logoutUser();
    }, () => {});
  }

  removeTask() {
    this.apiService.removeTask(
      this.boardId,
      this.columnId,
      this.taskId
    )
      .subscribe(() => {
        let columnTasks = this.tasks.get(this.columnId as string);
        const task = columnTasks?.find(task => task.id === this.taskId) as Tasks;
        columnTasks?.splice(columnTasks?.indexOf(task), 1);
      }, () => {});
  }

  removeColumn() {
    this.apiService.removeColumn(this.boardId, this.columnId)
      .subscribe(() => {
        this.boardsService.columns = this.boardsService.columns
          .filter(column => column.id !== this.columnId);
      }, () => {});
  }

  removeBoard() {
    this.apiService.removeBoard(this.boardId).subscribe(() => {
      this.boardsService.boards = this.boardsService.boards.filter(board => board.id !== this.boardId);
      this.storageService.removeImage(this.boardId);
    }, () => {});
  }

  remove() {
    if (this.modalWarnService.taskId) {
      this.removeTask();
    } else if (this.modalWarnService.columnId) {
      this.removeColumn();
    } else if ((this.modalWarnService.boardId)) {
      this.removeBoard();
    } else {
      this.removeAccount();
    }
    this.modalWarnService.close();
  }
}
