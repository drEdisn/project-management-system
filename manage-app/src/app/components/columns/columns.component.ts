import { StorageService } from './../../services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { WarnString } from 'src/app/modules/enums';
import { ModalWarnService } from './../../services/modal-warn.service';
import { ModalWarnComponent } from './../modal-warn/modal-warn.component';
import { Column, Tasks } from 'src/app/modules/interfacies';
import { ApiService } from './../../services/api.service';
import { ModalAddService } from './../../services/modal-add.service';
import { ModalAddComponent } from './../modal-add/modal-add.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './../../services/loader.service';
import { BoardsService } from './../../services/boards.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskComponent } from './../task/task.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PartString } from 'src/app/modules/types';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-columns',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    TaskComponent,
    MatProgressSpinnerModule,
    ModalAddComponent,
    ModalWarnComponent,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    ErrorsComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {

  public boardId: string = this.route.snapshot.url[1].path;
  public boardName: PartString = this.getBoard();
  public tasks: Map<string, Tasks[]> = new Map();
  public form!: FormGroup;
  public changeId: PartString;
  public isTaskChange = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService,
    public boardsService: BoardsService,
    public loaderService: LoaderService,
    public modalAddService: ModalAddService,
    public modalWarnService: ModalWarnService,
    private storageService: StorageService,
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
          const taskArray = observ as Tasks[];
          taskArray.sort((a, b) => a.order as number - (b.order as number));
          this.tasks.set(column[i].id as string, taskArray);
        });
      }
    });
  }

  getBg() {
    const bgImage = this.storageService.boardImages.find(image => image.boardId === this.boardId);
    return bgImage ? `url(${bgImage.imageSrc})` : '';
  }

  changeTask(value: boolean) {
    this.isTaskChange = value;
  }

  initForm(value?: string) {
    this.form = new FormGroup({
      title: new FormControl(value, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
    return this.form;
  }

  changeOn(title: PartString, columnId: PartString) {
    this.changeId = columnId;
    this.initForm(title);
  }

  cancelChange() {
    this.changeId = undefined;
  }

  submitForm(columnId: PartString) {
    const column = this.boardsService.columns.find(column => column.id === columnId);
    const body: Column = {
      ...this.form.value,
      order: column?.order
    }
    this.apiService.changeColumn(
      this.boardId,
      columnId as string,
      body
    ).subscribe(() => {
      this.boardsService.columns.map(column => {
        if (column.id === columnId as string) {
          column.title = this.form.value.title;
          return column;
        }
        return column;
      });
    })
    this.cancelChange();
  }

  dropIntoList(data: Tasks[], prev: number, current: number) {
    moveItemInArray(data, prev,  current);
    const start = current > prev ? prev : current;
    const end = current < prev? prev : current;
    for (let i = start; i <= end; i++) {
      const item = data[i];
      const body: Tasks = {
        ...item,
      }
      delete body.files;
      delete body.id;
      this.apiService.changeTask(this.boardId, item.columnId as string ,item.id as string, {
        ...body,
        order: i + 1,
      }).subscribe();
    }
  }

  dropFormList(event: CdkDragDrop<Tasks[]>, data: Tasks[], prev: number, current: number) {
    const prevData = event.previousContainer.data;
    const elem = event.container.element.nativeElement as HTMLElement;
    const newColumnId = elem.closest('.columns__item')?.getAttribute('data-id');
    transferArrayItem(prevData, data, prev, current);
    const task = data[current];
    this.apiService.removeTask(this.boardId, task.columnId as string, task.id as string).subscribe();
    this.apiService.addTask(this.boardId, newColumnId as string, {
      title: task.title,
      description: task.description,
      userId: task.userId
    }).subscribe((observ: Partial<Tasks>) => {
      data.splice(current, 1, observ as Tasks);
      for (let i = prev; i < data.length; i++) {
        const item = data[i];
        const body: Tasks = {
          ...item,
        }
        delete body.files;
        delete body.id;
        this.apiService.changeTask(this.boardId, newColumnId as string ,item.id as string, {
          ...body,
          order: i + 1,
        }).subscribe();
      }
    });
  }

  drop(event: CdkDragDrop<Column[]>) {
    const { previousIndex: prev, currentIndex: current } = event;
    const data = event.container.data;
    moveItemInArray(data, prev,  current);
    const start = current > prev ? prev : current;
    const end = current < prev? prev : current;
    for (let i = start; i <= end; i++) {
      const item = data[i];
      this.apiService.changeColumn(this.boardId, item.id as string, {
        title: item.title,
        order: i + 1,
      }).subscribe();
    }
  }

  dropTask(event: CdkDragDrop<Tasks[]>) {
    const { previousIndex: prev, currentIndex: current } = event;
    const data = event.container.data;
    if (event.previousContainer !== event.container) {
      this.dropFormList(event, data, prev, current);
    } else {
      this.dropIntoList(data, prev, current);
    }
  }

  getBoard() {
    return this.boardsService.boards.find(board => board.id === this.boardId)?.title;
  }

  goBack() {
    this.location.back();
  }

  addColumn() {
    this.modalAddService.open('columns.name', {boardId: this.boardId});
  }

  removeColumn(columnId: PartString) {
    this.modalWarnService.open(WarnString.columnWarn, {boardId: this.boardId, columnId});
  }

  addTask(columnId: PartString) {
    this.modalAddService.open('tasks.name', {boardId: this.boardId, columnId});
  }

  getTasks(columnId: PartString) {
    return this.tasks.get(columnId as string) as Tasks[];
  }
}
