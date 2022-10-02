import { ColumnsComponent } from './../columns/columns.component';
import { StorageService } from './../../services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorsComponent } from './../errors/errors.component';
import { ModalWarnService } from './../../services/modal-warn.service';
import { ModalWarnComponent } from './../modal-warn/modal-warn.component';
import { PartString } from 'src/app/modules/types';
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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { WarnString } from 'src/app/modules/enums';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ModalAddComponent,
    ModalWarnComponent,
    MatInputModule,
    MatButtonModule,
    ErrorsComponent,
    TranslateModule,
    ColumnsComponent
  ],
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  public isCreated = false;
  public changeBgId: string | null  = null;
  public changeId: string | null = null;
  public title = '';
  public form!: FormGroup;

  constructor(
    private apiService: ApiService,
    public boardsService: BoardsService,
    public loaderService: LoaderService,
    public modalWarnService: ModalWarnService,
    public storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.boardsService.initBoards();
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

  changeCreated() {
    this.isCreated = !this.isCreated;
    this.title = '';
    this.initForm();
  }

  submitForm(value?: PartString, boardId?: PartString) {
    const body: Board = {
      title: this.form.value.title as string,
      description: 'empty'
    }
    if (value === 'change') {
      this.apiService.changeBoard(boardId as string, body).subscribe((observ: Partial<Board>) => {
        this.boardsService.boards = this.boardsService.boards
          .filter(board => board.id !== observ.id as string);
        this.boardsService.boards.push(observ as Board);
        this.cancelChange();
      }, () => {});
    } else {
      this.apiService.addBoard(body).subscribe((observ: Partial<Board>) => {
        this.boardsService.boards.push(observ as Board);
        this.changeCreated();
      }, () => {});
    }
  }

  changeBoard(value: string, boardId: PartString) {
    this.changeId = boardId as string;
    this.initForm(value);
  }

  cancelChange() {
    this.changeId = null;
  }

  removeBoardWarn(boardId: string | undefined) {
    this.modalWarnService.open(WarnString.boardWarn, {boardId})
  }

  closeChangeBg() {
    this.changeBgId = null;
  }

  changeBg(boardId: PartString) {
    this.changeBgId = boardId as string;
  }

  getImage(boardId: PartString) {
    const boardBg = this.storageService.boardImages?.find(image => image.boardId === boardId);
    return boardBg ? `url(${boardBg?.imageSrc})` : '';
  }

  setImage(boardId: string, imageSrc: string) {
    this.storageService.setImage(boardId, imageSrc);
    this.closeChangeBg();
  }
}
