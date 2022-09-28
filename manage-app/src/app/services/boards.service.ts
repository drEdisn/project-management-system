import { ApiService } from './api.service';
import { Board, Column } from 'src/app/modules/interfacies';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  public boards: Board[] = [];
  public columns: Column[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  initBoards(callback?: () => void) {
    this.apiService.getBoards().subscribe((observ: Partial<Board>) => {
      this.boards = observ as Board[];
      callback ? callback() : null;
    });
  }

  initColumns(boardId: string, callback?: (columnId: Column[]) => void) {
    this.apiService.getColumns(boardId).subscribe((observ: Partial<Column>) => {
      this.columns = observ as Column[];
      this.columns.sort((a, b) => a.order as number - (b.order as number))
      callback ? callback(this.columns) : null;
    });
  }
}

