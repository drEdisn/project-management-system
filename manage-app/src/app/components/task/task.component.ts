import { TranslateModule } from '@ngx-translate/core';
import { WarnString } from 'src/app/modules/enums';
import { ModalWarnService } from './../../services/modal-warn.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Tasks } from 'src/app/modules/interfacies';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    ErrorsComponent,
    TranslateModule
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: Tasks;
  @Input() tasks!: Map<string, Tasks[]>;
  @Output() isChangeTask = new EventEmitter<boolean>();
  public form!: FormGroup;
  public isChange = false;

  constructor(
    private apiService: ApiService,
    private modalWarnService: ModalWarnService,
  ) {}

  getInput(form: any, input: string) {
    return form.controls[input];
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.task.title, [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl(this.task.description, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  changeOn() {
    this.initForm();
    this.isChangeTask.emit(true);
    this.isChange = true;
  }

  submitForm() {
    const tasks = this.tasks.get(this.task.columnId as string);
    let task = tasks?.find(task => task.id === this.task.id);
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
    }, () => {})
  }

  cancelChange() {
    this.isChangeTask.emit(false);
    this.isChange = false;
  }

  removeTask(e: Event) {
    e.stopPropagation();
    this.modalWarnService.open(WarnString.taskWarn, {
      taskId: this.task.id,
      columnId: this.task.columnId,
      boardId: this.task.boardId
    });
  }
}
