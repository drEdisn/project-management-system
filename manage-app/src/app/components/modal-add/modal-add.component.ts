import { BoardsService } from './../../services/boards.service';
import { ModalAddService } from './../../services/modal-add.service';
import { Column, Tasks, Board } from 'src/app/modules/interfacies';
import { InputComponent } from './../input/input.component';
import { ApiService } from './../../services/api.service';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './../../services/storage.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent {

  @Input() tasks!: Map<string, Tasks[]>;
  @Input() title!: string;
  @Input() button: string = 'Create';

  public inputs: string[] = ['title'];
  public form: FormGroup = this.initForm();

  constructor(
    private formBuild: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    public modalAddService: ModalAddService,
    public boardsService: BoardsService,
  ) { }

  getInput(form: any, input: string) {
    return form.controls[input];
  }

  initForm() {
    if (this.modalAddService.value === 'task') {
      this.inputs.push('description');
      return this.formBuild.group({
        title: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        description: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(5)
        ])
      })
    } else {
      return this.formBuild.group({
        title: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3)
        ])
      })
    }
  }

  addColumn() {
    this.apiService.addColumn(
      this.modalAddService.boardId as string,
      this.form.value
    ).subscribe((observ: Partial<Column>) => {
      this.boardsService.columns.push(observ as Column);
      this.tasks.set(observ.id as string, []);
    });
  }
  
  changeColumn() {
    const column = this.boardsService.columns.find(column => column.id === this.modalAddService.columnId);
    const body: Column = {
      ...this.form.value,
      order: column?.order
    }
    this.apiService.changeColumn(
      this.modalAddService.boardId as string,
      column?.id as string,
      body
    ).subscribe(() => {
      this.boardsService.columns.map(col => {
        if (col.id === column?.id as string) {
          col.title = this.form.value.title;
          return column;
        }
        return column;
      });
    })
  }

  addTask() {
    const body: Tasks = {
      ...this.form.value,
      userId: this.storageService.user?.id as string
    }

    this.apiService.addTask(
      this.modalAddService.boardId as string,
      this.modalAddService.columnId as string,
      body
    ).subscribe((observ: Partial<Tasks>) => {
      const columnTasks = this.tasks.get(this.modalAddService.columnId as string);
      columnTasks?.push(observ as Tasks);
    });
  }

  changeTask() {
    const tasks = this.tasks.get(this.modalAddService.columnId as string);
    let task = tasks?.find(task => task.id === this.modalAddService.taskId);
    const body: Tasks = {
      ...task,
      ...this.form.value,
    }
    delete body.files;
    delete body.id;

    this.apiService.changeTask(
      task?.boardId as string,
      task?.columnId as string,
      task?.id as string,
      body
    ).subscribe((observ: Partial<Tasks>) => {
      tasks?.splice(tasks.indexOf(task as Tasks), 1, observ as Tasks);
    })
  }

  changeBoard() {
    const body: Board = {
      ...this.form.value,
      description: 'empty'
    };
    this.apiService.changeBoard(
      this.modalAddService.boardId as string,
      body
    )
    .subscribe(() => {
      this.boardsService.boards.map(board => {
        if (board.id === this.modalAddService.boardId as string) {
          board.title = this.form.value.title;
          return board;
        }
        return board;
      });
    })
  }

  onSubmit() {
    if (this.modalAddService.value === 'column' && this.modalAddService.isChange) {
      this.changeColumn();
    } else if (this.modalAddService.value === 'task' && this.modalAddService.isChange) {
      this.changeTask()
    } else if (this.modalAddService.value === 'column') {
      this.addColumn();
    } else if (this.modalAddService.value === 'task') {
      this.addTask();
    } else {
      this.changeBoard();
    }
    this.modalAddService.close();
  }
}
