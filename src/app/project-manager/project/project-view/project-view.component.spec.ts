import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponent } from './project-view.component';
import { ProjectService } from 'src/app/project-manager/service/project/project.service';
import { ListenerService } from 'src/app/project-manager/service/listener/listener.service';
import { of } from 'rxjs';
import { ProjectModelBuilder } from 'src/app/project-manager/service/project/project-model.builder';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let mockProjectService: ProjectService;
  let mockListener: ListenerService;
  let projectBuilder: ProjectModelBuilder;

  beforeEach(() => {
    projectBuilder = new ProjectModelBuilder();
    mockListener = jasmine.createSpyObj("listener", ["publish", "listener"]);
    (mockListener.listener as jasmine.Spy).and.returnValue(of({}));
    mockProjectService = jasmine.createSpyObj("projectService", ["post", "get", "getById", "put"]);
    (mockProjectService.get as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultprojects()));
    (mockProjectService.post as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.put as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.getById as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultProject()));

    component = new ViewProjectComponent(mockProjectService, mockListener);
  });

  it("ngOnInit should call project service get", () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(mockProjectService.get).toHaveBeenCalled();
  });

  it("should return unfiltered data on onSearchTermChange with empty", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.onSearchTermChange("");

    // Assert
    expect(component.filteredProjects.length)
      .toEqual(projectBuilder.withDefaultprojects().length);
  });

  it("should return unfiltered data on onSearchTermChange with empty", () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.onSearchTermChange("second");

    // Assert
    expect(component.filteredProjects[0].name)
      .toContain("second");
  });
});
