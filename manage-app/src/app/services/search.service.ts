import { ApiService } from './api.service';
import { Tasks, Board, Column } from 'src/app/modules/interfacies';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public tasks: Tasks[] = [];
  public filterTasks: Tasks[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  filter(string: string) {
    return this.filterTasks = this.tasks.filter(task => task.title.includes(string));
  }

  getAllTasks() {
    this.tasks = [];
    return this.apiService.getBoards()
    .subscribe((boards: Partial<Board>) => {
      const boardsArray = boards as Board[];
      boardsArray.forEach(board => {
        this.apiService.getColumns(board.id as string)
        .subscribe((columns: Partial<Column>) => {
          const columnsArray = columns as Column[];
          columnsArray.forEach(column => {
            this.apiService.getTasks(board.id as string, column.id as string)
            .subscribe((tasks: Partial<Tasks>) => {
              this.tasks.push(tasks as Tasks);
              this.tasks = this.tasks.flat();
              this.filterTasks = this.tasks;
            })
          });
        })
      });
    })
  }
}
