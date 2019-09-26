import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaskDetailViewModel } from '../task-details.vm';
import { TaskService } from '../../../service/task/task.service';

@Component({
  selector: 'app-task-view-details',
  templateUrl: './task-view-details.component.html'
})
export class ViewTaskDetailsComponent {

  @Input() taskDetail: TaskDetailViewModel;
  @Output() onEditTask: EventEmitter<TaskDetailViewModel>;
  @Output() onEndTask: EventEmitter<TaskDetailViewModel>;

  constructor(private taskService: TaskService) { }

  endTask(taskDetail: TaskDetailViewModel): void {
    taskDetail.isCompleted = true;
    this.taskService.put(taskDetail).subscribe();
  }
}
