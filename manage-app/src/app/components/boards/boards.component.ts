import { ModalAddService } from './../../services/modal-add.service';
import { BoardsService } from './../../services/boards.service';
import { LoaderService } from './../../services/loader.service';
import { InputComponent } from './../input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board } from 'src/app/modules/interfacies';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalAddComponent } from '../modal-add/modal-add.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    MatProgressSpinnerModule,
    ModalAddComponent
  ],
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  public isCreated = false;
  public isChanged = false;
  public title = '';
  public form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ])
  })

  constructor(
    private apiService: ApiService,
    public boardsService: BoardsService,
    public loaderService: LoaderService,
    public modalAddService: ModalAddService
  ) { }

  ngOnInit(): void {
    this.boardsService.initBoards();
  }

  submitForm() {
    const body: Board = {
      title: this.form.value.title as string,
      description: 'empty'
    }

    this.apiService.addBoard(body).subscribe((observ: Partial<Board>) => {
      this.boardsService.boards.push(observ as Board);
      this.changeCreated();
    });
  }

  changeBoardModal(boardId: string | undefined) {
    this.modalAddService.open('board', boardId as string);
  }
  
  removeBoard(boardId: string | undefined) {
    this.apiService.removeBoard(boardId as string).subscribe(() => {
      this.boardsService.boards = this.boardsService.boards.filter(board => board.id !== boardId);
    });
  }

  changeCreated() {
    this.isCreated = !this.isCreated;
    this.title = '';
  }
}
