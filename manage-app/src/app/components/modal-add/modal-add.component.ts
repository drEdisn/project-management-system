import { TranslateModule } from '@ngx-translate/core';
import { ErrorsComponent } from './../errors/errors.component';
import { BoardsService } from './../../services/boards.service';
import { ModalAddService } from './../../services/modal-add.service';
import { Column, Tasks, Board } from 'src/app/modules/interfacies';
import { InputComponent } from './../input/input.component';
import { ApiService } from './../../services/api.service';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './../../services/storage.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    MatInputModule,
    MatButtonModule,
    ErrorsComponent,
    TranslateModule
  ],
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent {

  @Input() tasks!: Map<string, Tasks[]>;

  public isTask: boolean = false;
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
    if (this.modalAddService.value === 'tasks.name') {
      this.isTask = true;
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
    }, () => {});
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
    }, () => {});
  }

  onSubmit() {
    if (this.modalAddService.value === 'columns.name') {
      this.addColumn();
    } else if (this.modalAddService.value === 'tasks.name') {
      this.addTask();
    }

    this.modalAddService.close();
  }
}
