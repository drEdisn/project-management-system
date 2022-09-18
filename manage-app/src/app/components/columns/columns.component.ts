import { Column, Tasks } from 'src/app/modules/interfacies';
import { ApiService } from './../../services/api.service';
import { ModalAddService } from './../../services/modal-add.service';
import { ModalAddComponent } from './../modal-add/modal-add.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './../../services/loader.service';
import { BoardsService } from './../../services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from './../task/task.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PartString } from 'src/app/modules/types';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskComponent, MatProgressSpinnerModule, ModalAddComponent],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  public boardId: string = this.route.snapshot.url[1].path;
  public boardName: PartString = this.getBoard();
  public modalTitle = 'Add';
  public modalButton = 'Create';
  public tasks: Map<string, Tasks[]> = new Map();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public boardsService: BoardsService,
    public loaderService: LoaderService,
    public modalAddService: ModalAddService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (this.boardsService.boards.length === 0) {
      this.boardsService.initBoards(() => {
        this.boardName = this.getBoard();
      });
    }
    this.boardsService.initColumns(this.boardId, (column) => {
      for (let i = 0; i < column.length; i++) {
        this.apiService.getTasks(this.boardId, column[i].id as string).subscribe((observ: Partial<Tasks>) => {
          this.tasks.set(column[i].id as string, observ as Tasks[]);
        });
      }
    });
  }

  drop(event: CdkDragDrop<Column[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  dropTask(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  changeModal (button: string, title: string) {
    this.modalButton = button;
    this.modalTitle = title;
  }

  getBoard() {
    return this.boardsService.boards.find(board => board.id === this.boardId)?.title;
  }

  goBack() {
    this.location.back();
  }

  addColumn() {
    this.changeModal('Create', 'Add');
    this.modalAddService.open('column', this.boardId);
  }

  changeColumn(columnId: PartString) {
    this.changeModal('Change', 'Change');
    this.modalAddService.open('column', this.boardId, true ,columnId);
  }

  removeColumn(columnId: PartString) {
    this.apiService.removeColumn(this.boardId as string, columnId as string)
      .subscribe(() => {
        this.boardsService.columns = this.boardsService.columns
          .filter(column => column.id !== columnId);
      });
  }

  addTask(columnId: PartString) {
    this.changeModal('Create', 'Add');
    this.modalAddService.open('task', this.boardId, false, columnId);
  }

  changeTask(columnId: PartString, taskId: PartString) {
    this.changeModal('Change', 'Change');
    this.modalAddService.open('task', this.boardId, true, columnId, taskId);
  }

  getTasks(columnId: PartString) {
    return this.tasks.get(columnId as string) as Tasks[];
  }
}
