import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './task-view.component';
import { ModalService } from 'src/app/project-manager/service/modal/modal.service';
import { TaskService } from 'src/app/project-manager/service/task/task.service';
import { ProjectService } from 'src/app/project-manager/service/project/project.service';
import { ProjectModelBuilder } from 'src/app/project-manager/service/project/project-model.builder';
import { TasksModelBuilder } from 'src/app/project-manager/service/task/task-model.builder';
import { ListModalComponent } from 'src/app/project-manager/list-modal/list-modal.component';
import { of } from 'rxjs';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let mockModalService: ModalService;
  let taskServiceMock: TaskService;
  let mockProjectService: ProjectService;
  let taskBuilder: TasksModelBuilder;
  let projectBuilder: ProjectModelBuilder;
  
  beforeEach(() => {
    taskBuilder = new TasksModelBuilder();
    projectBuilder = new ProjectModelBuilder();
    mockModalService = jasmine.createSpyObj("ModalService", ["open", "close"]);
    (mockModalService.open as jasmine.Spy).and.returnValue({"componentInstance": new ListModalComponent()});
   
    taskServiceMock = jasmine.createSpyObj("taskService", ["post", "get", "getById"]);
    (taskServiceMock.get as jasmine.Spy).and.returnValue(of(taskBuilder.withDefaultTasks()));
    (taskServiceMock.post as jasmine.Spy).and.returnValue(of({}));
    (taskServiceMock.getById as jasmine.Spy).and.returnValue(of(taskBuilder.withDefaultTask()));

    mockProjectService = jasmine.createSpyObj("projectService", ["post", "get", "getById"]);
    (mockProjectService.get as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultprojects()));
    (mockProjectService.post as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.getById as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultProject()));

    component = new ViewTaskComponent(mockModalService, mockProjectService, taskServiceMock);
  });

  it("ngOninit should call project and task service as expected", () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(mockProjectService.get).toHaveBeenCalled();
      expect(taskServiceMock.get).toHaveBeenCalled();
      expect(component.filteredTasks).toBeDefined();
      expect(component.projects).toBeDefined();
  });

  it("onSearchProject should call modal as expected", () => {
      // Arrange
      component.ngOnInit();

      // Act
      component.onSearchProject();

      // Assert
      expect(mockModalService.open).toHaveBeenCalledWith(ListModalComponent);
  });

  it("sortBy should sort data as expected", () => {
      // Arrange
      component.ngOnInit();
      const prop = 'priority';

      // Act 
      component.sortBy(prop);

      // Assert
      expect(component.filteredTasks[0].priority < component.filteredTasks[1].priority).toBe(true);
  });

  it("onProjectChange should filter data as expected", () => {
      // Arrange
      component.ngOnInit();

      // Act
      component.onProjectChange("1122");

      // Assert
      expect(component.filteredTasks[0].projectId).toEqual(1122);
  });
  
});
