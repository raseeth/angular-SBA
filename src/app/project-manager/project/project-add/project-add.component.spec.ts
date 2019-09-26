import { AddProjectComponent } from './project-add.component';
import { ProjectService } from '../../service/project/project.service';
import { UserService } from '../../service/user/user.service';
import { UsersModelBuilder } from '../../service/user/user-model.builder';
import { ListenerService } from '../../service/listener/listener.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ProjectModelBuilder } from '../../service/project/project-model.builder';
import { ModalService } from '../../service/modal/modal.service';
import { ListModalComponent } from '../../list-modal/list-modal.component';
import { DatePipe } from '@angular/common';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let mockUserService: UserService;
  let mockProjectService: ProjectService;
  let mockActivatedRoute;
  let userBuilder: UsersModelBuilder;
  let mockListener: ListenerService;
  let projectBuilder: ProjectModelBuilder;
  let mockModalService: ModalService;
  let mockDatePipe;

  beforeEach(() => {
    userBuilder = new UsersModelBuilder();
    projectBuilder = new ProjectModelBuilder();
    mockUserService = jasmine.createSpyObj("userService", ["post", "get", "put", "getById"]);
    (mockUserService.get as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUsers()));
    (mockUserService.post as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.put as jasmine.Spy).and.returnValue(of({}));
    (mockUserService.getById as jasmine.Spy).and.returnValue(of(userBuilder.withDefaultUser()));

    mockProjectService = jasmine.createSpyObj("projectService", ["post", "get", "getById", "put"]);
    (mockProjectService.get as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultprojects()));
    (mockProjectService.post as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.put as jasmine.Spy).and.returnValue(of({}));
    (mockProjectService.getById as jasmine.Spy).and.returnValue(of(projectBuilder.withDefaultProject()));

    mockActivatedRoute = {
      params: of({})
    }

    mockModalService = jasmine.createSpyObj("ModalService", ["open", "close"]);
    (mockModalService.open as jasmine.Spy).and.returnValue({ "componentInstance": new ListModalComponent() });

    mockListener = jasmine.createSpyObj("listener", ["publish", "listener"]);

    mockDatePipe = {
      "transform": jasmine.createSpy("date").and.returnValue("2019-2-2")
    }

    component = new AddProjectComponent(new FormBuilder(),
        mockModalService,
        mockProjectService,
        mockUserService,
        mockActivatedRoute,
        mockListener,
        mockDatePipe);
  });

  it("should default data on ngOninit", () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component.addProjectForm).toBeDefined();
  });

  it("should call the task service on load", () => {
    // Arrange
    mockActivatedRoute = {
      params: of({
        "id": "123"
      })
    };
    
    component = new AddProjectComponent(new FormBuilder(),
      mockModalService,
      mockProjectService,
      mockUserService,
      mockActivatedRoute,
      mockListener,
      mockDatePipe);

    // Act
    component.ngOnInit();

    // Assert
    expect(mockProjectService.getById).toHaveBeenCalledWith("123");
  });

  describe("onSubmit", () => {
    it("should call projectService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();
      component.addProjectForm.patchValue(projectBuilder.withDefaultProject());

      // Act
      component.onSubmit();

      // Assert
      expect(mockProjectService.post).toHaveBeenCalled();
    });

    it("should call projectService put as expecte for valid form details", () => {
      // Arrange
      mockActivatedRoute = {
        params: of({
          "id": "123"
        })
      };
      component = new AddProjectComponent(new FormBuilder(),
        mockModalService,
        mockProjectService,
        mockUserService,
        mockActivatedRoute,
        mockListener,
        new DatePipe("en-GB"));

      component.ngOnInit();
      component.addProjectForm.patchValue(userBuilder.withDefaultUser());

      // Act
      component.onSubmit();

      // Assert
      expect(mockProjectService.put).toHaveBeenCalled();
    });

    it("should call projectService post as expecte for valid form details", () => {
      // Arrange
      component.ngOnInit();

      // Act
      component.onSubmit();

      // Assert
      expect(mockProjectService.post).not.toHaveBeenCalled();
    });
  });

  it("should call form reset on onReset", () => {
    // Arrange
    component.ngOnInit();
    spyOn(component.addProjectForm, "reset").and.callThrough();

    // Act
    component.onReset();

    // Assert
    expect(component.addProjectForm.reset).toHaveBeenCalled();
  });

  it("should empty end and start date on onEnableStartDate call as false", () => {
    // Arrange
    component.ngOnInit();
    component.addProjectForm.patchValue({ "enableStartAndEndDate" : false });

    // Act
    component.onEnableStartDate();

    // Assert
    expect(component.addProjectForm.value.endDate).toBeUndefined();
    expect(component.addProjectForm.value.startDate).toBeUndefined();
  });
});
