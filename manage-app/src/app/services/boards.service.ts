import { ApiService } from './api.service';
import { Board, Column } from 'src/app/modules/interfacies';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Errors } from '../modules/enums';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  public boards: Board[] = [];
  public columns: Column[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  initBoards(callback?: () => void) {
    this.apiService.getBoards().subscribe((observ: Partial<Board>) => {
      this.boards = observ as Board[];
      callback ? callback() : null;
    }, (err) => this.getError(err));
  }

  initColumns(boardId: string, callback?: (columnId: Column[]) => void) {
    this.apiService.getColumns(boardId).subscribe((observ: Partial<Column>) => {
      this.columns = observ as Column[];
      this.columns.sort((a, b) => a.order as number - (b.order as number))
      callback ? callback(this.columns) : null;
    }, (err) => this.getError(err));
  }

  getError(err: any) {
    err.status === Errors.DISCONECT || err.status === Errors.NOT_FOUND
      ? this.router.navigate(['not-found'])
      : null;
  }
}