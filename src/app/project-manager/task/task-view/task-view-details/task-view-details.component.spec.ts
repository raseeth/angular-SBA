import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetailsComponent } from './task-view-details.component';
import { of } from 'rxjs';
import { TasksModelBuilder } from '../../service/task/task-model.builder';

describe('ViewTaskDetailsComponent', () => {
  
  it("endTask should call task put as expected", () => {
      // Arrange
      const taskServiceMock = jasmine.createSpyObj("taskService", ["put", "get", "getById"]);
      (taskServiceMock.put as jasmine.Spy).and.returnValue(of({}));
      const component = new ViewTaskDetailsComponent(taskServiceMock);
      const taskBuilder = new TasksModelBuilder();
      
      // Act
      component.endTask(taskBuilder.withDefaultTask());

      // Assert
      expect(taskServiceMock.put).toHaveBeenCalled();
  });
});
