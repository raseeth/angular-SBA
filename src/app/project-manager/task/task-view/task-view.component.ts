import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../service/modal/modal.service';
import { ListModalComponent } from '../../list-modal/list-modal.component';
import { ListItemViewModel } from '../../list-modal/list-item.vm';
import { TaskDetailViewModel } from './task-details.vm';
import { TaskService } from '../../service/task/task.service';
import * as _ from "underscore";
import { ProjectService } from '../../service/project/project.service';
import { ProjectDetailViewModel } from '../../project/project-details.vm';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html'
})
export class ViewTaskComponent implements OnInit {

  projectName: string;
  private tasks: TaskDetailViewModel[];
  filteredTasks: TaskDetailViewModel[];
  projects: ProjectDetailViewModel[];

  constructor(private modalService: ModalService,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.get().subscribe(x => {
      this.tasks = x;
      this.filteredTasks = x;
    });
    this.projectService.get().subscribe(x => this.projects = x);
  }

  onSearchProject(): void {
    const reference = this.modalService.open(ListModalComponent);
    (reference.componentInstance as ListModalComponent).items = this.projects
      .map(x => new ListItemViewModel(x.id.toString(), x.name));
    (reference.componentInstance as ListModalComponent).subject.subscribe((x: ListItemViewModel) => {
      this.projectName = x.description;      
      this.onProjectChange(x.id);
      this.modalService.close();
    });
  }

  sortBy(prop: string): void {
    this.filteredTasks =  _.sortBy(this.filteredTasks, prop);
  }

  onProjectChange(term: string): void {
      this.filteredTasks = term ? this.tasks.filter((x: TaskDetailViewModel) => x.projectId.toString() == term) : this.tasks;
  }
}