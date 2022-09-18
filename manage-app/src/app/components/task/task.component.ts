import { ApiService } from './../../services/api.service';
import { Tasks } from 'src/app/modules/interfacies';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: Tasks;
  @Input() tasks!: Map<string, Tasks[]>;

  constructor(
    public apiService: ApiService
  ) {}

  removeTask() {
    this.apiService.removeTask(
      this.task.boardId as string,
      this.task.columnId as string,
      this.task.id as string
    )
      .subscribe(() => {
        let columnTasks = this.tasks.get(this.task.columnId as string);
        columnTasks?.splice(columnTasks?.indexOf(this.task), 1);
      });
  }
}
