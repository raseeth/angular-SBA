import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskDetailViewModel } from '../task-view/task-details.vm';
import { TaskService } from '../../service/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../service/modal/modal.service';
import { UserService } from '../../service/user/user.service';
import { ProjectService } from '../../service/project/project.service';
import { UserDetailViewModel } from '../../user/user-details.vm';
import { ProjectDetailViewModel } from '../../project/project-details.vm';
import { ListModalComponent } from '../../list-modal/list-modal.component';
import { ListItemViewModel } from '../../list-modal/list-item.vm';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html'
})
export class AddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  parentTasks$: Observable<TaskDetailViewModel[]>;
  isUpdate = false;
  users: UserDetailViewModel[];
  projects: ProjectDetailViewModel[];
  tasks: TaskDetailViewModel[];
  validDate = true;
  
  private id: number;

  constructor(private formBuilder: FormBuilder,
    private modalService: ModalService,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute) { 
    }

  ngOnInit() {
    this.initForm();

    this.initDefaultData();
    
    this.loadTask();
  }

  projectSearch(): void {
    this.openSearchModal(
      this.projects.map(y => new ListItemViewModel(y.id.toString(), (y.name))),
      "projectId");
  }

  parentTaskSearch(): void {
    this.tasks = this.id ? this.tasks.filter(x => x.id !== this.id) : this.tasks;

    this.openSearchModal(
      this.tasks.map(y => new ListItemViewModel(y.id.toString(), (y.name))),
      "parentTaskId");
  }

  userSearch(): void {
    this.openSearchModal(
      this.users.map(y => new ListItemViewModel(y.id.toString(), (y.firstName + "," + y.lastName))),
      "userId");
  }

  onSubmit(): void {
    if (this.addTaskForm.valid && this.validStartAndEndDate()) {
      const request = this.isUpdate ?
        this.taskService.put(this.addTaskForm.value as TaskDetailViewModel) :
        this.taskService.post(this.addTaskForm.value as TaskDetailViewModel);

      request.subscribe(() => {
        alert("Saved task successfully...");
        if (!this.isUpdate) {
          this.onReset();
        }
        this.initDefaultData();
      }, () => alert("Error whilst saving your data"));
    }
  }

  onReset(): void {
    this.addTaskForm.reset();
  }

  private validStartAndEndDate(): boolean {
    this.validDate = new Date(this.addTaskForm.get('startDate').value) <
      new Date(this.addTaskForm.get('endDate').value);;
    return this.validDate;
  }

  private loadTask() {
    this.activateRoute.params.subscribe(x => {
      this.id = x["id"];
      if (this.id) {
        this.taskService.getById(this.id.toString()).subscribe(task => {
          task.startDate = task.startDate ? this.datePipe.transform(task.startDate, "yyyy-MM-dd") : '';
          task.endDate = task.endDate ? this.datePipe.transform(task.endDate, "yyyy-MM-dd") : '';
          this.addTaskForm.patchValue(task);
          this.isUpdate = true;
        });
      }
    });
  }

  private initDefaultData() {
    this.userService.get().subscribe(x => this.users = x);
    this.projectService.get().subscribe(x => this.projects = x);
    this.taskService.get().subscribe(x => this.tasks = x);
  }

  private initForm() {
    this.addTaskForm = this.formBuilder.group({
      id: [],
      name: [undefined, [Validators.required]],
      priority: [0, [Validators.required]],
      parentTaskId: [undefined],
      isParentTask: [false],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      projectId: [undefined, [Validators.required]],
      userId: [undefined, [Validators.required]]
    });
  }

  private openSearchModal(items: ListItemViewModel[], field: string) {
    const reference = this.modalService.open(ListModalComponent);
    (reference.componentInstance as ListModalComponent).items = items;
    (reference.componentInstance as ListModalComponent).subject
      .subscribe((x: ListItemViewModel) => {
        this.addTaskForm.get(field).patchValue(x.id);
        this.modalService.close();
      });
  }
}
