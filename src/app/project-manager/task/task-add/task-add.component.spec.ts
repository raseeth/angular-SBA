import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './task-add.component';
import { TaskService } from '../../service/task/task.service';
import { TasksModelBuilder } from '../../service/task/task-model.builder';
import { of } from 'rxjs';
import { ModalService } from '../../service/modal/modal.service';
import { UserService } from '../../service/user/user.service';
import { ProjectService } from '../../service/project/project.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ProjectModelBuilder } from '../../service/project/project-model.builder';
import { UsersModelBuilder } from '../../service/user/user-model.builder';
import { ListModalComponent } from '../../list-modal/list-modal.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let taskServiceMock: TaskService;
  let taskBuilder: TasksModelBuilder;
  let projectBuilder: ProjectModelBuilder;
  let userBuilder: UsersModelBuilder;
  let mockModalService: ModalService;
  let mockUserService: UserService;
  let mockTaskService: TaskService;
  let mockProjectService: ProjectService;
  let mockDatePipe;
  let mockActivatedRoute;

  beforeEach(() => {
    taskBuilder = new TasksModelBuilder();
    projectBuilder = new ProjectModelBuilder();
    userBuilder = new UsersModelBuilder();

    taskServiceMock = jasmine.createSpyObj("taskService", ["post", "get", "getById"]);
    (taskServiceMock.get as jasmine.Spy).and.returnValue(of(taskBuilder.withDefaultTasks()));
    (taskServiceMock.post as jasmine.Spy).and.returnValue(of({}));
    (taskServiceMock.getById as jasmine.Spy).and.returnValue(of(taskBuilder.withDefaultTask()));

    mockProjectService = jasmine.createSpyObj("projectService", ["post", "get", "getById"]);
    (mockProjectService.get as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultprojects()));
    (mockProjectService.post as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.getById as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultProject()));

    mockUserService = jasmine.createSpyObj("userService", ["post", "get", "getById"]);
    (mockUserService.get as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUsers()));
    (mockUserService.post as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.getById as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUser()));

    mockActivatedRoute = {
      params: of({})
    }

    mockDatePipe = {
      "transform": jasmine.createSpy("date").and.returnValue("2019-2-2")
    }

    mockModalService = jasmine.createSpyObj("ModalService", ["open", "close"]);
    (mockModalService.open as jasmine.Spy).and.returnValue({ "componentInstance": new ListModalComponent() });

    component = new AddTaskComponent(new FormBuilder(),
      mockModalService,
      taskServiceMock,
      mockUserService,
      mockProjectService,
      mockDatePipe,
      mockActivatedRoute
    );
  });

  it('should set values on ngOnInit', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component.addTaskForm).toBeDefined();
  });

  it('should call task get on ngOnInit for update', () => {
    // Arrange
    mockActivatedRoute = {
      params: of({ "id": 123 })
    };
    component = new AddTaskComponent(new FormBuilder(),
      mockModalService,
      taskServiceMock,
      mockUserService,
      mockProjectService,
      mockDatePipe,
      mockActivatedRoute
    );

    // Act
    component.ngOnInit();

    // Assert
    expect(taskServiceMock.get).toHaveBeenCalled();
  });

  describe("onSubmit", () => {
    it("should call taskService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();
      component.addTaskForm.patchValue(taskBuilder.withDefaultTask());

      // Act
      component.onSubmit();

      // Assert
      expect(taskServiceMock.post).toHaveBeenCalled();
    });

    it("should call taskService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();

      // Act
      component.onSubmit();

      // Assert
      expect(taskServiceMock.post).not.toHaveBeenCalled();
    });
  });

  it("should call form reset on onReset", () => {
    // Arrange
    component.ngOnInit();
    spyOn(component.addTaskForm, "reset").and.callThrough();

    // Act
    component.onReset();

    // Assert
    expect(component.addTaskForm.reset).toHaveBeenCalled();
  });

  it("should call the modalservice component for project search", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.projectSearch();

    // Assert
    expect(mockModalService.open).toHaveBeenCalledWith(ListModalComponent);
  });

  it("should call the modalservice component for user search", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.userSearch();

    // Assert
    expect(mockModalService.open).toHaveBeenCalledWith(ListModalComponent);
  });

  it("should call the modalservice component for task search", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.parentTaskSearch();

    // Assert
    expect(mockModalService.open).toHaveBeenCalledWith(ListModalComponent);
  });
});
